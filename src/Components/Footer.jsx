import { ShieldAlert } from "lucide-react";

function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(0, 255, 102, 0.25)",
        background: "rgba(3, 7, 4, 0.98)",
        padding: "24px 0",
        marginTop: "auto",
        boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.8)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "14px",
          fontSize: "13px",
          color: "#86efac",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <ShieldAlert size={16} color="#00ff66" />
          <span>
            © {new Date().getFullYear()} Harsh Shah • Cybersecurity & Full-Stack Defense Portfolio
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px", fontFamily: "var(--font-mono)", fontSize: "12px" }}>
          <span style={{ color: "#00ff66", textShadow: "0 0 8px rgba(0,255,102,0.4)", fontWeight: 700 }}>
            ● ZERO-TRUST SECURED // CONTAINERIZED
          </span>
          <span style={{ color: "#4ade80" }}>SHA-256 VERIFIED</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
