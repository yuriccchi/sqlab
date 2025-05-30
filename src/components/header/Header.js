import { NavLink, Link } from 'react-router-dom';
import { ReactComponent as SunIcon } from './sun-icon.svg';
import { ReactComponent as MoonIcon } from './moon-icon.svg';
import { useAuth } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import { useContext } from 'react';

const Header = () => {
  const { user, loading } = useAuth(); // Получаем данные из контекста
  const  { theme, setTheme } = useContext(ThemeContext);

  const changeTheme = () => {
    setTheme(theme === "light-theme" ? "dark-theme" : "light-theme");
  };

  if (loading) return null;

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <span className="logo-text">SQLab</span>
        </div>

        <nav className="main-nav">
          <NavLink 
            to="/" 
            className={({isActive}) => isActive ? "nav-link active" : "nav-link"}
          >
            Главная
          </NavLink>
          <NavLink 
            to="/lessons" 
            className={({isActive}) => isActive ? "nav-link active" : "nav-link"}
          >
            Уроки
          </NavLink>
          <NavLink 
            to="/trainer" 
            className={({isActive}) => isActive ? "nav-link active" : "nav-link"}
          >
            Тренажёр
          </NavLink>
          <NavLink 
            to="/dashboard" 
            className={({isActive}) => isActive ? "nav-link active" : "nav-link"}
          >
            Личный кабинет
          </NavLink>
        </nav>  

        <div className="header-actions">
          <button 
            className="theme-toggle" 
            onClick={changeTheme} 
            aria-label="Переключить тему"
          >
            <SunIcon className="sun-icon" />
            <MoonIcon className="moon-icon" />
          </button>

          {user ? (
            <div className="user-profile">
              <span className="username">
                {user.user_metadata?.username || user.email}
              </span>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">Войти</Link>
              <Link to="/register" className="btn btn-primary">Зарегистрироваться</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;