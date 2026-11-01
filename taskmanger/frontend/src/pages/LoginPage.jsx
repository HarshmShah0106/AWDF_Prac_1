import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Email and password are required');
      return;
    }

    setLoading(true);
    try {
      await login(email.trim(), password);
      navigate('/tasks');
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-container">
      <div className="badge-wrapper">
        <span className="tasks-live-badge">auth.login</span>
      </div>
      <p className="auth-subtitle">Log in to manage your tasks.</p>

      <div className="task-card form-card" style={{ maxWidth: '440px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit} className="create-task-form">
          {error && (
            <div className="error-banner">
              <AlertCircle size={15} />
              <span>{error}</span>
            </div>
          )}

          <div className="auth-field">
            <label className="field-label">Email</label>
            <input
              type="email"
              className="task-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="harsh@gmail.com"
              disabled={loading}
              required
            />
          </div>

          <div className="auth-field">
            <label className="field-label">Password</label>
            <input
              type="password"
              className="task-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              disabled={loading}
              required
            />
          </div>

          <div className="form-action-row" style={{ marginTop: '0.5rem' }}>
            <button type="submit" className="btn-add-task auth-submit-btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </div>

          <div className="auth-switch-link">
            Don't have an account?{' '}
            <Link to="/register" className="link-btn">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
