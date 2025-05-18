import { useState, useEffect } from 'react';
import { supabase } from '../../supabase';

const TaskList = ({ onTaskSelect }) => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        
        const { data: trainerTasks, error: tasksError } = await supabase
          .from('trainer_task')
          .select('task_id, task_number')
          .order('task_number', { ascending: true });

        if (tasksError) throw tasksError;
        if (!trainerTasks) return;

        const taskIds = trainerTasks.map(t => t.task_id);
        const { data: tasksData, error: tasksDataError } = await supabase
          .from('task')
          .select('task_id, question_text, reference_request')
          .in('task_id', taskIds);

        if (tasksDataError) throw tasksDataError;

        const mergedTasks = trainerTasks.map(t => ({
          ...t,
          ...(tasksData?.find(task => task.task_id === t.task_id) || {})
        }));

        setTasks(mergedTasks || []);
        
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: completions, error: completionsError } = await supabase
            .from('task_completion')
            .select('task_id')
            .eq('user_id', user.id)
            .eq('is_completed', true);

          if (completionsError) throw completionsError;

          setCompletedTasks(completions?.map(c => c.task_id) || []);
        }

      } catch (err) {
        console.error('Ошибка вытягивания заданий из базы данных:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskClick = (taskId) => {
  setSelectedTaskId(taskId);
  const selectedTask = tasks.find(t => t.task_id === taskId);
  if (selectedTask && onTaskSelect) {
    onTaskSelect({
      id: selectedTask.task_id,
      ...selectedTask
    });
  }
  };

  if (loading) return <div className="loading">Поиск доступных заданий</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;
  if (!tasks || tasks.length === 0) return <div className="empty">Нет доступных заданий</div>;

  return (
    <div className="task-list-container">
      <div className="task-items">
        {tasks.map(task => {
          const isCompleted = completedTasks.includes(task.task_id);
          const isSelected = selectedTaskId === task.task_id;

          return (
            <div
              key={task.task_id}
              onClick={() => handleTaskClick(task.task_id)}
              className={`task-item ${isSelected ? 'selected' : ''} ${isCompleted ? 'completed' : ''}`}
            >
              <div className="task-item-content">
                <span className="task-number">Задание {task.task_number}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskList;