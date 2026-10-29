import { NavLink, Link } from "react-router-dom";
import { ShieldCheck, Terminal, FolderGit2, Wrench, Mail, ExternalLink } from "lucide-react";

const GithubIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

function Navbar() {
  const navLinkStyle = ({ isActive }) => ({
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: isActive ? "#10b981" : "#94a3b8",
    background: isActive ? "rgba(16, 185, 129, 0.1)" : "transparent",
    padding: "8px 14px",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease",
    border: isActive ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid transparent",
  });

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(7, 10, 18, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(56, 189, 248, 0.15)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "14px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        {/* Brand Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(6, 182, 212, 0.2))",
              border: "1px solid rgba(16, 185, 129, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#10b981",
            }}
          >
            <ShieldCheck size={20} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  fontWeight: "700",
                  fontSize: "17px",
                  letterSpacing: "-0.02em",
                  color: "#f8fafc",
                }}
              >
                HARSH<span style={{ color: "#10b981" }}>.SEC</span>
              </span>
              <span className="live-pulse" title="System Security Active"></span>
            </div>
            <p
              style={{
                fontSize: "11px",
                color: "#64748b",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.02em",
              }}
            >
              CSPIT // CYBER RESEARCH
            </p>
          </div>
        </Link>

        {/* Navigation Items */}
        <nav style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <NavLink to="/" style={navLinkStyle}>
            <Terminal size={15} />
            <span>Home</span>
          </NavLink>

          <NavLink to="/projects" style={navLinkStyle}>
            <FolderGit2 size={15} />
            <span>Projects</span>
          </NavLink>

          <NavLink to="/tools" style={navLinkStyle}>
            <Wrench size={15} />
            <span>Security Lab</span>
          </NavLink>

          <NavLink to="/contact" style={navLinkStyle}>
            <Mail size={15} />
            <span>Contact</span>
          </NavLink>

          <a
            href="https://github.com/HarshmShah0106"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#38bdf8",
              background: "rgba(56, 189, 248, 0.1)",
              border: "1px solid rgba(56, 189, 248, 0.25)",
              padding: "7px 12px",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: "500",
              marginLeft: "6px",
              transition: "all 0.2s ease",
            }}
            title="GitHub Profile"
          >
            <GithubIcon size={15} />
            <span>GitHub</span>
            <ExternalLink size={12} />
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
