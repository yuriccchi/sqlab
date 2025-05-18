import { useEffect, useState } from "react";
import { supabase } from "../../supabase";

const DashboardProgress = ({ user }) => {
  const [progress, setProgress] = useState({
    completedLessons: 0,
    totalLessons: 0,
    completedTasks: 0,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        if (!user?.id) return;

        // Получаем общее количество уроков
        const { count: totalLessons, error: lessonsError } = await supabase
          .from('lesson')
          .select('*', { count: 'exact', head: true });

        if (lessonsError) throw lessonsError;

        // Получаем завершенные уроки пользователя
        const { data: completedLessonsData, error: progressError } = await supabase
          .from('lesson_completion')
          .select('lesson_id')
          .eq('user_id', user.id)
          .eq('progress', 100); // Предполагаем, что 100% - завершенный урок

        if (progressError) throw progressError;

        // Получаем выполненные задания пользователя
        const { data: userProgressData, error: userProgressError } = await supabase
          .from('user_progress')
          .select('completed_tasks')
          .eq('user_id', user.id)
          .single();

        if (userProgressError) throw userProgressError;

        setProgress({
          completedLessons: completedLessonsData?.length || 0,
          totalLessons: totalLessons || 0,
          completedTasks: userProgressData?.completed_tasks || 0,
          loading: false,
          error: null
        });

      } catch (error) {
        console.error("Ошибка при загрузке прогресса:", error);
        setProgress(prev => ({
          ...prev,
          loading: false,
          error: error.message
        }));
      }
    };

    fetchProgress();
  }, [user]);

  const progressPercentage = progress.totalLessons > 0 
    ? Math.round((progress.completedLessons / progress.totalLessons) * 100)
    : 0;

  if (progress.loading) return <div>Загрузка данных...</div>;
  if (progress.error) return <div>Ошибка: {progress.error}</div>;

  return (
    <div className="tab-content active" id="progress-tab">
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-card-header">
            <h3 className="stat-card-title">Прогресс обучения</h3>
          </div>
          <div className="stat-card-content">
            <div className="stat-value">{progressPercentage}%</div>
            <div className="progress-bar">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="stat-description">
              Пройдено {progress.completedLessons} из {progress.totalLessons} уроков
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <h3 className="stat-card-title">Выполнено заданий</h3>
          </div>
          <div className="stat-card-content">
            <div className="stat-value large-stat">{progress.completedTasks}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProgress;