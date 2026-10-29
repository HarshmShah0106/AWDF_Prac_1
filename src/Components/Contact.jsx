import { useState } from "react";
import { Mail, Send, MapPin, ShieldCheck, CheckCircle2, Lock, Terminal } from "lucide-react";

const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle, transmitting, success

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("transmitting");
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }, 1200);
  };

  return (
    <div className="page-container" style={{ textAlign: "left" }}>
      {/* Page Header */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <Mail size={14} color="#10b981" />
          <span style={{ fontSize: "12px", color: "#10b981", fontFamily: "var(--font-mono)", fontWeight: 600 }}>
            COMMUNICATION PROTOCOL // CONTACT
          </span>
        </div>
        <h1 style={{ fontSize: "32px", color: "#f8fafc", fontWeight: 700, marginBottom: "8px" }}>
          Initialize Secure Connection
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "15px", maxWidth: "680px" }}>
          Reach out for cybersecurity discussions, technical collaborations, code audits, or academic inquiries.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "28px",
        }}
      >
        {/* Contact Form */}
        <div className="cyber-card" style={{ padding: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <Lock size={18} color="#10b981" />
            <h2 style={{ fontSize: "18px", color: "#f8fafc" }}>Transmit Encrypted Dispatch</h2>
          </div>

          {status === "success" && (
            <div
              style={{
                background: "rgba(16, 185, 129, 0.15)",
                border: "1px solid #10b981",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                color: "#34d399",
                fontSize: "14px",
              }}
            >
              <CheckCircle2 size={20} />
              <div>
                <strong>Payload Transmitted Successfully!</strong>
                <div style={{ fontSize: "12px", color: "#a7f3d0" }}>
                  Thank you for reaching out. Harsh will review and respond shortly.
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "16px" }}>
              <label className="cyber-label">Your Name</label>
              <input
                type="text"
                required
                className="cyber-input"
                placeholder="e.g. Alex Mercer"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label className="cyber-label">Email Address</label>
              <input
                type="email"
                required
                className="cyber-input"
                placeholder="name@organization.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label className="cyber-label">Subject / Topic</label>
              <input
                type="text"
                className="cyber-input"
                placeholder="e.g. Project Inquiry / Security Collaboration"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label className="cyber-label">Message Payload</label>
              <textarea
                rows={4}
                required
                className="cyber-input"
                placeholder="Compose your message..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{ resize: "vertical" }}
              />
            </div>

            <button
              type="submit"
              disabled={status === "transmitting"}
              className="btn-cyber-primary"
              style={{ width: "100%", padding: "12px" }}
            >
              {status === "transmitting" ? (
                <span>Transmitting Payload...</span>
              ) : (
                <>
                  <Send size={16} />
                  <span>Send Encrypted Dispatch</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Contact Info & Network Nodes */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Node 1 */}
          <div className="cyber-card" style={{ padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "8px",
                  background: "rgba(16, 185, 129, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#10b981",
                }}
              >
                <Mail size={20} />
              </div>
              <div>
                <span style={{ fontSize: "12px", color: "#64748b", fontFamily: "var(--font-mono)" }}>
                  ELECTRONIC MAIL
                </span>
                <div style={{ fontSize: "15px", fontWeight: 600, color: "#f8fafc" }}>
                  harsh@gmail.com
                </div>
              </div>
            </div>
            <p style={{ fontSize: "13px", color: "#94a3b8" }}>
              Direct line for academic communications, project inquiries, and collaborative research.
            </p>
          </div>

          {/* Node 2 */}
          <div className="cyber-card" style={{ padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "8px",
                  background: "rgba(6, 182, 212, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#06b6d4",
                }}
              >
                <GithubIcon size={20} />
              </div>
              <div>
                <span style={{ fontSize: "12px", color: "#64748b", fontFamily: "var(--font-mono)" }}>
                  PUBLIC SOURCE NODE
                </span>
                <div style={{ fontSize: "15px", fontWeight: 600, color: "#38bdf8" }}>
                  @HarshmShah0106
                </div>
              </div>
            </div>
            <a
              href="https://github.com/HarshmShah0106"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                color: "#38bdf8",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              <span>Explore GitHub Repositories →</span>
            </a>
          </div>

          {/* Node 3 */}
          <div className="cyber-card" style={{ padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "8px",
                  background: "rgba(56, 189, 248, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#38bdf8",
                }}
              >
                <MapPin size={20} />
              </div>
              <div>
                <span style={{ fontSize: "12px", color: "#64748b", fontFamily: "var(--font-mono)" }}>
                  ACADEMIC INSTITUTION
                </span>
                <div style={{ fontSize: "15px", fontWeight: 600, color: "#f8fafc" }}>
                  CSPIT, Charusat University
                </div>
              </div>
            </div>
            <p style={{ fontSize: "13px", color: "#94a3b8" }}>
              B.Tech in Information Technology • Changa, Anand, Gujarat, India.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
