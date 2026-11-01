import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Moon, Sun } from 'lucide-react';

export default function Navbar({ isDark, setIsDark }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="site-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <span className="brand-name">harsh.dev</span>
        </div>

        <nav className="site-nav">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>

          <NavLink to="/projects" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Projects
          </NavLink>

          <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Contact
          </NavLink>

          <NavLink to="/tasks" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Tasks
          </NavLink>

          <NavLink to="/cache" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Cache Demo
          </NavLink>

          {user ? (
            <button className="nav-link logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <NavLink to="/login" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Login
            </NavLink>
          )}
        </nav>

        <div className="theme-toggle-box">
          <button
            className="theme-btn"
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
            <span>{isDark ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
