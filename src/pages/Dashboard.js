import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DashboardProgress from "../components/dashboard/DashboardProgress";
import DashboardProfile from "../components/dashboard/DashboardProfile";

const Dashboard = () => {
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
        <div className="dashboard-layout">
          <div className="dashboard-main">
            <h1 className="page-title">Личный кабинет</h1>       
            <div className="dashboard-grid">
              <div className="dashboard-progress">
                <DashboardProgress user={user} />
              </div>
              
              <div className="dashboard-profile">
                <DashboardProfile user={user} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;