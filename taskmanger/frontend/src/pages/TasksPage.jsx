import React, { useState, useEffect, useCallback } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../api/tasks';
import { useAuth } from '../context/AuthContext';
import { AlertCircle, Trash2 } from 'lucide-react';

export default function TasksPage() {
  const { logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [taskError, setTaskError] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast((current) => (current === message ? null : current));
    }, 3000);
  };

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      setTaskError(null);
      const data = await getTasks();
      const taskList = Array.isArray(data) ? data : data?.data || [];
      setTasks(taskList);
    } catch (err) {
      console.error('Fetch tasks error:', err);
      setTaskError(err.message || 'Failed to fetch tasks');
      if (err.message.includes('token') || err.message.includes('401')) {
        logout();
      }
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTaskData = {
      title: title.trim(),
      description: description.trim(),
      completed: false,
    };

    const tempId = 'temp-' + Date.now();
    const optimisticTask = { ...newTaskData, _id: tempId, _isOptimistic: true };
    setTasks((prev) => [optimisticTask, ...prev]);

    const prevTitle = title;
    const prevDesc = description;
    setTitle('');
    setDescription('');
    setIsSubmitting(true);

    try {
      const savedTask = await createTask(newTaskData);
      setTasks((prev) => prev.map((t) => (t._id === tempId ? savedTask : t)));
      showToast('Task created');
    } catch (err) {
      console.error('Creation failed:', err);
      setTasks((prev) => prev.filter((t) => t._id !== tempId));
      setTitle(prevTitle);
      setDescription(prevDesc);
      setTaskError(err.message || 'Failed to create task');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleComplete = async (task) => {
    const newStatus = !task.completed;
    const previousTasks = [...tasks];

    setTasks((prev) =>
      prev.map((t) => (t._id === task._id ? { ...t, completed: newStatus } : t))
    );

    try {
      await updateTask(task._id, { completed: newStatus });
      showToast(newStatus ? 'Task completed' : 'Task reopened');
    } catch (err) {
      console.error('Status update failed:', err);
      setTasks(previousTasks);
      setTaskError(err.message || 'Failed to update task');
    }
  };

  const handleDeleteTask = async (task) => {
    const confirmed = window.confirm('Delete this task?');
    if (!confirmed) return;

    const previousTasks = [...tasks];
    setTasks((prev) => prev.filter((t) => t._id !== task._id));

    try {
      await deleteTask(task._id);
      showToast('Task deleted');
    } catch (err) {
      console.error('Delete failed:', err);
      setTasks(previousTasks);
      setTaskError(err.message || 'Failed to delete task');
    }
  };

  return (
    <div className="task-container">
      <div className="badge-wrapper">
        <span className="tasks-live-badge">tasks.live</span>
      </div>

      <div className="task-card form-card">
        <form onSubmit={handleCreateTask} className="create-task-form">
          <input
            type="text"
            className="task-input"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
            required
          />

          <input
            type="text"
            className="task-input"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isSubmitting}
          />

          <div className="form-action-row">
            <button
              type="submit"
              className="btn-add-task"
              disabled={isSubmitting || !title.trim()}
            >
              {isSubmitting ? 'Adding...' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>

      {taskError && (
        <div className="error-banner">
          <AlertCircle size={16} />
          <span>{taskError}</span>
          <button className="btn-retry" onClick={fetchTasks}>
            Retry
          </button>
        </div>
      )}

      {isLoading && (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <span>Loading tasks from MongoDB...</span>
        </div>
      )}

      {!isLoading && (
        <div className="tasks-list">
          {tasks.length > 0 && (
            <div className="list-toolbar">
              <span className="task-count">
                {tasks.filter((t) => !t.completed).length} pending ·{' '}
                {tasks.filter((t) => t.completed).length} completed
              </span>
            </div>
          )}

          {tasks.length === 0 ? (
            <div className="empty-state">
              <p>No tasks yet. Create one above to get started!</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className={`task-card task-item ${
                  task.completed ? 'is-completed' : ''
                }`}
              >
                <div className="task-info">
                  <h3
                    className={`task-title-text ${
                      task.completed ? 'strike' : ''
                    }`}
                  >
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className="task-desc-text">{task.description}</p>
                  )}
                </div>

                <div className="task-item-actions">
                  <button
                    className="btn-action btn-complete"
                    onClick={() => handleToggleComplete(task)}
                  >
                    {task.completed ? 'Undo' : 'Complete'}
                  </button>

                  <button
                    className="btn-action btn-delete"
                    onClick={() => handleDeleteTask(task)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {toast && (
        <div className="toast-notification">
          <span className="toast-check">✓</span>
          <span className="toast-text">{toast}</span>
        </div>
      )}
    </div>
  );
}
