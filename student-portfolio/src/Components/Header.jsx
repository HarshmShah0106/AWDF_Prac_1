import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ArrowRight, Shield, Server, Lock, Cpu,
  Download, ExternalLink, ChevronDown
} from "lucide-react";

const stats = [
  { value: "OWASP", label: "Top 10 Auditing" },
  { value: "Docker", label: "Multi-container" },
  { value: "React 19", label: "Full-stack" },
  { value: "CEH v13", label: "In progress" },
];

const tech = [
  "React", "Node.js", "Express", "MongoDB", "Docker", "Penetration Testing",
  "JWT Auth", "Bcrypt", "Wireshark", "Linux", "Git", "TypeScript",
];

function TypeWriter({ strings, speed = 65, pause = 1800 }) {
  const [displayed, setDisplayed] = useState("");
  const [strIdx, setStrIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = strings[strIdx];
    let timeout;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setStrIdx(i => (i + 1) % strings.length);
    }

    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, strIdx, strings, speed, pause]);

  return (
    <span>
      {displayed}
      <span className="cursor-blink">|</span>
    </span>
  );
}

function Header({ name }) {
  return (
    <section style={{ padding: "56px 0 48px" }}>
      {/* Top badge row */}
      <div className="anim-up" style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "32px" }}>
        <span className="badge badge-indigo">
          <Shield size={11} /> Security Researcher
        </span>
        <span className="badge badge-violet">
          <Server size={11} /> Full-Stack Engineer
        </span>
        <span className="badge badge-emerald">
          <span className="dot-online" style={{ width: "6px", height: "6px" }} />
          Open to Opportunities
        </span>
      </div>

      {/* Main grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "56px",
        alignItems: "center",
      }}>
        {/* Left column */}
        <div>
          <h1
            className="anim-left"
            style={{
              fontSize: "clamp(38px, 5.5vw, 58px)",
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: "-0.04em",
              marginBottom: "8px",
              color: "var(--text-primary)",
            }}
          >
            Hi, I'm{" "}
            <span className="shimmer-text">{name || "Harsh Shah"}</span>
          </h1>

          <div
            className="anim-left"
            style={{
              fontSize: "clamp(18px, 2.5vw, 24px)",
              fontWeight: 600,
              color: "var(--text-secondary)",
              marginBottom: "20px",
              letterSpacing: "-0.02em",
              animationDelay: "0.06s",
              fontFamily: "var(--font-mono)",
            }}
          >
            <TypeWriter
              strings={[
                "Cybersecurity Researcher",
                "Full-Stack Architect",
                "DevSecOps Engineer",
                "Penetration Tester",
              ]}
            />
          </div>

          <p
            className="anim-left"
            style={{
              fontSize: "16px",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              maxWidth: "500px",
              marginBottom: "36px",
              animationDelay: "0.12s",
            }}
          >
            5th-semester B.Tech IT student building secure, high-performance
            full-stack systems. Specializing in web application security, OWASP
            auditing, and containerized architectures.
          </p>

          {/* CTAs */}
          <div
            className="anim-left"
            style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "44px", animationDelay: "0.18s" }}
          >
            <Link to="/projects" className="btn-primary">
              View Projects
              <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="btn-secondary">
              Get in Touch
            </Link>
            <a
              href="https://github.com/HarshmShah0106"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                <path d="M9 18c-4.51 2-5-2-7-2"/>
              </svg>
              GitHub
            </a>
          </div>

          {/* Stats row */}
          <div
            className="anim-left"
            style={{
              display: "flex",
              gap: "0",
              borderTop: "1px solid var(--border)",
              paddingTop: "28px",
              flexWrap: "wrap",
              animationDelay: "0.24s",
            }}
          >
            {stats.map((s, i) => (
              <div
                key={i}
                style={{
                  padding: "0 24px",
                  borderRight: i < stats.length - 1 ? "1px solid var(--border)" : "none",
                  minWidth: "100px",
                  marginBottom: "12px",
                }}
              >
                <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>
                  {s.value}
                </div>
                <div style={{ fontSize: "11.5px", color: "var(--text-muted)", marginTop: "2px" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column — terminal */}
        <div className="anim-right" style={{ animationDelay: "0.1s" }}>
          <div className="terminal">
            <div className="terminal-bar">
              <span className="t-dot t-red" />
              <span className="t-dot t-yellow" />
              <span className="t-dot t-green" />
              <span className="terminal-title">harsh@portfolio:~ </span>
            </div>
            <div className="terminal-body">
              <TerminalLines />
            </div>
          </div>

          {/* Tech stack pill cloud below terminal */}
          <div style={{
            display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "18px",
          }}>
            {tech.map((t, i) => (
              <span
                key={i}
                className="badge badge-muted"
                style={{ animationDelay: `${i * 0.03}s`, cursor: "default" }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TerminalLines() {
  const lines = [
    { type: "cmd", text: "whoami" },
    { type: "out", text: "Harsh Shah — Cybersecurity Researcher & Full-Stack Engineer", color: "var(--text-primary)" },
    { type: "gap" },
    { type: "cmd", text: "cat skills.json | jq '.focus'" },
    { type: "code", lines: [
      '  "OWASP Top 10 Mitigation",',
      '  "Web Application Pentesting",',
      '  "JWT + Bcrypt Auth Pipelines",',
      '  "Docker Compose Orchestration"',
    ]},
    { type: "gap" },
    { type: "cmd", text: "systemctl status career" },
    { type: "out", text: "● ACTIVE — Seeking internship opportunities", color: "#34d399" },
    { type: "blink" },
  ];

  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setVisible(v => v < lines.length ? v + 1 : v), 180);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {lines.slice(0, visible).map((l, i) => {
        if (l.type === "gap") return <div key={i} style={{ height: "6px" }} />;
        if (l.type === "cmd") return (
          <div key={i} style={{ marginBottom: "3px", animation: "fadeIn 0.2s ease both" }}>
            <span style={{ color: "#818cf8" }}>harsh</span>
            <span style={{ color: "var(--text-faint)" }}>@portfolio</span>
            <span style={{ color: "var(--text-muted)" }}>:~$ </span>
            <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>{l.text}</span>
          </div>
        );
        if (l.type === "out") return (
          <div key={i} style={{ color: l.color || "var(--text-secondary)", marginLeft: "2px", marginBottom: "3px", animation: "fadeIn 0.2s ease both", fontSize: "12.5px" }}>
            → {l.text}
          </div>
        );
        if (l.type === "code") return (
          <div key={i} style={{
            background: "rgba(99,102,241,0.06)", borderLeft: "2px solid rgba(99,102,241,0.4)",
            padding: "8px 12px", borderRadius: "0 6px 6px 0", marginBottom: "3px",
            animation: "fadeIn 0.2s ease both", fontSize: "12px",
          }}>
            {"["}
            {l.lines.map((line, j) => <div key={j} style={{ color: "#94a3b8" }}>{line}</div>)}
            {"]"}
          </div>
        );
        if (l.type === "blink") return (
          <div key={i} style={{ marginTop: "4px" }}>
            <span style={{ color: "#818cf8" }}>harsh</span>
            <span style={{ color: "var(--text-faint)" }}>@portfolio</span>
            <span style={{ color: "var(--text-muted)" }}>:~$ </span>
            <span className="cursor-blink"> </span>
          </div>
        );
        return null;
      })}
    </>
  );
}

export default Header;
