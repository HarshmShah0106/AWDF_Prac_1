import React from 'react';
import { FolderGit2, Star, GitFork } from 'lucide-react';

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: 'Full-Stack Task Management System',
      description: 'MongoDB, Express, React 18, Node.js with JWT Auth and node-cache speedup.',
      stars: 24,
      forks: 8,
      tags: ['React', 'Express', 'MongoDB', 'JWT'],
    },
    {
      id: 2,
      title: 'In-Memory Cache & Benchmark Engine',
      description: 'NodeCache middleware pipeline with automatic invalidation and latency analytics.',
      stars: 18,
      forks: 5,
      tags: ['Node.js', 'node-cache', 'REST API'],
    },
    {
      id: 3,
      title: 'React Code Splitting & Performance Suite',
      description: 'Route-based lazy loading with React.lazy(), Suspense, and custom delay simulation.',
      stars: 15,
      forks: 3,
      tags: ['React 18', 'Vite', 'Code Splitting'],
    },
  ];

  return (
    <div className="projects-container">
      <div className="badge-wrapper" style={{ justifyContent: 'center' }}>
        <span className="tasks-live-badge">projects.live</span>
      </div>

      <h2 className="page-section-title">Lazy Loaded Projects Page</h2>
      <p className="page-section-subtitle">
        Loaded dynamically using <code>React.lazy()</code> and <code>Suspense</code> (Practical 8 route splitting).
      </p>

      <div className="projects-grid">
        {projects.map((p) => (
          <div key={p.id} className="task-card project-card">
            <div className="project-card-header">
              <FolderGit2 size={20} className="project-icon" />
              <h3 className="project-title">{p.title}</h3>
            </div>
            <p className="project-desc">{p.description}</p>
            <div className="project-tags">
              {p.tags.map((tag) => (
                <span key={tag} className="badge badge-status-progress">
                  {tag}
                </span>
              ))}
            </div>
            <div className="project-meta">
              <span className="meta-info"><Star size={14} /> {p.stars}</span>
              <span className="meta-info"><GitFork size={14} /> {p.forks}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
