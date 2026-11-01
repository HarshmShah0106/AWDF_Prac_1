import { NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Shield, Home, FolderOpen, Terminal, Mail, ExternalLink, Menu, X, Award } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home", icon: <Home size={15} />, end: true },
  { to: "/certifications", label: "Certifications", icon: <Award size={15} /> },
  { to: "/projects", label: "Projects", icon: <FolderOpen size={15} /> },
  { to: "/tools", label: "Cyber Lab", icon: <Terminal size={15} /> },
  { to: "/contact", label: "Contact", icon: <Mail size={15} /> },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const linkStyle = ({ isActive }) => ({
    display: "flex", alignItems: "center", gap: "7px",
    padding: "7px 14px", borderRadius: "8px",
    fontSize: "14px", fontWeight: 500, textDecoration: "none",
    transition: "all 0.18s ease",
    color: isActive ? "#818cf8" : "#94a3b8",
    background: isActive ? "rgba(99,102,241,0.12)" : "transparent",
    border: isActive ? "1px solid rgba(99,102,241,0.25)" : "1px solid transparent",
  });

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      background: scrolled ? "rgba(6,7,17,0.95)" : "rgba(6,7,17,0.7)",
      backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
      transition: "all 0.3s ease",
    }}>
      <div style={{
        maxWidth: "1200px", margin: "0 auto",
        padding: "12px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div style={{
            width: "34px", height: "34px", borderRadius: "9px",
            background: "rgba(99,102,241,0.15)",
            border: "1px solid rgba(99,102,241,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#818cf8",
          }}>
            <Shield size={18} />
          </div>
          <div>
            <div style={{ fontSize: "16px", fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.01em" }}>
              H<span style={{ color: "#818cf8" }}>.Shah</span>
            </div>
            <div style={{ fontSize: "10px", color: "#475569", fontFamily: "var(--font-mono)", letterSpacing: "0.05em", marginTop: "-1px" }}>
              Security & Engineering
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "4px" }} className="desktop-nav">
          {navLinks.map(link => (
            <NavLink key={link.to} to={link.to} end={link.end} style={linkStyle}
              onMouseEnter={e => { if (!e.currentTarget.style.background.includes("rgba(99")) { e.currentTarget.style.color = "#e2e8f0"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; } }}
              onMouseLeave={e => { if (!e.currentTarget.style.background.includes("rgba(99")) { e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.background = "transparent"; } }}
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}
          <a
            href="https://github.com/HarshmShah0106"
            target="_blank" rel="noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "7px 14px", borderRadius: "8px",
              fontSize: "14px", fontWeight: 500, textDecoration: "none",
              color: "#f1f5f9", background: "rgba(99,102,241,0.15)",
              border: "1px solid rgba(99,102,241,0.3)",
              transition: "all 0.18s ease", marginLeft: "8px",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(99,102,241,0.25)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(99,102,241,0.15)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>
            </svg>
            <span>GitHub</span>
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(o => !o)}
          style={{ display: "none", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", borderRadius: "8px", padding: "8px", cursor: "pointer" }}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          padding: "12px 24px 18px",
          display: "flex", flexDirection: "column", gap: "6px",
          animation: "fadeDown 0.2s ease both",
          background: "rgba(6,7,17,0.98)",
        }}>
          {navLinks.map(link => (
            <NavLink key={link.to} to={link.to} end={link.end}
              style={({ isActive }) => ({
                display: "flex", alignItems: "center", gap: "10px",
                padding: "11px 14px", borderRadius: "8px",
                fontSize: "15px", fontWeight: 500, textDecoration: "none",
                color: isActive ? "#818cf8" : "#94a3b8",
                background: isActive ? "rgba(99,102,241,0.1)" : "transparent",
              })}
              onClick={() => setMobileOpen(false)}
            >
              {link.icon}<span>{link.label}</span>
            </NavLink>
          ))}
        </div>
      )}
      <style>{`
        @keyframes fadeDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 768px) { .desktop-nav { display: none !important; } .mobile-menu-btn { display: flex !important; } }
      `}</style>
    </header>
  );
}
export default Navbar;
