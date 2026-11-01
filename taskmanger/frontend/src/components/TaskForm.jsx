import React, { useState } from 'react';
import { PlusCircle, Sparkles, Zap } from 'lucide-react';

export default function TaskForm({ onAddTask, isLoading, isOptimistic, setIsOptimistic }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setFormError('Please enter a task title');
      return;
    }
    setFormError('');

    onAddTask({
      title: title.trim(),
      description: description.trim(),
      priority,
      status: 'pending',
      dueDate: dueDate ? new Date(dueDate) : null,
    });

    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
  };

  return (
    <div className="card task-form-card">
      <div className="card-header">
        <div className="header-title-row">
          <div className="icon-wrapper">
            <PlusCircle size={22} className="text-primary" />
          </div>
          <div>
            <h2 className="section-title">Create New Task</h2>
            <p className="section-subtitle">Add a task to be persisted in MongoDB</p>
          </div>
        </div>

        {/* Supplementary Feature: Optimistic UI toggle */}
        <div className="optimistic-toggle-wrapper" title="Show task in UI immediately before server confirms">
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={isOptimistic}
              onChange={(e) => setIsOptimistic(e.target.checked)}
            />
            <span className="slider round"></span>
          </label>
          <span className="toggle-label">
            <Zap size={14} className={isOptimistic ? 'text-amber' : 'text-muted'} />
            Optimistic UI
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="task-form">
        {formError && (
          <div className="alert alert-error" style={{ marginBottom: '1rem' }}>
            <span>{formError}</span>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="task-title">Task Title *</label>
          <input
            id="task-title"
            type="text"
            className="input-control"
            placeholder="e.g., Complete Practical 6 Full Stack Integration"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (formError) setFormError('');
            }}
            disabled={isLoading && !isOptimistic}
          />
        </div>

        <div className="form-group">
          <label htmlFor="task-description">Description (Optional)</label>
          <textarea
            id="task-description"
            className="input-control textarea-control"
            rows="2"
            placeholder="Key details, notes, or implementation goals..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isLoading && !isOptimistic}
          ></textarea>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="task-priority">Priority</label>
            <select
              id="task-priority"
              className="input-control"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              disabled={isLoading && !isOptimistic}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="task-duedate">Due Date (Optional)</label>
            <input
              id="task-duedate"
              type="date"
              className="input-control"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              disabled={isLoading && !isOptimistic}
            />
          </div>
        </div>

        <div className="form-submit-row">
          <span className="helper-hint">
            <Sparkles size={14} /> Synchronized via <code>POST /tasks</code> to Node.js backend
          </span>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading && !isOptimistic}
          >
            {isLoading && !isOptimistic ? (
              <>
                <span className="spinner-sm"></span>
                <span>Adding...</span>
              </>
            ) : (
              <>
                <PlusCircle size={18} />
                <span>Add Task</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
