import { AlertTriangle, RefreshCw } from "lucide-react";

function ErrorMessage({ message, onRetry }) {
  return (
    <div
      className="cyber-card"
      style={{
        padding: "32px 24px",
        maxWidth: "600px",
        margin: "30px auto",
        textAlign: "center",
        border: "1px solid rgba(239, 68, 68, 0.6)",
        background: "rgba(239, 68, 68, 0.08)",
        boxShadow: "0 0 20px rgba(239, 68, 68, 0.2)",
      }}
    >
      <AlertTriangle size={36} color="#ef4444" style={{ margin: "0 auto 12px" }} />
      <h3 style={{ color: "#ffffff", fontSize: "18px", marginBottom: "8px", fontWeight: 700 }}>
        Telemetry Connection Disrupted
      </h3>
      <p
        style={{
          color: "#fca5a5",
          fontSize: "13.5px",
          fontFamily: "var(--font-mono)",
          marginBottom: "20px",
        }}
      >
        {message || "Unable to reach remote telemetry endpoint."}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="btn-cyber-primary"
          style={{
            background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
            color: "#ffffff",
            boxShadow: "0 0 15px rgba(239, 68, 68, 0.4)",
          }}
        >
          <RefreshCw size={15} />
          <span>Re-establish Connection</span>
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
