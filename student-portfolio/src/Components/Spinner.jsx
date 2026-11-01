function Spinner({ text = "Loading..." }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "80px 20px", gap: "16px",
    }}>
      <div style={{
        width: "36px", height: "36px",
        border: "2px solid rgba(99,102,241,0.2)",
        borderTopColor: "#6366f1",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
      <span style={{
        fontSize: "13px", color: "#475569",
        fontFamily: "var(--font-mono)", letterSpacing: "0.04em",
      }}>
        {text}
      </span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
export default Spinner;
