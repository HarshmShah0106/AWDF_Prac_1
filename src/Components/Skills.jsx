import { useState } from "react";
import { ShieldCheck, Code2, Terminal, Cpu, Check, Layers, Wrench, Lock } from "lucide-react";

const skillGroups = [
  {
    category: "cyber",
    name: "Cybersecurity & Defensive Auditing",
    icon: <Lock size={18} />,
    color: "indigo",
    items: [
      { name: "OWASP Top 10 Mitigation", level: "Advanced", desc: "SQLi, XSS, CSRF, IDOR prevention & secure coding" },
      { name: "Web Application Pentesting", level: "Proficient", desc: "Security auditing with Burp Suite & intercepting proxies" },
      { name: "Bcrypt & JWT Auth Pipelines", level: "Advanced", desc: "Password salting, claims validation, stateless session tokens" },
      { name: "Applied Cryptography & Hashing", level: "Proficient", desc: "SHA-256, AES-256, HMAC verification & digital signatures" },
      { name: "Linux System Hardening", level: "Proficient", desc: "Principle of least privilege, iptables, SSH key management" },
      { name: "Wireshark & Packet Analysis", level: "Competent", desc: "Protocol decoding, packet sniffing, anomalous traffic detection" },
    ],
  },
  {
    category: "dev",
    name: "Full-Stack Web Engineering",
    icon: <Code2 size={18} />,
    color: "violet",
    items: [
      { name: "React 19 & React Router", level: "Advanced", desc: "Component architecture, hooks, suspense, client-side routing" },
      { name: "Node.js & Express.js", level: "Advanced", desc: "RESTful architecture, custom middleware, rate-limiting, CORS" },
      { name: "JavaScript (ES6+) & TypeScript", level: "Advanced", desc: "Async/await, closures, type definitions, modularity" },
      { name: "Vite Bundler & Modern Tooling", level: "Proficient", desc: "Ultra-fast HMR, asset hashing, and production build pipelines" },
      { name: "Modern CSS & Responsive UI", level: "Advanced", desc: "Flexbox, CSS Grid, custom properties, mobile-first design" },
      { name: "MongoDB & Mongoose ODM", level: "Proficient", desc: "Schema validation, indexing, aggregation pipelines, CRUD" },
    ],
  },
  {
    category: "devops",
    name: "DevSecOps & Infrastructure",
    icon: <Terminal size={18} />,
    color: "sky",
    items: [
      { name: "Docker Containerization", level: "Advanced", desc: "Multi-stage builds, non-root user execution, Alpine images" },
      { name: "Docker Compose Orchestration", level: "Advanced", desc: "Multi-service stacks, segmented bridge networks, env isolation" },
      { name: "In-Memory Caching (node-cache)", level: "Advanced", desc: "Query acceleration, TTL invalidation, sub-10ms response times" },
      { name: "Git & Version Control Workflows", level: "Advanced", desc: "Feature branching, pull requests, semantic commit conventions" },
      { name: "Bash & Linux Shell Scripting", level: "Proficient", desc: "System automation, service inspection, pipeline scripting" },
      { name: "Persistent Storage Volumes", level: "Proficient", desc: "Named docker volumes, backup workflows, database persistence" },
    ],
  },
];

const filterTabs = [
  { id: "all", label: "All Arsenal" },
  { id: "cyber", label: "Cybersecurity & Defense" },
  { id: "dev", label: "Web Frameworks" },
  { id: "devops", label: "DevSecOps & Docker" },
];

function getLevelBadge(level) {
  switch (level) {
    case "Advanced":
      return { class: "badge-indigo", label: "Advanced" };
    case "Proficient":
      return { class: "badge-sky", label: "Proficient" };
    default:
      return { class: "badge-violet", label: "Competent" };
  }
}

function Skills() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredGroups = activeCategory === "all"
    ? skillGroups
    : skillGroups.filter((g) => g.category === activeCategory);

  return (
    <section style={{ padding: "40px 0 30px" }}>
      {/* Section Header */}
      <div
        className="anim-up"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "18px",
          marginBottom: "36px",
          textAlign: "left",
        }}
      >
        <div>
          <div className="section-label">Technical Arsenal</div>
          <h2 className="section-heading">
            Core Competencies & <span className="gradient-text">Skills Matrix</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "15px", maxWidth: "600px", marginTop: "6px" }}>
            Proven technical foundation across defensive security auditing, modern frontend frameworks,
            and containerized DevSecOps workflows.
          </p>
        </div>

        {/* Filter Tabs */}
        <div style={{
          display: "flex",
          gap: "6px",
          flexWrap: "wrap",
          background: "rgba(255, 255, 255, 0.02)",
          padding: "6px",
          borderRadius: "10px",
          border: "1px solid var(--border)",
        }}>
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              style={{
                background: activeCategory === tab.id ? "rgba(99, 102, 241, 0.18)" : "transparent",
                color: activeCategory === tab.id ? "#c7d2fe" : "var(--text-secondary)",
                border: activeCategory === tab.id ? "1px solid rgba(99, 102, 241, 0.35)" : "1px solid transparent",
                padding: "7px 15px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.18s ease",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Matrix */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", textAlign: "left" }}>
        {filteredGroups.map((group, gIdx) => (
          <div key={gIdx} className="card" style={{ padding: "28px" }}>
            {/* Group Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "20px",
                borderBottom: "1px solid var(--border)",
                paddingBottom: "14px",
              }}
            >
              <div className={`icon-box ib-${group.color}`}>
                {group.icon}
              </div>
              <div>
                <h3 style={{ fontSize: "17.5px", color: "var(--text-primary)", fontWeight: 700 }}>
                  {group.name}
                </h3>
              </div>
              <span
                style={{
                  fontSize: "11px",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-mono)",
                  marginLeft: "auto",
                  background: "rgba(255, 255, 255, 0.04)",
                  padding: "3px 10px",
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                }}
              >
                {group.items.length} MODULES
              </span>
            </div>

            {/* Grid of Skill Cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "14px",
              }}
            >
              {group.items.map((skill, sIdx) => {
                const badge = getLevelBadge(skill.level);

                return (
                  <div
                    key={sIdx}
                    style={{
                      background: "rgba(255, 255, 255, 0.02)",
                      border: "1px solid var(--border)",
                      borderRadius: "10px",
                      padding: "16px 18px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--border-strong)";
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.045)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.02)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px", marginBottom: "8px" }}>
                      <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>
                        {skill.name}
                      </span>
                      <span className={`badge ${badge.class}`} style={{ fontSize: "10.5px" }}>
                        {badge.label}
                      </span>
                    </div>

                    <p style={{ fontSize: "12.5px", color: "var(--text-secondary)", lineHeight: 1.55 }}>
                      {skill.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
