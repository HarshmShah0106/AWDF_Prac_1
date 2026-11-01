import Header from "./Header";
import About from "./About";
import Certifications from "./Certifications";
import Skills from "./Skills";
import { Link } from "react-router-dom";
import { Terminal, FolderOpen, ArrowRight, Sparkles, Shield, Cpu } from "lucide-react";

function Home() {
  return (
    <div className="page-container">
      {/* Hero Section */}
      <Header name="Harsh Shah" />

      {/* Subtle Divider */}
      <div className="divider" />

      {/* About Section */}
      <About />

      {/* Divider */}
      <div className="divider" />

      {/* Certifications Section */}
      <Certifications />

      {/* Divider */}
      <div className="divider" />

      {/* Technical Arsenal & Skills Matrix */}
      <Skills />

      {/* Interactive Cyber Lab Callout Card */}
      <section style={{ margin: "40px 0 20px" }}>
        <div
          className="card card-accent"
          style={{
            padding: "40px",
            background: "linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.05) 50%, rgba(6, 7, 17, 0.95) 100%)",
            border: "1px solid rgba(99, 102, 241, 0.25)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "28px",
            borderRadius: "16px",
          }}
        >
          <div style={{ maxWidth: "620px", textAlign: "left" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <span className="badge badge-indigo">
                <Sparkles size={12} />
                Client-Side Security Workbench
              </span>
            </div>
            <h3 style={{ fontSize: "24px", color: "var(--text-primary)", fontWeight: 800, marginBottom: "10px", letterSpacing: "-0.02em" }}>
              Explore the Interactive Cyber Laboratory
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: 1.65 }}>
              Test Shannon bit entropy, compute native Web Cryptography hash digests (SHA-256 / SHA-512),
              and test Base64 transformers live in your browser — zero tracking, completely client-side.
            </p>
          </div>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <Link to="/tools" className="btn-primary" style={{ padding: "12px 24px" }}>
              <Terminal size={16} />
              <span>Launch Cyber Lab</span>
              <ArrowRight size={15} />
            </Link>
            <Link to="/projects" className="btn-secondary" style={{ padding: "12px 24px" }}>
              <FolderOpen size={16} />
              <span>Browse Codebase</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
