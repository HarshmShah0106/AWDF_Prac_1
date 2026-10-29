import { ShieldAlert, Server, Layers, Terminal, CheckCircle } from "lucide-react";

function About() {
  const pillars = [
    {
      icon: <ShieldAlert size={22} color="#00ff66" />,
      title: "Cyber Security & Defensive Auditing",
      desc: "Specialized in web application security analysis, OWASP Top 10 vulnerability remediation, and building defense against injection attacks, broken access control, and token exploitation.",
      tag: "Vulnerability Assessment",
    },
    {
      icon: <Server size={22} color="#00ff66" />,
      title: "DevSecOps & Multi-Container Docker",
      desc: "Orchestrating microservices with Docker & Docker Compose, establishing segmented internal bridge networks, and producing minimal multi-stage Alpine images for reduced attack surfaces.",
      tag: "Docker / Compose",
    },
    {
      icon: <Layers size={22} color="#00ff66" />,
      title: "Full-Stack Security Architecture",
      desc: "Building high-throughput full-stack systems with React 19, Express, MongoDB, and in-memory query caching pipelines (node-cache) delivering sub-10ms response latencies.",
      tag: "Secure MERN Stack",
    },
  ];

  return (
    <section style={{ padding: "40px 0" }}>
      {/* Section Header */}
      <div style={{ textAlign: "left", marginBottom: "30px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <Terminal size={14} color="#00ff66" />
          <span style={{ fontSize: "12px", color: "#00ff66", fontFamily: "var(--font-mono)", fontWeight: 700 }}>
            SECURITY PROFILE // IDENTITY
          </span>
        </div>
        <h2 style={{ fontSize: "28px", color: "#ffffff", fontWeight: 700 }}>
          Defensive Engineering & Threat Analysis
        </h2>
        <p style={{ color: "#bbf7d0", fontSize: "15px", maxWidth: "700px", marginTop: "6px" }}>
          I am a 5th-semester B.Tech Information Technology student specializing in applied cybersecurity, defensive architecture, and modern full-stack frameworks.
          My passion lies at the intersection of offensive security understanding and robust defensive engineering — ensuring systems are both high-performing and impenetrable.
        </p>
      </div>

      {/* 3 Core Pillars */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "22px",
          textAlign: "left",
        }}
      >
        {pillars.map((item, idx) => (
          <div
            key={idx}
            className="cyber-card"
            style={{
              padding: "26px",
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
                  marginBottom: "18px",
                }}
              >
                <div
                  style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "10px",
                    background: "rgba(0, 255, 102, 0.1)",
                    border: "1px solid rgba(0, 255, 102, 0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 15px rgba(0, 255, 102, 0.2)",
                  }}
                >
                  {item.icon}
                </div>
                <span className="cyber-badge">{item.tag}</span>
              </div>

              <h3 style={{ fontSize: "18.5px", color: "#ffffff", marginBottom: "10px" }}>
                {item.title}
              </h3>

              <p style={{ fontSize: "14px", color: "#86efac", lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                marginTop: "20px",
                paddingTop: "14px",
                borderTop: "1px solid rgba(0, 255, 102, 0.15)",
                fontSize: "12px",
                color: "#00ff66",
                fontFamily: "var(--font-mono)",
                fontWeight: 600,
              }}
            >
              <CheckCircle size={15} />
              <span>Verified Domain Knowledge</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default About;
