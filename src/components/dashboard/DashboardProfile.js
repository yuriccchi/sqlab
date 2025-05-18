import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const DashboardProfile = ({ user }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="card profile-card">
      <div className="card-header">
        <h2 className="card-title">Профиль</h2>
      </div>
      <div className="card-content">
        <div className="profile-info">
          <div className="profile-avatar">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div className="profile-details">
            <p className="profile-name">{user.user_metadata?.username || "Пользователь"}</p>
            <p className="profile-email">{user?.email || "email@example.com"}</p>
          </div>
        </div>
        <div className="profile-actions">
          <button 
            className="btn btn-primary btn-block" 
            onClick={handleLogout}
          >
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;