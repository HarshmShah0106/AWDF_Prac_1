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
            padding: "36px",
            background: "linear-gradient(135deg, rgba(6, 17, 9, 0.95) 0%, rgba(4, 12, 6, 0.98) 100%)",
            border: "1px solid #00ff66",
            boxShadow: "0 0 25px rgba(0, 255, 102, 0.25)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
              <ShieldCheck size={16} color="#00ff66" />
              <span style={{ fontSize: "12px", color: "#00ff66", fontFamily: "var(--font-mono)", fontWeight: 700 }}>
                INTERACTIVE CYBERSECURITY WORKBENCH ACTIVE
              </span>
            </div>
            <h3 style={{ fontSize: "23px", color: "#ffffff", marginBottom: "6px", fontWeight: 700 }}>
              Test Password Entropy & Compute Cryptographic Hashes
            </h3>
            <p style={{ color: "#86efac", fontSize: "14.5px", maxWidth: "620px" }}>
              Explore real-time client-side cryptographic tools including SHA-256 generation, bit entropy analyzer, and Base64 encoders directly in your browser.
            </p>
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link to="/tools" className="btn-cyber-primary">
              <Wrench size={16} />
              <span>Open Cyber Lab</span>
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
