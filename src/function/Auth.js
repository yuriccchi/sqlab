import { supabase } from '../supabase';

export const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

export const register = async (email, password, username) => {
    try {
      // Регистрация
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });
  
      if (error) throw error;

      // Получение ID пользователя
      const userId = data.user?.id;
      if (!userId) throw new Error('Не удалось получить ID пользователя');

      // Создание записей о прогрессе нового пользователя
      await initializeUserProgress(userId);
  
      // Автоматический вход после регистрации
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
  
      if (signInError) throw signInError;
  
      return data;
    } catch (err) {
      throw new Error(`Ошибка регистрации: ${err.message}`);
    }
  };

  export const initializeUserProgress = async (userId) => {
  try {
    // Получение всех уроков
    const { data: lessons, error: lessonsError } = await supabase
      .from('lesson')
      .select('lesson_id');
    
    if (lessonsError) throw lessonsError;

    // Получение всех заданий
    const { data: tasks, error: tasksError } = await supabase
      .from('trainer_task')
      .select('task_id');
    
    if (tasksError) throw tasksError;

    const { error: progressError } = await supabase
      .from('user_progress')
      .insert({
        user_id: userId,
        completed_lessons: 0,
        completed_tasks: 0
      });

    if (progressError) throw progressError;

    // Записи о завершении уроков
    const lessonPromises = lessons.map(lesson => 
      supabase
        .from('lesson_completion')
        .insert({
          user_id: userId,
          lesson_id: lesson.lesson_id,
          progress: 0
        })
    );

    // Записи о завершении заданий
    const taskPromises = tasks.map(task =>
      supabase
        .from('task_completion')
        .insert({
          user_id: userId,
          task_id: task.task_id,
          completed: false
        })
    );

    await Promise.all([...lessonPromises, ...taskPromises]);

    return true;
  } catch (error) {
    console.error('Ошибка создания записей о прогрессе пользователя', error);
    throw error;
  }
};