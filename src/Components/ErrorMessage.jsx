import { AlertTriangle, RefreshCw } from "lucide-react";

function ErrorMessage({ message, onRetry }) {
  return (
    <div style={{
      maxWidth: "520px", margin: "40px auto",
      background: "rgba(239,68,68,0.06)",
      border: "1px solid rgba(239,68,68,0.2)",
      borderRadius: "12px", padding: "32px 28px", textAlign: "center",
    }}>
      <AlertTriangle size={36} color="#ef4444" style={{ margin: "0 auto 14px" }} />
      <h3 style={{ color: "#f1f5f9", fontSize: "17px", marginBottom: "8px", fontWeight: 600 }}>
        Failed to Load
      </h3>
      <p style={{ color: "#94a3b8", fontSize: "13.5px", marginBottom: "20px", fontFamily: "var(--font-mono)" }}>
        {message || "Unable to reach the remote endpoint."}
      </p>
      {onRetry && (
        <button onClick={onRetry} style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "9px 20px", borderRadius: "8px",
          background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)",
          color: "#fca5a5", fontSize: "14px", fontWeight: 600, cursor: "pointer",
          transition: "all 0.18s ease",
        }}>
          <RefreshCw size={15} />
          <span>Retry</span>
        </button>
      )}
    </div>
  );
}
export default ErrorMessage;
