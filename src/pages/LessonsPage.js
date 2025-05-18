import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LessonCard from '../components/lessons/LessonCard';
import { supabase } from "../supabase";

const LessonsPage = () => {
    const [lessons, setLessons] = useState([]);
    const [lessonProgress, setLessonProgress] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                
                const [lessonsResponse, progressResponse] = await Promise.all([
                    supabase.from('lesson').select('*').order('lesson_number', { ascending: true }),
                    supabase.from('lesson_completion').select('lesson_id, progress').eq('user_id', user.id)
                ]);

                if (lessonsResponse.error) throw lessonsResponse.error;
                if (progressResponse.error) throw progressResponse.error;

                const progressMap = progressResponse.data.reduce((acc, item) => {
                    acc[item.lesson_id] = item.progress;
                    return acc;
                }, {});

                setLessons(lessonsResponse.data || []);
                setLessonProgress(progressMap);
                
            } catch (err) {
                setError(err);
                console.error("Ошибка получения данных из БД", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user, navigate]);

    if (loading) {
        return <div className="loading-container">
            <p>Загрузка уроков...</p>
        </div>;
    }

    if (error) {
        return <div className="error-container">
            <p>Ошибка при загрузке уроков: {error.message}</p>
        </div>;
    }

    return (
        <main className="main-content">
            <div className="container">
                <div className="page-header">
                    <div className="page-header-content">
                        <h1 className="page-title">Уроки SQL</h1>
                    </div>
                </div>

                <div className="lessons-grid">
                    {lessons.map(lesson => (
                        <LessonCard
                            id={lesson.lesson_id}
                            title={lesson.title}
                            description={lesson.description}
                            progress= {lessonProgress[lesson.lesson_id]}
                            level={lesson.level}
                            buttonText={lessonProgress[lesson.lesson_id] === 100 ? "Повторить" : lessonProgress[lesson.lesson_id] > 0 ? "Продолжить" : "Начать"}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}

export default LessonsPage;