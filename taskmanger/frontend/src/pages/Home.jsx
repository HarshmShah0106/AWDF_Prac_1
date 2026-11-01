import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="home-container">
      <div className="badge-wrapper" style={{ justifyContent: 'center' }}>
        <span className="tasks-live-badge">harsh.dev</span>
      </div>

      <h1 className="hero-title">
        Full Stack Task Management & <span className="highlight-text">Performance Engine</span>
      </h1>
      <p className="hero-subtitle">
        Advanced Web Development Frameworks (ITUE301) — React 18, Node.js, Express, MongoDB, JWT Authentication, and In-Memory Caching.
      </p>

      <div className="hero-cta-group">
        <Link to="/tasks" className="btn-add-task hero-btn">
          <span>Manage Tasks</span>
          <ArrowRight size={16} />
        </Link>
        <Link to="/cache" className="btn-cache-outline hero-btn-outline">
          <Zap size={16} />
          <span>Cache Benchmark</span>
        </Link>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon primary">
            <Layers size={22} />
          </div>
          <h3>Full-Stack Integration</h3>
          <p>React 18 frontend communicating seamlessly with Express.js REST API & MongoDB database.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon emerald">
            <ShieldCheck size={22} />
          </div>
          <h3>JWT & Bcrypt Auth</h3>
          <p>Secure password hashing with bcrypt and route protection via JWT authentication middleware.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon amber">
            <Zap size={22} />
          </div>
          <h3>In-Memory Caching</h3>
          <p>High-speed response caching powered by node-cache with automatic write invalidation.</p>
        </div>
      </div>
    </div>
  );
}
