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
        size={36}
        color="#10b981"
        style={{
          animation: "spin 1s linear infinite",
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
          color: "#94a3b8",
          letterSpacing: "0.05em",
        }}
      >
        FETCHING REPOSITORY TELEMETRY...
      </span>
    </div>
  );
}

export default Spinner;
