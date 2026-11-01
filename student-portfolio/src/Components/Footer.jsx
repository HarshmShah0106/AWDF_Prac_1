import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(255,255,255,0.06)",
      background: "#060711",
      padding: "28px 0",
      marginTop: "auto",
    }}>
      <div style={{
        maxWidth: "1200px", margin: "0 auto",
        padding: "0 24px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: "16px",
      }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
          <Shield size={15} color="#6366f1" />
          <span style={{ fontSize: "13px", color: "#475569", fontWeight: 500 }}>
            © {new Date().getFullYear()} <strong style={{ color: "#64748b" }}>Harsh Shah</strong> · Cybersecurity & Engineering Portfolio
          </span>
        </Link>
        <div style={{ display: "flex", gap: "20px", fontSize: "12px", fontFamily: "var(--font-mono)", color: "#334155" }}>
          <span>Security Researcher</span>
          <span style={{ color: "#1e293b" }}>·</span>
          <span>Full-Stack Engineer</span>
          <span style={{ color: "#1e293b" }}>·</span>
          <span>DevSecOps</span>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
