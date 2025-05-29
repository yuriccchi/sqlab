import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import TaskList from "../components/trainer/TaskList";
import Editor from "../components/trainer/Editor";
import ResultWindow from "../components/trainer/ResultWindow";
import Description from "../components/trainer/Description";
import DB from "../components/trainer/DB";
import { supabase } from "../supabase";

const TrainerPage = () => {
    const [ currentTask, setCurrentTask ] = useState(null);
    const [ queryResult, setQueryResult ] = useState(null);
    const [ solutionStatus, setSolutionStatus] = useState(null);
    const [ userQuery, setUserQuery ] = useState("");
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const executeQuery = async (query) => {
        try {
            const { data, error } = await supabase.rpc('execute_sql', { query });
            
            if (error) {
            console.error('Error executing query:', error);
            return { error: error.message };
            }
            
            // Преобразование результата из JSON обратно в объекты
            return { data: data.map(row => row.result) };
        } catch (err) {
            console.error('Unexpected error:', err);
            return { error: err.message };
        }
    };

    const handleExecute = async (query) => {
        setUserQuery(query);
        const { data, error } = await executeQuery(query);
        
        if (error) {
            setQueryResult({ error });
            setSolutionStatus(null);
            return;
        }
        
        setQueryResult(data);
        setSolutionStatus(null);
    };

    const handleCheckSolution = async (query) => {
        if (!currentTask?.reference_request) return;
        
        // Выполнение запроса пользователя
        const userResult = await executeQuery(query);
        if (userResult.error) {
            setQueryResult({ error: userResult.error });
            setSolutionStatus("Ошибка в запросе");
            return;
        }
        
        // Выполнение эталонного запроса
        const referenceResult = await executeQuery(currentTask.reference_request);
        if (referenceResult.error) {
            setQueryResult({ error: "Ошибка в эталонном запросе" });
            setSolutionStatus("Ошибка проверки");
            return;
        }
        
        // Сравнение результатов
        const isCorrect = compareResults(userResult.data, referenceResult.data);
        
        setQueryResult(userResult.data);
        setSolutionStatus({
            message: isCorrect ? "Решение верное!" : "Решение неверное",
            type: isCorrect ? "success" : "error"
        });
        
        if (isCorrect && user) {
            await supabase
                .from('task_completion')
                .upsert({
                    user_id: user.id,
                    task_id: currentTask.id,
                    is_completed: true,
                    user_answer: query
                });
        }
    };

    const compareResults = (userData, referenceData) => {
        if (!userData || !referenceData) return false;
        if (userData.length !== referenceData.length) return false;
        
        // Преобразуем данные в строки для сравнения
        const userString = JSON.stringify(userData.map(item => sortObjectKeys(item)));
        const referenceString = JSON.stringify(referenceData.map(item => sortObjectKeys(item)));
        
        return userString === referenceString;
    };

    const sortObjectKeys = (obj) => {
        return Object.keys(obj).sort().reduce((acc, key) => {
            acc[key] = obj[key];
            return acc;
        }, {});
    };

    return (
        <main className="main-container">
            <div className="container">
                <div className="trainer-layout">
                    <div className="trainer-sidebar">
                        <TaskList onTaskSelect={setCurrentTask} />
                    </div>

                    <div className="trainer-content">
                        <Editor 
                            onExecute={handleExecute}
                            onCheckSolution={handleCheckSolution}
                            task={currentTask}
                            taskId={currentTask?.id}
                            solutionStatus={solutionStatus}
                        />
                        <ResultWindow result={queryResult} />
                    </div>

                    <div className="trainer-description">
                        <Description task={currentTask} />
                        <DB />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default TrainerPage;