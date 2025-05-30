import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await login(formData.email, formData.password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="auth-page">
            <div className="container">
                <div className="auth-header">
                    <h1 className="page-title">Вход</h1>
                </div>
            
                <div className="card-content">
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <h3 className="auth-label">Email</h3>
                            <input 
                            type="email" 
                            name="email"
                            className="form-input" 
                            placeholder="Введите email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            />
                        </div>
                            
                        <div className="form-group">
                            <h3 className="auth-label">Пароль</h3>
                            <input 
                            type="password" 
                            name="password"
                            className="form-input" 
                            placeholder="Введите пароль"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            />
                        </div>
                            
                        {error && <div className="auth-error">{error}</div>}
                        
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? 'Вход...' : 'Войти'}
                        </button>
                    </form>
                    
                    <hr className="auth-divider" />
                    
                    <div className="auth-links">                    
                        <div className="auth-link-group">
                            <span className="auth-text">Нет аккаунта? </span>
                            <Link to="/register" className="text-primary">Зарегистрироваться!</Link>
                        </div>
                    </div>
                </div>         
            </div>      
        </main>    
    );
};

export default AuthPage;

// <Link to="/forgot-password" className="text-primary">Забыли пароль?</Link>