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
  const [status, setStatus] = useState("idle");

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
          <Mail size={14} color="#00ff66" />
          <span style={{ fontSize: "12px", color: "#00ff66", fontFamily: "var(--font-mono)", fontWeight: 700 }}>
            COMMUNICATION PROTOCOL // DISPATCH
          </span>
        </div>
        <h1 style={{ fontSize: "32px", color: "#ffffff", fontWeight: 800, marginBottom: "8px" }}>
          Initialize Secure Connection
        </h1>
        <p style={{ color: "#86efac", fontSize: "15px", maxWidth: "680px" }}>
          Reach out for cybersecurity discussions, technical collaborations, vulnerability research, or development inquiries.
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
        <div className="cyber-card" style={{ padding: "34px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "22px" }}>
            <Lock size={19} color="#00ff66" />
            <h2 style={{ fontSize: "19px", color: "#ffffff", fontWeight: 700 }}>Transmit Encrypted Dispatch</h2>
          </div>

          {status === "success" && (
            <div
              style={{
                background: "rgba(0, 255, 102, 0.15)",
                border: "1px solid #00ff66",
                boxShadow: "0 0 20px rgba(0, 255, 102, 0.3)",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                color: "#39ff14",
                fontSize: "14px",
              }}
            >
              <CheckCircle2 size={20} />
              <div>
                <strong>Payload Transmitted Successfully!</strong>
                <div style={{ fontSize: "12.5px", color: "#dcfce7" }}>
                  Thank you for reaching out. Harsh will review and respond promptly.
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "18px" }}>
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

            <div style={{ marginBottom: "18px" }}>
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

            <div style={{ marginBottom: "18px" }}>
              <label className="cyber-label">Subject / Topic</label>
              <input
                type="text"
                className="cyber-input"
                placeholder="e.g. Security Audit / Collaboration Request"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label className="cyber-label">Message Payload</label>
              <textarea
                rows={4}
                required
                className="cyber-input"
                placeholder="Compose your dispatch message..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{ resize: "vertical" }}
              />
            </div>

            <button
              type="submit"
              disabled={status === "transmitting"}
              className="btn-cyber-primary"
              style={{ width: "100%", padding: "13px" }}
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
          <div className="cyber-card" style={{ padding: "26px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "12px" }}>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "8px",
                  background: "rgba(0, 255, 102, 0.15)",
                  border: "1px solid #00ff66",
                  boxShadow: "0 0 12px rgba(0, 255, 102, 0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#00ff66",
                }}
              >
                <Mail size={20} />
              </div>
              <div>
                <span style={{ fontSize: "11.5px", color: "#00ff66", fontFamily: "var(--font-mono)", fontWeight: 700 }}>
                  ELECTRONIC DISPATCH
                </span>
                <div style={{ fontSize: "15.5px", fontWeight: 700, color: "#ffffff" }}>
                  harsh@gmail.com
                </div>
              </div>
            </div>
            <p style={{ fontSize: "13px", color: "#86efac" }}>
              Direct line for security advisories, vulnerability inquiries, and engineering collaborations.
            </p>
          </div>

          {/* Node 2 */}
          <div className="cyber-card" style={{ padding: "26px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "12px" }}>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "8px",
                  background: "rgba(0, 255, 102, 0.15)",
                  border: "1px solid #00ff66",
                  boxShadow: "0 0 12px rgba(0, 255, 102, 0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#00ff66",
                }}
              >
                <GithubIcon size={20} />
              </div>
              <div>
                <span style={{ fontSize: "11.5px", color: "#00ff66", fontFamily: "var(--font-mono)", fontWeight: 700 }}>
                  PUBLIC SOURCE CONTROL
                </span>
                <div style={{ fontSize: "15.5px", fontWeight: 700, color: "#00ff66" }}>
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
                color: "#00ff66",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              <span>Explore Public Repositories →</span>
            </a>
          </div>

          {/* Node 3 */}
          <div className="cyber-card" style={{ padding: "26px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "12px" }}>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "8px",
                  background: "rgba(0, 255, 102, 0.15)",
                  border: "1px solid #00ff66",
                  boxShadow: "0 0 12px rgba(0, 255, 102, 0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#00ff66",
                }}
              >
                <MapPin size={20} />
              </div>
              <div>
                <span style={{ fontSize: "11.5px", color: "#00ff66", fontFamily: "var(--font-mono)", fontWeight: 700 }}>
                  ACADEMIC SPECIALIZATION
                </span>
                <div style={{ fontSize: "15.5px", fontWeight: 700, color: "#ffffff" }}>
                  B.Tech in Information Technology
                </div>
              </div>
            </div>
            <p style={{ fontSize: "13px", color: "#86efac" }}>
              Specializing in Defensive Web Architectures, Penetration Testing, and Applied Cryptography.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
