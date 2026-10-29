import { useState } from "react";
import { ShieldAlert, Code2, Terminal, Cpu } from "lucide-react";

function Skills() {
  const [activeCategory, setActiveCategory] = useState("all");

  const skillGroups = [
    {
      category: "cyber",
      name: "Cyber Security & Defensive Auditing",
      icon: <ShieldAlert size={19} color="#00ff66" />,
      items: [
        { name: "OWASP Top 10 Mitigation", level: "Advanced", desc: "SQLi, XSS, CSRF, IDOR prevention" },
        { name: "Web Application Pentesting", level: "Proficient", desc: "Security auditing and intercepting proxies" },
        { name: "Bcrypt & JWT Auth Pipelines", level: "Advanced", desc: "Password salting and stateless tokens" },
        { name: "Cryptography & Hashing", level: "Proficient", desc: "SHA-256, AES-256, HMAC verification" },
        { name: "Linux System Hardening", level: "Proficient", desc: "Permissions, iptables, SSH hardening" },
        { name: "Wireshark & Packet Analysis", level: "Competent", desc: "Protocol decoding and packet sniffing" },
      ],
    },
    {
      category: "dev",
      name: "Modern Web Engineering",
      icon: <Code2 size={19} color="#00ff66" />,
      items: [
        { name: "React 19 & React Router", level: "Advanced", desc: "Hooks, Suspense, code splitting" },
        { name: "Node.js & Express.js", level: "Advanced", desc: "RESTful architecture, custom middleware" },
        { name: "JavaScript (ES6+) & TypeScript", level: "Advanced", desc: "Async/await, closures, modularity" },
        { name: "Vite Bundler & Rolldown", level: "Proficient", desc: "Ultra-fast HMR and preview servers" },
        { name: "HTML5, CSS3 & Responsive UI", level: "Advanced", desc: "Modern layouts, flexbox, CSS grid" },
        { name: "MongoDB & Mongoose ODM", level: "Proficient", desc: "Schema design, indexing, CRUD" },
      ],
    },
    {
      category: "devops",
      name: "DevSecOps & Infrastructure",
      icon: <Terminal size={19} color="#00ff66" />,
      items: [
        { name: "Docker Containerization", level: "Advanced", desc: "Custom Dockerfiles, multi-stage builds" },
        { name: "Docker Compose Orchestration", level: "Advanced", desc: "Multi-service stacks, bridge networks" },
        { name: "In-Memory Caching (node-cache)", level: "Advanced", desc: "Query speedup and TTL invalidation" },
        { name: "Git & Version Control", level: "Advanced", desc: "Branching strategies, CI/CD fundamentals" },
        { name: "Bash & Linux CLI", level: "Proficient", desc: "Automation scripts, Linux workflows" },
        { name: "Persistent Storage Volumes", level: "Proficient", desc: "Named storage and stateful containers" },
      ],
    },
  ];

  const filteredGroups = activeCategory === "all"
    ? skillGroups
    : skillGroups.filter((g) => g.category === activeCategory);

  return (
    <section style={{ padding: "40px 0" }}>
      {/* Section Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "30px",
          textAlign: "left",
        }}
      >
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <Cpu size={14} color="#00ff66" />
            <span style={{ fontSize: "12px", color: "#00ff66", fontFamily: "var(--font-mono)", fontWeight: 700 }}>
              TECHNICAL ARSENAL // SKILLS
            </span>
          </div>
          <h2 style={{ fontSize: "28px", color: "#ffffff", fontWeight: 700 }}>
            Categorized Competencies
          </h2>
        </div>

        {/* Filter Buttons */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {[
            { id: "all", label: "All Skills" },
            { id: "cyber", label: "Cyber Security" },
            { id: "dev", label: "Web Frameworks" },
            { id: "devops", label: "DevOps & Docker" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              style={{
                background: activeCategory === tab.id ? "rgba(0, 255, 102, 0.2)" : "rgba(6, 17, 9, 0.7)",
                color: activeCategory === tab.id ? "#00ff66" : "#a7f3d0",
                border: activeCategory === tab.id ? "1px solid #00ff66" : "1px solid rgba(0, 255, 102, 0.25)",
                boxShadow: activeCategory === tab.id ? "0 0 15px rgba(0, 255, 102, 0.3)" : "none",
                padding: "7px 15px",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Matrix */}
      <div style={{ display: "flex", flexDirection: "column", gap: "26px", textAlign: "left" }}>
        {filteredGroups.map((group, gIdx) => (
          <div key={gIdx} className="cyber-card" style={{ padding: "26px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "20px",
                borderBottom: "1px solid rgba(0, 255, 102, 0.2)",
                paddingBottom: "12px",
              }}
            >
              {group.icon}
              <h3 style={{ fontSize: "18.5px", color: "#ffffff" }}>{group.name}</h3>
              <span
                style={{
                  fontSize: "11.5px",
                  color: "#00ff66",
                  fontFamily: "var(--font-mono)",
                  marginLeft: "auto",
                  background: "rgba(0, 255, 102, 0.1)",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  border: "1px solid rgba(0, 255, 102, 0.25)",
                }}
              >
                {group.items.length} MODULES
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "14px",
              }}
            >
              {group.items.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  style={{
                    background: "rgba(3, 8, 4, 0.8)",
                    border: "1px solid rgba(0, 255, 102, 0.18)",
                    borderRadius: "8px",
                    padding: "14px 16px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#00ff66";
                    e.currentTarget.style.background = "rgba(6, 20, 10, 0.95)";
                    e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 255, 102, 0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0, 255, 102, 0.18)";
                    e.currentTarget.style.background = "rgba(3, 8, 4, 0.8)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                    <span style={{ fontSize: "14px", fontWeight: 700, color: "#f0fdf4" }}>
                      {skill.name}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        fontFamily: "var(--font-mono)",
                        fontWeight: 600,
                        color: "#00ff66",
                        background: "rgba(0, 255, 102, 0.15)",
                        border: "1px solid rgba(0, 255, 102, 0.4)",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {skill.level}
                    </span>
                  </div>

                  <p style={{ fontSize: "12.5px", color: "#86efac", marginTop: "6px" }}>
                    {skill.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
