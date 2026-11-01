import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="empty-state" style={{ padding: '4rem 1rem' }}>
      <h2 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-main)' }}>404</h2>
      <p style={{ margin: '1rem 0' }}>Page Not Found</p>
      <Link to="/" className="btn-action">
        Go Back Home
      </Link>
    </div>
  );
}
