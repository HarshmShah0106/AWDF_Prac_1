import { Loader2 } from "lucide-react";

function Spinner() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 20px",
        gap: "14px",
      }}
    >
      <Loader2
        size={38}
        color="#00ff66"
        style={{
          animation: "spin 0.9s linear infinite",
          filter: "drop-shadow(0 0 10px rgba(0, 255, 102, 0.5))",
        }}
      />
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "13px",
          color: "#00ff66",
          letterSpacing: "0.06em",
          fontWeight: 700,
          textShadow: "0 0 8px rgba(0, 255, 102, 0.4)",
        }}
      >
        INTERCEPTING TELEMETRY STREAMS...
      </span>
    </div>
  );
}

export default Spinner;
