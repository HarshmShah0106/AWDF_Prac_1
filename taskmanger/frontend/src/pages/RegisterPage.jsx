import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertCircle } from 'lucide-react';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Email and password are required');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await register(email.trim(), password);
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-container">
      <div className="badge-wrapper">
        <span className="tasks-live-badge">auth.register</span>
      </div>
      <p className="auth-subtitle">Create an account to get started.</p>

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

          <div className="auth-field">
            <label className="field-label">Confirm Password</label>
            <input
              type="password"
              className="task-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••"
              disabled={loading}
              required
            />
          </div>

          <div className="form-action-row" style={{ marginTop: '0.5rem' }}>
            <button type="submit" className="btn-add-task auth-submit-btn" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>

          <div className="auth-switch-link">
            Already have an account?{' '}
            <Link to="/login" className="link-btn">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
