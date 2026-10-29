import { NavLink, Link } from "react-router-dom";
import { ShieldAlert, Terminal, FolderGit2, Wrench, Mail, ExternalLink } from "lucide-react";

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
    color: isActive ? "#00ff66" : "#a7f3d0",
    background: isActive ? "rgba(0, 255, 102, 0.15)" : "transparent",
    padding: "8px 14px",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "13.5px",
    fontWeight: "600",
    transition: "all 0.2s ease",
    border: isActive ? "1px solid #00ff66" : "1px solid transparent",
    boxShadow: isActive ? "0 0 15px rgba(0, 255, 102, 0.25)" : "none",
  });

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(3, 7, 4, 0.92)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(0, 255, 102, 0.25)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.8)",
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
            gap: "11px",
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "8px",
              background: "rgba(0, 255, 102, 0.12)",
              border: "1px solid #00ff66",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#00ff66",
              boxShadow: "0 0 14px rgba(0, 255, 102, 0.3)",
            }}
          >
            <ShieldAlert size={21} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  fontWeight: "800",
                  fontSize: "18px",
                  letterSpacing: "-0.01em",
                  color: "#ffffff",
                }}
              >
                HARSH<span style={{ color: "#00ff66", textShadow: "0 0 10px #00ff66" }}>.SEC</span>
              </span>
              <span className="live-pulse" title="System Security Active"></span>
            </div>
            <p
              style={{
                fontSize: "10.5px",
                color: "#4ade80",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.06em",
                fontWeight: 600,
              }}
            >
              DEFENSE & SECURITY ARCHITECTURE
            </p>
          </div>
        </Link>

        {/* Navigation Items */}
        <nav style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <NavLink to="/" style={navLinkStyle}>
            <Terminal size={15} />
            <span>Terminal</span>
          </NavLink>

          <NavLink to="/projects" style={navLinkStyle}>
            <FolderGit2 size={15} />
            <span>Codebase</span>
          </NavLink>

          <NavLink to="/tools" style={navLinkStyle}>
            <Wrench size={15} />
            <span>Cyber Lab</span>
          </NavLink>

          <NavLink to="/contact" style={navLinkStyle}>
            <Mail size={15} />
            <span>Transmission</span>
          </NavLink>

          <a
            href="https://github.com/HarshmShah0106"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#00ff66",
              background: "rgba(0, 255, 102, 0.1)",
              border: "1px solid rgba(0, 255, 102, 0.4)",
              padding: "7px 13px",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: "600",
              marginLeft: "6px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 255, 102, 0.45)";
              e.currentTarget.style.background = "rgba(0, 255, 102, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.background = "rgba(0, 255, 102, 0.1)";
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
