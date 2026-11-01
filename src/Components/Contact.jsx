import { useState } from "react";
import {
  Mail,
  Send,
  MapPin,
  Lock,
  Terminal,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const GithubIcon = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax/harshshah@example.com";

const contactNodes = [
  {
    icon: <Mail size={18} />,
    color: "indigo",
    label: "DIRECT COMMUNICATION",
    title: "harsh@gmail.com",
    desc: "Primary channel for security consultations, project collaborations, and general inquiries.",
    href: "mailto:harsh@gmail.com",
    linkLabel: "Send Direct Email",
  },
  {
    icon: <GithubIcon size={18} />,
    color: "violet",
    label: "SOURCE CONTROL & CODE",
    title: "@HarshmShah0106",
    desc: "Browse public repositories, containerized multi-service architectures, and lab code.",
    href: "https://github.com/HarshmShah0106",
    linkLabel: "View GitHub Profile",
    external: true,
  },
  {
    icon: <MapPin size={18} />,
    color: "sky",
    label: "ACADEMIC INSTITUTION",
    title: "B.Tech in Information Technology",
    desc: "Focusing on defensive cyber architectures, web penetration testing, and secure engineering.",
    href: null,
  },
];

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | transmitting | success | error

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("transmitting");

    try {
      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `Portfolio Contact from ${formData.name}`,
          message: formData.message,
          _captcha: "false",
        }),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        throw new Error("Endpoint returned non-ok");
      }
    } catch {
      // Fallback: mailto link
      const subject = encodeURIComponent(formData.subject || `Portfolio Message from ${formData.name}`);
      const body = encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`);
      window.location.href = `mailto:harsh@gmail.com?subject=${subject}&body=${body}`;
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const isSubmitting = status === "transmitting";
  const canSubmit = formData.name.trim() && formData.email.trim() && formData.message.trim();

  return (
    <div className="page-container" style={{ textAlign: "left" }}>
      {/* Page Header */}
      <div style={{ marginBottom: "36px" }}>
        <div className="section-label">Transmission Channel</div>
        <h1 className="section-heading" style={{ fontSize: "clamp(28px, 4vw, 42px)", marginBottom: "10px" }}>
          Get In <span className="gradient-text">Touch</span>
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "15.5px", maxWidth: "640px", lineHeight: 1.65 }}>
          Available for cybersecurity internships, software engineering roles, and technical discussions.
          Fill out the dispatch form or connect directly through listed channels.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "28px",
          alignItems: "start",
        }}
      >
        {/* Contact Form */}
        <div className="card" style={{ padding: "34px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "26px", borderBottom: "1px solid var(--border)", paddingBottom: "16px" }}>
            <div className="icon-box ib-indigo">
              <Lock size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: "18px", color: "var(--text-primary)", fontWeight: 700 }}>
                Send a Message
              </h2>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
                Encrypted client-side transmission
              </p>
            </div>
          </div>

          {/* Success Banner */}
          {status === "success" && (
            <div
              className="success-pop"
              style={{
                background: "rgba(16, 185, 129, 0.1)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                borderRadius: "10px",
                padding: "16px",
                marginBottom: "22px",
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                color: "#34d399",
                fontSize: "14px",
              }}
            >
              <CheckCircle2 size={20} style={{ flexShrink: 0, marginTop: "2px" }} />
              <div>
                <strong style={{ display: "block", color: "var(--text-primary)" }}>
                  Transmission Sent!
                </strong>
                <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                  Thank you for reaching out. Harsh will respond promptly.
                </span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "16px" }}>
              <div>
                <label className="label">
                  Your Name <span style={{ color: "#f43f5e" }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  className="input"
                  placeholder="e.g. Alex Mercer"
                  value={formData.name}
                  onChange={handleChange("name")}
                />
              </div>

              <div>
                <label className="label">
                  Email Address <span style={{ color: "#f43f5e" }}>*</span>
                </label>
                <input
                  type="email"
                  required
                  className="input"
                  placeholder="name@organization.com"
                  value={formData.email}
                  onChange={handleChange("email")}
                />
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label className="label">Subject</label>
              <input
                type="text"
                className="input"
                placeholder="e.g. Security Audit / Collaboration Opportunity"
                value={formData.subject}
                onChange={handleChange("subject")}
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label className="label">
                Message <span style={{ color: "#f43f5e" }}>*</span>
              </label>
              <textarea
                rows={5}
                required
                className="input"
                placeholder="Compose your message or project inquiry..."
                value={formData.message}
                onChange={handleChange("message")}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !canSubmit}
              className="btn-primary"
              style={{ width: "100%", padding: "13px", fontSize: "14.5px" }}
            >
              {isSubmitting ? (
                <>
                  <span
                    style={{
                      width: "15px",
                      height: "15px",
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTopColor: "#fff",
                      borderRadius: "50%",
                      animation: "spin 0.7s linear infinite",
                    }}
                  />
                  <span>Transmitting...</span>
                </>
              ) : (
                <>
                  <Send size={15} />
                  <span>Send Dispatch</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Contact Info Nodes */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          {contactNodes.map((node, idx) => (
            <div key={idx} className="card" style={{ padding: "22px 24px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                <div className={`icon-box ib-${node.color}`} style={{ width: "38px", height: "38px", borderRadius: "8px" }}>
                  {node.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontWeight: 600 }}>
                    {node.label}
                  </span>
                  <div style={{ fontSize: "15.5px", fontWeight: 700, color: "var(--text-primary)", marginTop: "2px", marginBottom: "6px" }}>
                    {node.title}
                  </div>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.55 }}>
                    {node.desc}
                  </p>
                  {node.href && (
                    <a
                      href={node.href}
                      target={node.external ? "_blank" : undefined}
                      rel={node.external ? "noreferrer" : undefined}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "13px",
                        color: "#818cf8",
                        textDecoration: "none",
                        fontWeight: 600,
                        marginTop: "10px",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#a5b4fc")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#818cf8")}
                    >
                      <span>{node.linkLabel}</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Availability Card */}
          <div
            className="card card-accent"
            style={{
              padding: "22px 24px",
              background: "linear-gradient(135deg, rgba(16, 185, 129, 0.06) 0%, rgba(99, 102, 241, 0.04) 100%)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span className="dot-online" />
              <span style={{ fontSize: "12px", color: "#34d399", fontFamily: "var(--font-mono)", fontWeight: 700 }}>
                CURRENT AVAILABILITY
              </span>
            </div>
            <div style={{ fontSize: "15px", color: "var(--text-primary)", fontWeight: 700, marginBottom: "4px" }}>
              Actively Exploring Opportunities
            </div>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.55 }}>
              Open for cybersecurity internships, full-stack software development roles, and research projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
