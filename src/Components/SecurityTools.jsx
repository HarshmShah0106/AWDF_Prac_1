import { useState, useEffect } from "react";
import { ShieldCheck, Lock, Hash, Key, Copy, Check, RefreshCw, Eye, EyeOff, ShieldAlert, Sparkles } from "lucide-react";

function SecurityTools() {
  const [activeTab, setActiveTab] = useState("password");

  // --- Tool 1: Password Analyzer State ---
  const [password, setPassword] = useState("CyberSec#2026!CSPIT");
  const [showPassword, setShowPassword] = useState(false);
  const [entropy, setEntropy] = useState(0);
  const [crackTime, setCrackTime] = useState("");
  const [strengthLabel, setStrengthLabel] = useState("");
  const [strengthColor, setStrengthColor] = useState("#10b981");

  // --- Tool 2: Hash Generator State ---
  const [hashInput, setHashInput] = useState("Hello from Harsh Security Lab");
  const [sha256Hash, setSha256Hash] = useState("");
  const [hashAlgorithm, setHashAlgorithm] = useState("SHA-256");
  const [copiedHash, setCopiedHash] = useState(false);

  // --- Tool 3: Base64 Encoder / Decoder ---
  const [b64Input, setB64Input] = useState("Advanced Web Development Frameworks");
  const [b64Output, setB64Output] = useState("");
  const [b64Mode, setB64Mode] = useState("encode");

  // Calculate Password Entropy
  useEffect(() => {
    let poolSize = 0;
    if (/[a-z]/.test(password)) poolSize += 26;
    if (/[A-Z]/.test(password)) poolSize += 26;
    if (/[0-9]/.test(password)) poolSize += 10;
    if (/[^a-zA-Z0-9]/.test(password)) poolSize += 33;

    if (password.length === 0 || poolSize === 0) {
      setEntropy(0);
      setStrengthLabel("None");
      setStrengthColor("#64748b");
      setCrackTime("Instant");
      return;
    }

    const bits = Math.round(password.length * Math.log2(poolSize));
    setEntropy(bits);

    if (bits < 40) {
      setStrengthLabel("Very Weak");
      setStrengthColor("#ef4444");
      setCrackTime("< a few seconds");
    } else if (bits < 55) {
      setStrengthLabel("Moderate");
      setStrengthColor("#f59e0b");
      setCrackTime("A few hours to days");
    } else if (bits < 75) {
      setStrengthLabel("Strong");
      setStrengthColor("#10b981");
      setCrackTime("Several decades");
    } else {
      setStrengthLabel("Very Strong (Military Grade)");
      setStrengthColor("#38bdf8");
      setCrackTime("Millions of years");
    }
  }, [password]);

  // Generate Random Strong Password
  const generateStrongPassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}";
    let gen = "";
    const array = new Uint32Array(18);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < 18; i++) {
      gen += chars[array[i] % chars.length];
    }
    setPassword(gen);
  };

  // Calculate Cryptographic Hash
  useEffect(() => {
    async function computeHash() {
      if (!hashInput) {
        setSha256Hash("");
        return;
      }
      try {
        const msgUint8 = new TextEncoder().encode(hashInput);
        const hashBuffer = await window.crypto.subtle.digest(hashAlgorithm, msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
        setSha256Hash(hashHex);
      } catch {
        setSha256Hash("Error computing hash");
      }
    }
    computeHash();
  }, [hashInput, hashAlgorithm]);

  // Base64 Transform
  useEffect(() => {
    try {
      if (b64Mode === "encode") {
        setB64Output(btoa(unescape(encodeURIComponent(b64Input))));
      } else {
        setB64Output(decodeURIComponent(escape(atob(b64Input))));
      }
    } catch {
      setB64Output("Error: Invalid Base64 String");
    }
  }, [b64Input, b64Mode]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="page-container" style={{ textAlign: "left" }}>
      {/* Page Header */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <ShieldCheck size={14} color="#10b981" />
          <span style={{ fontSize: "12px", color: "#10b981", fontFamily: "var(--font-mono)", fontWeight: 600 }}>
            INTERACTIVE CRYPTO WORKBENCH
          </span>
        </div>
        <h1 style={{ fontSize: "32px", color: "#f8fafc", fontWeight: 700, marginBottom: "8px" }}>
          Cyber Security Laboratory
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "15px", maxWidth: "680px" }}>
          Live browser-based cryptographic utilities using the native Web Cryptography API. Measure password bit entropy, generate one-way hash digests, and test encoding.
        </p>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "28px",
          borderBottom: "1px solid rgba(56, 189, 248, 0.15)",
          paddingBottom: "12px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => setActiveTab("password")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: activeTab === "password" ? "rgba(16, 185, 129, 0.2)" : "transparent",
            color: activeTab === "password" ? "#10b981" : "#94a3b8",
            border: activeTab === "password" ? "1px solid #10b981" : "1px solid transparent",
            padding: "8px 16px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 500,
            transition: "all 0.2s ease",
          }}
        >
          <Lock size={16} />
          <span>Password Entropy Analyzer</span>
        </button>

        <button
          onClick={() => setActiveTab("hash")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: activeTab === "hash" ? "rgba(6, 182, 212, 0.2)" : "transparent",
            color: activeTab === "hash" ? "#38bdf8" : "#94a3b8",
            border: activeTab === "hash" ? "1px solid #06b6d4" : "1px solid transparent",
            padding: "8px 16px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 500,
            transition: "all 0.2s ease",
          }}
        >
          <Hash size={16} />
          <span>Cryptographic Hash Generator</span>
        </button>

        <button
          onClick={() => setActiveTab("base64")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: activeTab === "base64" ? "rgba(168, 85, 247, 0.2)" : "transparent",
            color: activeTab === "base64" ? "#c084fc" : "#94a3b8",
            border: activeTab === "base64" ? "1px solid #a855f7" : "1px solid transparent",
            padding: "8px 16px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 500,
            transition: "all 0.2s ease",
          }}
        >
          <Key size={16} />
          <span>Base64 Encoder / Decoder</span>
        </button>
      </div>

      {/* --- TAB 1: PASSWORD ANALYZER --- */}
      {activeTab === "password" && (
        <div className="cyber-card" style={{ padding: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div>
              <h2 style={{ fontSize: "20px", color: "#f8fafc", marginBottom: "4px" }}>
                Shannon Bit Entropy & Strength Meter
              </h2>
              <p style={{ fontSize: "14px", color: "#94a3b8" }}>
                Formula: $E = L \times \log_2(R)$ where $L$ is length and $R$ is character pool size.
              </p>
            </div>
            <button
              onClick={generateStrongPassword}
              className="btn-cyber-secondary"
              style={{ fontSize: "13px", padding: "8px 14px" }}
            >
              <Sparkles size={14} color="#10b981" />
              <span>Generate 18-char Key</span>
            </button>
          </div>

          {/* Password Input with show/hide */}
          <div style={{ position: "relative", marginBottom: "24px" }}>
            <label className="cyber-label">Test Password String</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                className="cyber-input"
                style={{ fontFamily: "var(--font-mono)", fontSize: "15px", paddingRight: "44px" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type or paste any password to analyze..."
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  color: "#94a3b8",
                  cursor: "pointer",
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Metrics Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
              marginBottom: "28px",
            }}
          >
            <div style={{ background: "rgba(11, 15, 25, 0.8)", padding: "16px", borderRadius: "8px", border: "1px solid rgba(56, 189, 248, 0.15)" }}>
              <span style={{ fontSize: "12px", color: "#64748b", fontFamily: "var(--font-mono)" }}>BIT ENTROPY</span>
              <div style={{ fontSize: "28px", fontWeight: 700, color: strengthColor, marginTop: "4px" }}>
                {entropy} <span style={{ fontSize: "14px", fontWeight: 400, color: "#94a3b8" }}>bits</span>
              </div>
            </div>

            <div style={{ background: "rgba(11, 15, 25, 0.8)", padding: "16px", borderRadius: "8px", border: "1px solid rgba(56, 189, 248, 0.15)" }}>
              <span style={{ fontSize: "12px", color: "#64748b", fontFamily: "var(--font-mono)" }}>CLASSIFICATION</span>
              <div style={{ fontSize: "18px", fontWeight: 600, color: strengthColor, marginTop: "8px" }}>
                {strengthLabel}
              </div>
            </div>

            <div style={{ background: "rgba(11, 15, 25, 0.8)", padding: "16px", borderRadius: "8px", border: "1px solid rgba(56, 189, 248, 0.15)" }}>
              <span style={{ fontSize: "12px", color: "#64748b", fontFamily: "var(--font-mono)" }}>CRACK TIME (100B/SEC)</span>
              <div style={{ fontSize: "16px", fontWeight: 600, color: "#38bdf8", marginTop: "10px" }}>
                {crackTime}
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
            {[
              { label: "12+ Characters", pass: password.length >= 12 },
              { label: "Uppercase & Lowercase", pass: /[a-z]/.test(password) && /[A-Z]/.test(password) },
              { label: "Numbers (0-9)", pass: /[0-9]/.test(password) },
              { label: "Special Symbols (!@#$)", pass: /[^a-zA-Z0-9]/.test(password) },
            ].map((check, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13px",
                  color: check.pass ? "#34d399" : "#64748b",
                  background: check.pass ? "rgba(16, 185, 129, 0.08)" : "rgba(15, 23, 42, 0.4)",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: check.pass ? "1px solid rgba(16, 185, 129, 0.2)" : "1px solid rgba(255, 255, 255, 0.05)",
                }}
              >
                {check.pass ? <Check size={14} color="#10b981" /> : <span style={{ width: "14px" }}>•</span>}
                <span>{check.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB 2: HASH GENERATOR --- */}
      {activeTab === "hash" && (
        <div className="cyber-card" style={{ padding: "32px" }}>
          <div style={{ marginBottom: "20px" }}>
            <h2 style={{ fontSize: "20px", color: "#f8fafc", marginBottom: "4px" }}>
              Native Web Cryptography Hash Generator
            </h2>
            <p style={{ fontSize: "14px", color: "#94a3b8" }}>
              Compute deterministic one-way cryptographic digests directly inside your browser without sending data to any remote server.
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px", marginBottom: "18px" }}>
            {["SHA-256", "SHA-384", "SHA-512"].map((alg) => (
              <button
                key={alg}
                onClick={() => setHashAlgorithm(alg)}
                style={{
                  background: hashAlgorithm === alg ? "rgba(6, 182, 212, 0.2)" : "rgba(11, 15, 25, 0.6)",
                  color: hashAlgorithm === alg ? "#38bdf8" : "#94a3b8",
                  border: hashAlgorithm === alg ? "1px solid #06b6d4" : "1px solid rgba(56, 189, 248, 0.15)",
                  padding: "6px 14px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  cursor: "pointer",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {alg}
              </button>
            ))}
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label className="cyber-label">Plaintext Input Payload</label>
            <textarea
              className="cyber-input"
              rows={3}
              value={hashInput}
              onChange={(e) => setHashInput(e.target.value)}
              placeholder="Enter text payload to hash..."
              style={{ fontFamily: "var(--font-mono)", resize: "vertical" }}
            />
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <label className="cyber-label">{hashAlgorithm} Output Digest (Hex)</label>
              <button
                onClick={() => copyToClipboard(sha256Hash)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  background: copiedHash ? "rgba(16, 185, 129, 0.2)" : "transparent",
                  color: copiedHash ? "#34d399" : "#38bdf8",
                  border: "none",
                  fontSize: "12px",
                  cursor: "pointer",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {copiedHash ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedHash ? "Digest Copied!" : "Copy Digest"}</span>
              </button>
            </div>

            <div
              style={{
                background: "rgba(11, 15, 25, 0.95)",
                border: "1px solid rgba(56, 189, 248, 0.25)",
                borderRadius: "8px",
                padding: "16px",
                fontFamily: "var(--font-mono)",
                fontSize: "13.5px",
                color: "#10b981",
                wordBreak: "break-all",
                lineHeight: 1.6,
              }}
            >
              {sha256Hash || "No input provided"}
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 3: BASE64 ENCODER / DECODER --- */}
      {activeTab === "base64" && (
        <div className="cyber-card" style={{ padding: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div>
              <h2 style={{ fontSize: "20px", color: "#f8fafc", marginBottom: "4px" }}>
                Base64 Binary-to-Text Transformer
              </h2>
              <p style={{ fontSize: "14px", color: "#94a3b8" }}>
                Quick encoding and decoding for HTTP Authorization tokens, JSON Web Tokens (JWT), and payloads.
              </p>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => setB64Mode("encode")}
                style={{
                  background: b64Mode === "encode" ? "rgba(168, 85, 247, 0.2)" : "rgba(11, 15, 25, 0.6)",
                  color: b64Mode === "encode" ? "#c084fc" : "#94a3b8",
                  border: b64Mode === "encode" ? "1px solid #a855f7" : "1px solid rgba(56, 189, 248, 0.15)",
                  padding: "6px 14px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                Encode
              </button>
              <button
                onClick={() => setB64Mode("decode")}
                style={{
                  background: b64Mode === "decode" ? "rgba(168, 85, 247, 0.2)" : "rgba(11, 15, 25, 0.6)",
                  color: b64Mode === "decode" ? "#c084fc" : "#94a3b8",
                  border: b64Mode === "decode" ? "1px solid #a855f7" : "1px solid rgba(56, 189, 248, 0.15)",
                  padding: "6px 14px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                Decode
              </button>
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label className="cyber-label">Input Data</label>
            <textarea
              className="cyber-input"
              rows={3}
              value={b64Input}
              onChange={(e) => setB64Input(e.target.value)}
              placeholder="Enter text to convert..."
              style={{ fontFamily: "var(--font-mono)" }}
            />
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <label className="cyber-label">Transformed Output</label>
              <button
                onClick={() => copyToClipboard(b64Output)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  background: copiedHash ? "rgba(168, 85, 247, 0.2)" : "transparent",
                  color: copiedHash ? "#c084fc" : "#38bdf8",
                  border: "none",
                  fontSize: "12px",
                  cursor: "pointer",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {copiedHash ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedHash ? "Copied!" : "Copy Output"}</span>
              </button>
            </div>

            <div
              style={{
                background: "rgba(11, 15, 25, 0.95)",
                border: "1px solid rgba(168, 85, 247, 0.25)",
                borderRadius: "8px",
                padding: "16px",
                fontFamily: "var(--font-mono)",
                fontSize: "13.5px",
                color: "#c084fc",
                wordBreak: "break-all",
                lineHeight: 1.6,
              }}
            >
              {b64Output || "Waiting for input..."}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SecurityTools;

