import React from 'react';
import { CheckCircle2, Clock, ListTodo, AlertTriangle, Activity } from 'lucide-react';

export default function StatsBar({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'completed').length;
  const inProgress = tasks.filter((t) => t.status === 'in-progress').length;
  const pending = tasks.filter((t) => t.status === 'pending').length;
  const highPriority = tasks.filter((t) => t.priority === 'high' && t.status !== 'completed').length;

  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="stats-container">
      <div className="stat-card">
        <div className="stat-icon-box total">
          <ListTodo size={20} />
        </div>
        <div className="stat-data">
          <span className="stat-label">Total Tasks</span>
          <span className="stat-value">{total}</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-box pending">
          <Clock size={20} />
        </div>
        <div className="stat-data">
          <span className="stat-label">Pending</span>
          <span className="stat-value">{pending}</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-box progress">
          <Activity size={20} />
        </div>
        <div className="stat-data">
          <span className="stat-label">In Progress</span>
          <span className="stat-value">{inProgress}</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-box completed">
          <CheckCircle2 size={20} />
        </div>
        <div className="stat-data">
          <span className="stat-label">Completed</span>
          <span className="stat-value">{completed}</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-box high-pri">
          <AlertTriangle size={20} />
        </div>
        <div className="stat-data">
          <span className="stat-label">Urgent Tasks</span>
          <span className="stat-value">{highPriority}</span>
        </div>
      </div>

      <div className="stat-card progress-card">
        <div className="stat-data">
          <div className="progress-header">
            <span className="stat-label">Progress</span>
            <span className="stat-rate">{completionRate}%</span>
          </div>
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
