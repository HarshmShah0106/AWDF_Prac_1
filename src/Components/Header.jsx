import { Link } from "react-router-dom";
import { Terminal, Shield, ArrowRight, Wrench, Lock, Cpu, Server, CheckCircle2 } from "lucide-react";

function Header({ name }) {
  return (
    <section style={{ padding: "40px 0 20px" }}>
      {/* Top Cyber Badge */}
      <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
        <span className="cyber-badge">
          <Shield size={13} />
          DEFENSIVE SECURITY & FULL-STACK ENGINEERING
        </span>
        <span className="cyber-badge cyber-badge-cyan">
          <CheckCircle2 size={13} />
          CSPIT • CHARUSAT
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "36px",
          alignItems: "center",
          textAlign: "left",
        }}
      >
        {/* Left Bio & Action Column */}
        <div>
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              lineHeight: 1.15,
              fontWeight: 700,
              marginBottom: "16px",
              color: "#f8fafc",
            }}
          >
            Hi, I'm <span className="gradient-text">{name || "Harsh Shah"}</span>.
            <br />
            <span style={{ fontSize: "0.85em", color: "#94a3b8", fontWeight: 500 }}>
              Cybersecurity Analyst & Web Architect.
            </span>
          </h1>

          <p
            style={{
              fontSize: "16px",
              color: "#94a3b8",
              lineHeight: 1.6,
              marginBottom: "28px",
              maxWidth: "560px",
            }}
          >
            Engineering resilient, high-performance web systems with a security-first mindset.
            Specializing in OWASP Top 10 mitigation, multi-container Docker architectures, and modern React interfaces.
          </p>

          {/* Action CTAs */}
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "32px" }}>
            <Link to="/projects" className="btn-cyber-primary">
              <span>View Repositories</span>
              <ArrowRight size={16} />
            </Link>

            <Link to="/tools" className="btn-cyber-secondary">
              <Wrench size={16} />
              <span>Launch Security Lab</span>
            </Link>
          </div>

          {/* Mini Stat Chips */}
          <div
            style={{
              display: "flex",
              gap: "18px",
              flexWrap: "wrap",
              borderTop: "1px solid rgba(56, 189, 248, 0.15)",
              paddingTop: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Lock size={16} color="#10b981" />
              <span style={{ fontSize: "13px", color: "#cbd5e1" }}>Penetration Testing</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Server size={16} color="#06b6d4" />
              <span style={{ fontSize: "13px", color: "#cbd5e1" }}>Docker Orchestration</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Cpu size={16} color="#38bdf8" />
              <span style={{ fontSize: "13px", color: "#cbd5e1" }}>Modern Web Frameworks</span>
            </div>
          </div>
        </div>

        {/* Right Cyber Terminal Card */}
        <div>
          <div className="terminal-window">
            <div className="terminal-header">
              <span className="terminal-dot dot-red"></span>
              <span className="terminal-dot dot-yellow"></span>
              <span className="terminal-dot dot-green"></span>
              <span className="terminal-title">harsh@cspit-lab:~ (bash)</span>
            </div>

            <div className="terminal-body" style={{ color: "#cbd5e1" }}>
              <div style={{ marginBottom: "10px" }}>
                <span style={{ color: "#10b981" }}>harsh@cybersec</span>
                <span style={{ color: "#64748b" }}>:</span>
                <span style={{ color: "#38bdf8" }}>~</span>
                <span style={{ color: "#94a3b8" }}>$ </span>
                <span style={{ color: "#f8fafc" }}>whoami</span>
                <div style={{ color: "#94a3b8", marginLeft: "14px", marginTop: "4px" }}>
                  → Harsh Shah // B.Tech IT Engineer (CSPIT)
                </div>
              </div>

              <div style={{ marginBottom: "10px" }}>
                <span style={{ color: "#10b981" }}>harsh@cybersec</span>
                <span style={{ color: "#64748b" }}>:</span>
                <span style={{ color: "#38bdf8" }}>~</span>
                <span style={{ color: "#94a3b8" }}>$ </span>
                <span style={{ color: "#f8fafc" }}>cat security-focus.json</span>
                <div
                  style={{
                    color: "#06b6d4",
                    background: "rgba(6, 182, 212, 0.05)",
                    borderLeft: "2px solid #06b6d4",
                    padding: "6px 12px",
                    marginTop: "4px",
                    borderRadius: "0 6px 6px 0",
                    fontSize: "12.5px",
                  }}
                >
                  {"{"}
                  <br />
                  &nbsp;&nbsp;"offensive": "Web Vulnerability Assessment & CTF",
                  <br />
                  &nbsp;&nbsp;"defensive": "JWT Auth, Rate Limiting, Node-Cache",
                  <br />
                  &nbsp;&nbsp;"infrastructure": "Docker, Bridge Networks, Alpine"
                  <br />
                  {"}"}
                </div>
              </div>

              <div>
                <span style={{ color: "#10b981" }}>harsh@cybersec</span>
                <span style={{ color: "#64748b" }}>:</span>
                <span style={{ color: "#38bdf8" }}>~</span>
                <span style={{ color: "#94a3b8" }}>$ </span>
                <span style={{ color: "#f8fafc" }}>systemctl is-active security-grid</span>
                <div style={{ color: "#34d399", marginLeft: "14px", marginTop: "4px" }}>
                  ● ACTIVE (running) • Containers Online <span className="cursor-blink">_</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Header;
