import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Lesson_1 = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {    
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading || !user) return <div>Loading...</div>;

  return (
    <main className="main-content">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Урок тестовый</h1>
        </div>
        
        <div className="lesson-content">
          {/* Блок 1: Введение */}
          <section className="theory-block">
            <h2 className="section-title">1. Введение</h2>
            <div className="card">
              <div className="card-content">
                <p>
                  Это тестовый урок, и он не содержит какого-либо теоретического материала, предназначенного для изучения!
                </p>
                <p>
                  В данном уроке присутствует несколько элементов, которые отображают, как в будущем будут выглядеть уроки.
                </p>
              </div>
            </div>
          </section>

          {/* Блок 2: SELECT */}
          <section className="theory-practice-block">
            <h2 className="section-title">2. Базовый запрос SELECT</h2>
            <div className="card">
              <div className="card-content">
                <p>
                  SELECT используется для выборки данных из таблицы. 
                  Базовый синтаксис:
                </p>
                <div className="code-example">
                  <div className="code-block">
                    SELECT column1, column2 FROM table_name
                  </div>
                </div>
                <p>Пример:</p>
                <div className="code-example">
                  <div className="code-block">
                    SELECT * FROM employees
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Блок 3: WHERE с практическим заданием */}
          <section className="theory-practice-block">
            <h2 className="section-title">3. Фильтрация с WHERE</h2>
            <div className="card">
              <div className="card-content">
                <p>
                  WHERE позволяет фильтровать результаты запроса по условию.
                </p>
                <div className="code-example">
                  <div className="code-block">
                    SELECT column1, column2 
                    FROM table_name
                    WHERE condition
                  </div>
                </div>
                <p>Примеры условий:</p>
                <div className="code-example">
                  <div className="code-block">
                    SELECT * FROM employees
                    WHERE salary &gt; 50000
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
};

export default Lesson_1;