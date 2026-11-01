import React, { useState } from 'react';
import { Mail, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-container">
      <div className="badge-wrapper" style={{ justifyContent: 'center' }}>
        <span className="tasks-live-badge">contact.live</span>
      </div>

      <h2 className="page-section-title">Lazy Loaded Contact Route</h2>
      <p className="page-section-subtitle">
        Loaded dynamically using <code>React.lazy()</code> with fallback UI loading (Practical 8).
      </p>

      <div className="task-card form-card" style={{ maxWidth: '520px', margin: '1.5rem auto' }}>
        {submitted ? (
          <div className="contact-success">
            <CheckCircle2 size={42} className="text-emerald" />
            <h3>Message Received!</h3>
            <p>Thank you for reaching out. We will get back to you shortly.</p>
            <button
              className="btn-action"
              onClick={() => {
                setSubmitted(false);
                setName('');
                setEmail('');
                setMessage('');
              }}
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="create-task-form">
            <div className="auth-field">
              <label className="field-label">Name</label>
              <input
                type="text"
                className="task-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Harsh Shah"
                required
              />
            </div>

            <div className="auth-field">
              <label className="field-label">Email</label>
              <input
                type="email"
                className="task-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="harsh@gmail.com"
                required
              />
            </div>

            <div className="auth-field">
              <label className="field-label">Message</label>
              <textarea
                className="task-input textarea-control"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message or inquiry..."
                required
              ></textarea>
            </div>

            <div className="form-action-row" style={{ marginTop: '0.5rem' }}>
              <button type="submit" className="btn-add-task auth-submit-btn">
                <Send size={15} />
                <span>Send Message</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
