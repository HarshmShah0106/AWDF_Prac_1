import { useState, useEffect } from "react";
import { ShieldCheck, Lock, Hash, Key, Copy, Check, Eye, EyeOff, Sparkles, AlertCircle } from "lucide-react";

function SecurityTools() {
  const [activeTab, setActiveTab] = useState("password");

  // --- Tool 1: Password Analyzer State ---
  const [password, setPassword] = useState("CyberSec#2026!Defense");
  const [showPassword, setShowPassword] = useState(false);
  const [entropy, setEntropy] = useState(0);
  const [crackTime, setCrackTime] = useState("");
  const [strengthLabel, setStrengthLabel] = useState("");
  const [strengthColor, setStrengthColor] = useState("#818cf8");

  // --- Tool 2: Hash Generator State ---
  const [hashInput, setHashInput] = useState("Harsh Shah // Defensive Cyber Lab");
  const [sha256Hash, setSha256Hash] = useState("");
  const [hashAlgorithm, setHashAlgorithm] = useState("SHA-256");
  const [copiedHash, setCopiedHash] = useState(false);

  // --- Tool 3: Base64 Encoder / Decoder ---
  const [b64Input, setB64Input] = useState("Advanced Web Development Frameworks");
  const [b64Output, setB64Output] = useState("");
  const [b64Mode, setB64Mode] = useState("encode");
  const [copiedB64, setCopiedB64] = useState(false);

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
      setStrengthColor("#f43f5e");
      setCrackTime("< a few seconds");
    } else if (bits < 55) {
      setStrengthLabel("Moderate");
      setStrengthColor("#f59e0b");
      setCrackTime("A few hours to days");
    } else if (bits < 75) {
      setStrengthLabel("Strong");
      setStrengthColor("#38bdf8");
      setCrackTime("Several decades");
    } else {
      setStrengthLabel("Military-Grade (Very Strong)");
      setStrengthColor("#10b981");
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

  // Compute Cryptographic Hash via SubtleCrypto
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

  const copyToClipboard = (text, isHash = true) => {
    navigator.clipboard.writeText(text);
    if (isHash) {
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    } else {
      setCopiedB64(true);
      setTimeout(() => setCopiedB64(false), 2000);
    }
  };

  const tabs = [
    { id: "password", label: "Password Entropy Analyzer", icon: <Lock size={15} /> },
    { id: "hash", label: "Cryptographic Hash Generator", icon: <Hash size={15} /> },
    { id: "base64", label: "Base64 Transformer", icon: <Key size={15} /> },
  ];

  return (
    <div className="page-container" style={{ textAlign: "left" }}>
      {/* Page Header */}
      <div style={{ marginBottom: "32px" }}>
        <div className="section-label">Interactive Cryptographic Workbench</div>
        <h1 className="section-heading" style={{ fontSize: "clamp(28px, 4vw, 42px)", marginBottom: "10px" }}>
          Cyber Security <span className="gradient-text">Laboratory</span>
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "15.5px", maxWidth: "680px", lineHeight: 1.65 }}>
          Live browser-based cryptographic utilities running directly on top of the native Web Cryptography API.
          Measure password Shannon entropy, generate one-way hash digests, and test payload encoding.
        </p>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "28px",
          borderBottom: "1px solid var(--border)",
          paddingBottom: "12px",
          flexWrap: "wrap",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: activeTab === tab.id ? "rgba(99, 102, 241, 0.16)" : "transparent",
              color: activeTab === tab.id ? "#c7d2fe" : "var(--text-secondary)",
              border: activeTab === tab.id ? "1px solid rgba(99, 102, 241, 0.35)" : "1px solid transparent",
              padding: "9px 18px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "13.5px",
              fontWeight: 500,
              transition: "all 0.18s ease",
            }}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* --- TAB 1: PASSWORD ANALYZER --- */}
      {activeTab === "password" && (
        <div className="card" style={{ padding: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px", flexWrap: "wrap", gap: "14px" }}>
            <div>
              <h2 style={{ fontSize: "20px", color: "var(--text-primary)", fontWeight: 700, marginBottom: "4px" }}>
                Shannon Bit Entropy & Strength Meter
              </h2>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
                Calculated via $E = L \times \log_2(R)$ where $L$ is length and $R$ is character set size.
              </p>
            </div>
            <button
              onClick={generateStrongPassword}
              className="btn-secondary"
              style={{ fontSize: "13px", padding: "8px 16px" }}
            >
              <Sparkles size={14} color="#818cf8" />
              <span>Generate 18-Char Key</span>
            </button>
          </div>

          {/* Password Input */}
          <div style={{ position: "relative", marginBottom: "26px" }}>
            <label className="label">Test String</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                className="input"
                style={{ fontFamily: "var(--font-mono)", fontSize: "15px", paddingRight: "46px" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type or paste any password string to evaluate..."
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  color: "var(--text-muted)",
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
            <div style={{ background: "rgba(255, 255, 255, 0.02)", padding: "18px", borderRadius: "10px", border: "1px solid var(--border)" }}>
              <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontWeight: 600 }}>
                BIT ENTROPY
              </span>
              <div style={{ fontSize: "32px", fontWeight: 800, color: strengthColor, marginTop: "4px" }}>
                {entropy} <span style={{ fontSize: "14px", fontWeight: 400, color: "var(--text-muted)" }}>bits</span>
              </div>
            </div>

            <div style={{ background: "rgba(255, 255, 255, 0.02)", padding: "18px", borderRadius: "10px", border: "1px solid var(--border)" }}>
              <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontWeight: 600 }}>
                CLASSIFICATION
              </span>
              <div style={{ fontSize: "18px", fontWeight: 700, color: strengthColor, marginTop: "12px" }}>
                {strengthLabel}
              </div>
            </div>

            <div style={{ background: "rgba(255, 255, 255, 0.02)", padding: "18px", borderRadius: "10px", border: "1px solid var(--border)" }}>
              <span style={{ fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontWeight: 600 }}>
                CRACK TIME (100B/SEC)
              </span>
              <div style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)", marginTop: "12px" }}>
                {crackTime}
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
            {[
              { label: "12+ Characters", pass: password.length >= 12 },
              { label: "Upper & Lowercase", pass: /[a-z]/.test(password) && /[A-Z]/.test(password) },
              { label: "Numeric Digits (0-9)", pass: /[0-9]/.test(password) },
              { label: "Special Symbols (!@#$)", pass: /[^a-zA-Z0-9]/.test(password) },
            ].map((check, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: check.pass ? "var(--text-primary)" : "var(--text-muted)",
                  background: check.pass ? "rgba(16, 185, 129, 0.08)" : "rgba(255, 255, 255, 0.02)",
                  padding: "9px 14px",
                  borderRadius: "8px",
                  border: check.pass ? "1px solid rgba(16, 185, 129, 0.25)" : "1px solid var(--border)",
                }}
              >
                {check.pass ? <Check size={14} color="#10b981" /> : <span style={{ width: "14px", color: "var(--text-faint)" }}>•</span>}
                <span>{check.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB 2: HASH GENERATOR --- */}
      {activeTab === "hash" && (
        <div className="card" style={{ padding: "32px" }}>
          <div style={{ marginBottom: "22px" }}>
            <h2 style={{ fontSize: "20px", color: "var(--text-primary)", fontWeight: 700, marginBottom: "4px" }}>
              Native Web Cryptography Hash Generator
            </h2>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
              Computes deterministic one-way cryptographic digests directly inside your browser without transmitting any payload over the network.
            </p>
          </div>

          <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
            {["SHA-256", "SHA-384", "SHA-512"].map((alg) => (
              <button
                key={alg}
                onClick={() => setHashAlgorithm(alg)}
                style={{
                  background: hashAlgorithm === alg ? "rgba(99, 102, 241, 0.2)" : "rgba(255, 255, 255, 0.03)",
                  color: hashAlgorithm === alg ? "#c7d2fe" : "var(--text-secondary)",
                  border: hashAlgorithm === alg ? "1px solid rgba(99, 102, 241, 0.4)" : "1px solid var(--border)",
                  padding: "7px 16px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  cursor: "pointer",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 500,
                }}
              >
                {alg}
              </button>
            ))}
          </div>

          <div style={{ marginBottom: "22px" }}>
            <label className="label">Plaintext Input Payload</label>
            <textarea
              className="input"
              rows={3}
              value={hashInput}
              onChange={(e) => setHashInput(e.target.value)}
              placeholder="Enter text payload to hash..."
              style={{ fontFamily: "var(--font-mono)" }}
            />
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "7px" }}>
              <label className="label">{hashAlgorithm} Output Digest (Hexadecimal)</label>
              <button
                onClick={() => copyToClipboard(sha256Hash, true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  background: copiedHash ? "rgba(16, 185, 129, 0.15)" : "transparent",
                  color: copiedHash ? "#34d399" : "#818cf8",
                  border: "none",
                  fontSize: "12.5px",
                  cursor: "pointer",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                }}
              >
                {copiedHash ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedHash ? "Digest Copied" : "Copy Digest"}</span>
              </button>
            </div>

            <div
              style={{
                background: "rgba(8, 10, 20, 0.98)",
                border: "1px solid var(--border-strong)",
                borderRadius: "10px",
                padding: "18px",
                fontFamily: "var(--font-mono)",
                fontSize: "13.5px",
                color: "#818cf8",
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
        <div className="card" style={{ padding: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "22px", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <h2 style={{ fontSize: "20px", color: "var(--text-primary)", fontWeight: 700, marginBottom: "4px" }}>
                Base64 Binary-to-Text Transformer
              </h2>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
                Quick encoding and decoding for HTTP authorization headers, JWT components, and cyber payloads.
              </p>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => setB64Mode("encode")}
                style={{
                  background: b64Mode === "encode" ? "rgba(99, 102, 241, 0.2)" : "rgba(255, 255, 255, 0.03)",
                  color: b64Mode === "encode" ? "#c7d2fe" : "var(--text-secondary)",
                  border: b64Mode === "encode" ? "1px solid rgba(99, 102, 241, 0.4)" : "1px solid var(--border)",
                  padding: "7px 16px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                Encode
              </button>
              <button
                onClick={() => setB64Mode("decode")}
                style={{
                  background: b64Mode === "decode" ? "rgba(99, 102, 241, 0.2)" : "rgba(255, 255, 255, 0.03)",
                  color: b64Mode === "decode" ? "#c7d2fe" : "var(--text-secondary)",
                  border: b64Mode === "decode" ? "1px solid rgba(99, 102, 241, 0.4)" : "1px solid var(--border)",
                  padding: "7px 16px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                Decode
              </button>
            </div>
          </div>

          <div style={{ marginBottom: "22px" }}>
            <label className="label">Input Payload</label>
            <textarea
              className="input"
              rows={3}
              value={b64Input}
              onChange={(e) => setB64Input(e.target.value)}
              placeholder="Enter text to convert..."
              style={{ fontFamily: "var(--font-mono)" }}
            />
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "7px" }}>
              <label className="label">Transformed Output</label>
              <button
                onClick={() => copyToClipboard(b64Output, false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  background: copiedB64 ? "rgba(16, 185, 129, 0.15)" : "transparent",
                  color: copiedB64 ? "#34d399" : "#818cf8",
                  border: "none",
                  fontSize: "12.5px",
                  cursor: "pointer",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                }}
              >
                {copiedB64 ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedB64 ? "Output Copied" : "Copy Output"}</span>
              </button>
            </div>

            <div
              style={{
                background: "rgba(8, 10, 20, 0.98)",
                border: "1px solid var(--border-strong)",
                borderRadius: "10px",
                padding: "18px",
                fontFamily: "var(--font-mono)",
                fontSize: "13.5px",
                color: "#818cf8",
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
