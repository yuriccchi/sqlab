import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../function/Auth';

const RegPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

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
      await register(
        formData.email,
        formData.password,
        formData.username
      );
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
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
          <h1 className="page-title">Регистрация</h1>
        </div>

        {success ? (
          <div className="auth-success">
            <p>Регистрация прошла успешно! Перенаправляем...</p>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <h3 className="auth-label">Никнейм</h3>
              <input
                type="text"
                name="username"
                className="form-input"
                placeholder="Введите никнейм"
                value={formData.username}
                onChange={handleChange}
                required
                minLength={3}
              />
            </div>

            <div className="form-group">
              <h3 className="auth-label">Почта</h3>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="Введите почту"
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
                placeholder="Введите пароль не менее 10 символов"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={10}
              />
            </div>

            {error && <div className="auth-error">{error}</div>}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Регистрация...' : 'Создать аккаунт'}
            </button>
          </form>
        )}

        <hr className="auth-divider" />

        <div className="auth-links">
          <span className="auth-text">Уже есть аккаунт? </span>
          <Link to="/login" className="text-primary">Войти</Link>
        </div>
      </div>
    </main>
  );
};

export default RegPage;