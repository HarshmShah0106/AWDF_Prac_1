import { Shield, Lock, Layers, Server, Terminal, CheckCircle } from "lucide-react";

function About() {
  const pillars = [
    {
      icon: <Shield size={22} color="#10b981" />,
      title: "Cyber Security & Hardening",
      desc: "Specialized in web application security analysis, OWASP Top 10 vulnerability remediation, and defense against injection, broken access control, and token exploitation.",
      tag: "AppSec",
    },
    {
      icon: <Server size={22} color="#06b6d4" />,
      title: "DevSecOps & Containerization",
      desc: "Orchestrating microservices with Docker & Docker Compose, establishing segmented internal bridge networks, and producing minimal multi-stage Alpine images.",
      tag: "Docker / Compose",
    },
    {
      icon: <Layers size={22} color="#38bdf8" />,
      title: "Full-Stack Web Architecture",
      desc: "Building high-throughput full-stack systems with React 19, Express, MongoDB, and in-memory query caching pipelines (node-cache) for sub-10ms response times.",
      tag: "MERN Stack",
    },
  ];

  return (
    <section style={{ padding: "40px 0" }}>
      {/* Section Header */}
      <div style={{ textAlign: "left", marginBottom: "28px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <Terminal size={14} color="#10b981" />
          <span style={{ fontSize: "12px", color: "#10b981", fontFamily: "var(--font-mono)", fontWeight: 600 }}>
            SECURITY PROFILE // ABOUT
          </span>
        </div>
        <h2 style={{ fontSize: "28px", color: "#f8fafc", fontWeight: 700 }}>
          Defensive Mindset Meets Engineering Rigor
        </h2>
        <p style={{ color: "#94a3b8", fontSize: "15px", maxWidth: "680px", marginTop: "6px" }}>
          I am a 5th-semester B.Tech Information Technology student at <strong>CSPIT, Charusat University</strong>.
          My passion lies at the intersection of offensive security understanding and robust defensive engineering — ensuring systems are both high-performing and impenetrable.
        </p>
      </div>

      {/* 3 Core Pillars */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          textAlign: "left",
        }}
      >
        {pillars.map((item, idx) => (
          <div
            key={idx}
            className="cyber-card"
            style={{
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: "rgba(15, 23, 42, 0.9)",
                    border: "1px solid rgba(56, 189, 248, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </div>
                <span className="cyber-badge cyber-badge-cyan">{item.tag}</span>
              </div>

              <h3 style={{ fontSize: "18px", color: "#f8fafc", marginBottom: "10px" }}>
                {item.title}
              </h3>

              <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginTop: "18px",
                paddingTop: "14px",
                borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                fontSize: "12px",
                color: "#10b981",
                fontFamily: "var(--font-mono)",
              }}
            >
              <CheckCircle size={14} />
              <span>Verified Competency</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default About;
