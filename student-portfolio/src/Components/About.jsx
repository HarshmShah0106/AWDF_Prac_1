import { ShieldAlert, Server, Layers, CheckCircle2, ArrowUpRight } from "lucide-react";

const pillars = [
  {
    ib: "ib-indigo",
    icon: <ShieldAlert size={20} />,
    badge: "badge-indigo",
    badgeText: "Vulnerability Assessment",
    title: "Cybersecurity & Defensive Auditing",
    desc: "Specialized in OWASP Top 10 remediation, web application vulnerability assessment, and building defense against SQLi, XSS, CSRF, and broken access control.",
    delay: "0s",
  },
  {
    ib: "ib-violet",
    icon: <Server size={20} />,
    badge: "badge-violet",
    badgeText: "Docker / Compose",
    title: "DevSecOps & Multi-Container Docker",
    desc: "Orchestrating microservices with Docker Compose, establishing segmented bridge networks, and producing minimal multi-stage Alpine images for reduced attack surfaces.",
    delay: "0.08s",
  },
  {
    ib: "ib-sky",
    icon: <Layers size={20} />,
    badge: "badge-sky",
    badgeText: "Secure MERN Stack",
    title: "Full-Stack Security Architecture",
    desc: "Building high-throughput systems with React 19, Express, MongoDB, and in-memory caching pipelines (node-cache) delivering sub-10ms response latencies.",
    delay: "0.16s",
  },
];

function About() {
  return (
    <section style={{ padding: "20px 0 48px" }}>
      {/* Section Header */}
      <div className="anim-up" style={{ marginBottom: "36px" }}>
        <div className="section-label">Security Profile</div>
        <h2 className="section-heading" style={{ marginBottom: "12px" }}>
          About <span className="gradient-text">Harsh Shah</span>
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "15.5px", maxWidth: "680px", lineHeight: 1.7 }}>
          5th-semester B.Tech Information Technology student at the intersection of offensive security
          understanding and robust defensive engineering. Passionate about building systems that are
          both high-performing and inherently secure.
        </p>
      </div>

      {/* Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
        gap: "18px",
      }}>
        {pillars.map((p, idx) => (
          <div
            key={idx}
            className="card"
            style={{
              padding: "26px",
              animationName: "fadeUp",
              animationDuration: "0.5s",
              animationDelay: p.delay,
              animationFillMode: "both",
              animationTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
              cursor: "default",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", marginBottom: "18px" }}>
              <div className={`icon-box ${p.ib}`}>
                {p.icon}
              </div>
              <span className={`badge ${p.badge}`}>{p.badgeText}</span>
            </div>

            <h3 style={{ fontSize: "16px", color: "var(--text-primary)", fontWeight: 700, marginBottom: "10px", lineHeight: 1.35 }}>
              {p.title}
            </h3>
            <p style={{ fontSize: "13.5px", color: "var(--text-secondary)", lineHeight: 1.65 }}>
              {p.desc}
            </p>

            <div style={{
              display: "flex", alignItems: "center", gap: "6px",
              marginTop: "20px", paddingTop: "16px", borderTop: "1px solid var(--border)",
              fontSize: "12px", color: "var(--text-muted)",
            }}>
              <CheckCircle2 size={13} style={{ color: "var(--emerald)" }} />
              <span style={{ fontFamily: "var(--font-mono)" }}>Verified Domain Knowledge</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default About;
