import React, { useEffect } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function ConfirmModal({ isOpen, title, message, taskTitle, onConfirm, onCancel, isLoading }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header danger-header">
          <div className="modal-icon-badge danger">
            <AlertTriangle size={24} />
          </div>
          <button className="modal-close-btn" onClick={onCancel} disabled={isLoading}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <h3 className="modal-title">{title || 'Confirm Deletion'}</h3>
          <p className="modal-desc">
            {message || 'Are you sure you want to delete this task? This action cannot be undone.'}
          </p>
          {taskTitle && (
            <div className="task-preview-box">
              <span className="task-preview-label">Target Task:</span>
              <span className="task-preview-title">{taskTitle}</span>
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="spinner-sm"></span>
            ) : (
              <Trash2 size={16} />
            )}
            <span>{isLoading ? 'Deleting...' : 'Delete Task'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
