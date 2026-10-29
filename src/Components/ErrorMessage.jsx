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
        border: "1px solid rgba(239, 68, 68, 0.4)",
        background: "rgba(239, 68, 68, 0.05)",
      }}
    >
      <AlertTriangle size={36} color="#ef4444" style={{ margin: "0 auto 12px" }} />
      <h3 style={{ color: "#f8fafc", fontSize: "18px", marginBottom: "8px" }}>
        Transmission Interruption Encountered
      </h3>
      <p
        style={{
          color: "#fca5a5",
          fontSize: "13.5px",
          fontFamily: "var(--font-mono)",
          marginBottom: "20px",
        }}
      >
        {message || "Unable to reach GitHub telemetry endpoint."}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="btn-cyber-primary"
          style={{
            background: "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)",
            color: "#ffffff",
          }}
        >
          <RefreshCw size={15} />
          <span>Retry Connection</span>
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
