import { Shield, Heart, Terminal } from "lucide-react";

function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(56, 189, 248, 0.15)",
        background: "rgba(7, 10, 18, 0.95)",
        padding: "24px 0",
        marginTop: "auto",
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
          color: "#64748b",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Shield size={16} color="#10b981" />
          <span>
            © {new Date().getFullYear()} Harsh Shah • Crafted for AWDF (ITUE301)
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px", fontFamily: "var(--font-mono)", fontSize: "12px" }}>
          <span style={{ color: "#10b981" }}>● TLS 1.3 / CONTAINERIZED</span>
          <span>CSPIT • CHARUSAT</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
