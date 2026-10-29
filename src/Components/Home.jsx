import Header from "./Header";
import About from "./About";
import Skills from "./Skills";
import { Link } from "react-router-dom";
import { ShieldCheck, FolderGit2, Wrench, ArrowRight } from "lucide-react";

function Home() {
  return (
    <div className="page-container">
      {/* Hero Section */}
      <Header name="Harsh Shah" />

      {/* About Section */}
      <About />

      {/* Skills Matrix */}
      <Skills />

      {/* Quick Launch Banner */}
      <section style={{ margin: "40px 0 20px", textAlign: "left" }}>
        <div
          className="cyber-card"
          style={{
            padding: "32px",
            background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(14, 20, 36, 0.95) 100%)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
              <ShieldCheck size={16} color="#10b981" />
              <span style={{ fontSize: "12px", color: "#10b981", fontFamily: "var(--font-mono)" }}>
                INTERACTIVE CYBER LAB READY
              </span>
            </div>
            <h3 style={{ fontSize: "22px", color: "#f8fafc", marginBottom: "6px" }}>
              Test Password Entropy & Generate Cryptographic Hashes
            </h3>
            <p style={{ color: "#94a3b8", fontSize: "14px", maxWidth: "600px" }}>
              Explore real-time client-side cryptographic tools including SHA-256 generation, bit entropy analyzer, and Base64 encoders directly in your browser.
            </p>
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link to="/tools" className="btn-cyber-primary">
              <Wrench size={16} />
              <span>Open Security Lab</span>
              <ArrowRight size={15} />
            </Link>
            <Link to="/projects" className="btn-cyber-secondary">
              <FolderGit2 size={16} />
              <span>Browse Repositories</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
