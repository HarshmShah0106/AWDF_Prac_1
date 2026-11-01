import React from 'react';
import { 
  CheckCircle, 
  Circle, 
  Clock, 
  Calendar, 
  Edit3, 
  Trash2, 
  AlertCircle,
  Loader2
} from 'lucide-react';

export default function TaskItem({
  task,
  onStatusToggle,
  onEditClick,
  onDeleteClick,
  isActionLoading,
}) {
  const isCompleted = task.status === 'completed';
  const isInProgress = task.status === 'in-progress';
  const isOptimisticPending = task._isOptimistic;

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'badge-priority-high';
      case 'medium':
        return 'badge-priority-medium';
      case 'low':
        return 'badge-priority-low';
      default:
        return 'badge-priority-medium';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return 'badge-status-completed';
      case 'in-progress':
        return 'badge-status-progress';
      case 'pending':
      default:
        return 'badge-status-pending';
    }
  };

  return (
    <div
      className={`task-item-card ${isCompleted ? 'completed' : ''} ${
        isOptimisticPending ? 'optimistic-pending' : ''
      }`}
    >
      <div className="task-main-content">
        <button
          className={`status-toggle-btn ${task.status}`}
          onClick={() => onStatusToggle(task)}
          disabled={isActionLoading || isOptimisticPending}
          title={`Status: ${task.status}. Click to cycle status.`}
        >
          {isCompleted ? (
            <CheckCircle className="icon-completed" size={22} />
          ) : isInProgress ? (
            <Clock className="icon-progress" size={22} />
          ) : (
            <Circle className="icon-pending" size={22} />
          )}
        </button>

        <div className="task-details">
          <div className="task-title-row">
            <h3 className={`task-title ${isCompleted ? 'line-through' : ''}`}>
              {task.title}
            </h3>
            {isOptimisticPending && (
              <span className="optimistic-badge">
                <Loader2 size={12} className="spin" /> Syncing...
              </span>
            )}
          </div>

          {task.description && (
            <p className="task-description">{task.description}</p>
          )}

          <div className="task-meta-row">
            <span className={`badge ${getStatusClass(task.status)}`}>
              {task.status.toUpperCase()}
            </span>

            <span className={`badge ${getPriorityClass(task.priority)}`}>
              {task.priority.toUpperCase()}
            </span>

            {task.dueDate && (
              <span className="meta-info due-info">
                <Calendar size={13} />
                <span>Due: {formatDate(task.dueDate)}</span>
              </span>
            )}

            <span className="meta-info created-info">
              <Clock size={13} />
              <span>Created: {formatDate(task.createdAt || Date.now())}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="task-actions">
        <button
          className="btn-icon btn-icon-edit"
          onClick={() => onEditClick(task)}
          disabled={isActionLoading || isOptimisticPending}
          title="Edit Task"
        >
          <Edit3 size={17} />
        </button>

        <button
          className="btn-icon btn-icon-delete"
          onClick={() => onDeleteClick(task)}
          disabled={isActionLoading || isOptimisticPending}
          title="Delete Task"
        >
          <Trash2 size={17} />
        </button>
      </div>
    </div>
  );
}
