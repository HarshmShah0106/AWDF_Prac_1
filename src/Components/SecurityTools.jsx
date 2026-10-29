import { useState, useEffect } from "react";
import { ShieldCheck, Lock, Hash, Key, Copy, Check, Eye, EyeOff, Sparkles } from "lucide-react";

function SecurityTools() {
  const [activeTab, setActiveTab] = useState("password");

  // --- Tool 1: Password Analyzer State ---
  const [password, setPassword] = useState("CyberSec#2026!Defense");
  const [showPassword, setShowPassword] = useState(false);
  const [entropy, setEntropy] = useState(0);
  const [crackTime, setCrackTime] = useState("");
  const [strengthLabel, setStrengthLabel] = useState("");
  const [strengthColor, setStrengthColor] = useState("#00ff66");

  // --- Tool 2: Hash Generator State ---
  const [hashInput, setHashInput] = useState("Harsh Shah // Defensive Cyber Lab");
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
      setStrengthColor("#6b7280");
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
      setStrengthColor("#eab308");
      setCrackTime("A few hours to days");
    } else if (bits < 75) {
      setStrengthLabel("Strong");
      setStrengthColor("#00ff66");
      setCrackTime("Several decades");
    } else {
      setStrengthLabel("Very Strong (Military Grade)");
      setStrengthColor("#39ff14");
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
          <ShieldCheck size={14} color="#00ff66" />
          <span style={{ fontSize: "12px", color: "#00ff66", fontFamily: "var(--font-mono)", fontWeight: 700 }}>
            INTERACTIVE CRYPTOGRAPHIC WORKBENCH
          </span>
        </div>
        <h1 style={{ fontSize: "32px", color: "#ffffff", fontWeight: 800, marginBottom: "8px" }}>
          Cyber Security Laboratory
        </h1>
        <p style={{ color: "#86efac", fontSize: "15px", maxWidth: "680px" }}>
          Live browser-based cryptographic utilities using the native Web Cryptography API. Measure password bit entropy, generate one-way hash digests, and test encoding.
        </p>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "28px",
          borderBottom: "1px solid rgba(0, 255, 102, 0.2)",
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
            background: activeTab === "password" ? "rgba(0, 255, 102, 0.22)" : "transparent",
            color: activeTab === "password" ? "#00ff66" : "#86efac",
            border: activeTab === "password" ? "1px solid #00ff66" : "1px solid transparent",
            boxShadow: activeTab === "password" ? "0 0 15px rgba(0, 255, 102, 0.3)" : "none",
            padding: "9px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "13.5px",
            fontWeight: 600,
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
            background: activeTab === "hash" ? "rgba(0, 255, 102, 0.22)" : "transparent",
            color: activeTab === "hash" ? "#00ff66" : "#86efac",
            border: activeTab === "hash" ? "1px solid #00ff66" : "1px solid transparent",
            boxShadow: activeTab === "hash" ? "0 0 15px rgba(0, 255, 102, 0.3)" : "none",
            padding: "9px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "13.5px",
            fontWeight: 600,
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
            background: activeTab === "base64" ? "rgba(0, 255, 102, 0.22)" : "transparent",
            color: activeTab === "base64" ? "#00ff66" : "#86efac",
            border: activeTab === "base64" ? "1px solid #00ff66" : "1px solid transparent",
            boxShadow: activeTab === "base64" ? "0 0 15px rgba(0, 255, 102, 0.3)" : "none",
            padding: "9px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "13.5px",
            fontWeight: 600,
            transition: "all 0.2s ease",
          }}
        >
          <Key size={16} />
          <span>Base64 Encoder / Decoder</span>
        </button>
      </div>

      {/* --- TAB 1: PASSWORD ANALYZER --- */}
      {activeTab === "password" && (
        <div className="cyber-card" style={{ padding: "34px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "22px", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <h2 style={{ fontSize: "20px", color: "#ffffff", marginBottom: "4px" }}>
                Shannon Bit Entropy & Strength Meter
              </h2>
              <p style={{ fontSize: "14px", color: "#86efac" }}>
                Formula: $E = L \times \log_2(R)$ where $L$ is length and $R$ is character pool size.
              </p>
            </div>
            <button
              onClick={generateStrongPassword}
              className="btn-cyber-secondary"
              style={{ fontSize: "13px", padding: "8px 16px" }}
            >
              <Sparkles size={15} color="#00ff66" />
              <span>Generate 18-char Key</span>
            </button>
          </div>

          {/* Password Input */}
          <div style={{ position: "relative", marginBottom: "26px" }}>
            <label className="cyber-label">Test Password String</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                className="cyber-input"
                style={{ fontFamily: "var(--font-mono)", fontSize: "15px", paddingRight: "46px" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type or paste any password to analyze..."
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
                  color: "#00ff66",
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
              gap: "18px",
              marginBottom: "28px",
            }}
          >
            <div style={{ background: "rgba(3, 8, 4, 0.85)", padding: "18px", borderRadius: "8px", border: "1px solid rgba(0, 255, 102, 0.25)" }}>
              <span style={{ fontSize: "12px", color: "#00ff66", fontFamily: "var(--font-mono)", fontWeight: 700 }}>BIT ENTROPY</span>
              <div style={{ fontSize: "30px", fontWeight: 800, color: strengthColor, marginTop: "4px", textShadow: `0 0 10px ${strengthColor}` }}>
                {entropy} <span style={{ fontSize: "14px", fontWeight: 400, color: "#86efac" }}>bits</span>
              </div>
            </div>

            <div style={{ background: "rgba(3, 8, 4, 0.85)", padding: "18px", borderRadius: "8px", border: "1px solid rgba(0, 255, 102, 0.25)" }}>
              <span style={{ fontSize: "12px", color: "#00ff66", fontFamily: "var(--font-mono)", fontWeight: 700 }}>CLASSIFICATION</span>
              <div style={{ fontSize: "19px", fontWeight: 700, color: strengthColor, marginTop: "10px" }}>
                {strengthLabel}
              </div>
            </div>

            <div style={{ background: "rgba(3, 8, 4, 0.85)", padding: "18px", borderRadius: "8px", border: "1px solid rgba(0, 255, 102, 0.25)" }}>
              <span style={{ fontSize: "12px", color: "#00ff66", fontFamily: "var(--font-mono)", fontWeight: 700 }}>CRACK TIME (100B/SEC)</span>
              <div style={{ fontSize: "17px", fontWeight: 700, color: "#39ff14", marginTop: "10px" }}>
                {crackTime}
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
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
                  fontWeight: 600,
                  color: check.pass ? "#00ff66" : "#4ade80",
                  background: check.pass ? "rgba(0, 255, 102, 0.12)" : "rgba(3, 8, 4, 0.5)",
                  padding: "9px 14px",
                  borderRadius: "6px",
                  border: check.pass ? "1px solid #00ff66" : "1px solid rgba(0, 255, 102, 0.15)",
                }}
              >
                {check.pass ? <Check size={15} color="#00ff66" /> : <span style={{ width: "15px", color: "#4ade80" }}>•</span>}
                <span>{check.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB 2: HASH GENERATOR --- */}
      {activeTab === "hash" && (
        <div className="cyber-card" style={{ padding: "34px" }}>
          <div style={{ marginBottom: "22px" }}>
            <h2 style={{ fontSize: "20px", color: "#ffffff", marginBottom: "4px" }}>
              Native Web Cryptography Hash Generator
            </h2>
            <p style={{ fontSize: "14px", color: "#86efac" }}>
              Compute deterministic one-way cryptographic digests directly inside your browser without sending data over any network.
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            {["SHA-256", "SHA-384", "SHA-512"].map((alg) => (
              <button
                key={alg}
                onClick={() => setHashAlgorithm(alg)}
                style={{
                  background: hashAlgorithm === alg ? "rgba(0, 255, 102, 0.25)" : "rgba(3, 8, 4, 0.7)",
                  color: hashAlgorithm === alg ? "#00ff66" : "#86efac",
                  border: hashAlgorithm === alg ? "1px solid #00ff66" : "1px solid rgba(0, 255, 102, 0.25)",
                  boxShadow: hashAlgorithm === alg ? "0 0 10px rgba(0, 255, 102, 0.3)" : "none",
                  padding: "7px 16px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  cursor: "pointer",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                }}
              >
                {alg}
              </button>
            ))}
          </div>

          <div style={{ marginBottom: "22px" }}>
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
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "7px" }}>
              <label className="cyber-label">{hashAlgorithm} Output Digest (Hex)</label>
              <button
                onClick={() => copyToClipboard(sha256Hash)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  background: copiedHash ? "rgba(0, 255, 102, 0.25)" : "transparent",
                  color: copiedHash ? "#39ff14" : "#00ff66",
                  border: "none",
                  fontSize: "12.5px",
                  cursor: "pointer",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                }}
              >
                {copiedHash ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedHash ? "Digest Copied!" : "Copy Digest"}</span>
              </button>
            </div>

            <div
              style={{
                background: "rgba(3, 8, 4, 0.98)",
                border: "1px solid #00ff66",
                boxShadow: "0 0 15px rgba(0, 255, 102, 0.2)",
                borderRadius: "8px",
                padding: "18px",
                fontFamily: "var(--font-mono)",
                fontSize: "14px",
                color: "#00ff66",
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
        <div className="cyber-card" style={{ padding: "34px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "22px", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <h2 style={{ fontSize: "20px", color: "#ffffff", marginBottom: "4px" }}>
                Base64 Binary-to-Text Transformer
              </h2>
              <p style={{ fontSize: "14px", color: "#86efac" }}>
                Quick encoding and decoding for HTTP Authorization tokens, JSON Web Tokens (JWT), and cyber payloads.
              </p>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => setB64Mode("encode")}
                style={{
                  background: b64Mode === "encode" ? "rgba(0, 255, 102, 0.25)" : "rgba(3, 8, 4, 0.7)",
                  color: b64Mode === "encode" ? "#00ff66" : "#86efac",
                  border: b64Mode === "encode" ? "1px solid #00ff66" : "1px solid rgba(0, 255, 102, 0.25)",
                  boxShadow: b64Mode === "encode" ? "0 0 10px rgba(0, 255, 102, 0.3)" : "none",
                  padding: "7px 16px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Encode
              </button>
              <button
                onClick={() => setB64Mode("decode")}
                style={{
                  background: b64Mode === "decode" ? "rgba(0, 255, 102, 0.25)" : "rgba(3, 8, 4, 0.7)",
                  color: b64Mode === "decode" ? "#00ff66" : "#86efac",
                  border: b64Mode === "decode" ? "1px solid #00ff66" : "1px solid rgba(0, 255, 102, 0.25)",
                  boxShadow: b64Mode === "decode" ? "0 0 10px rgba(0, 255, 102, 0.3)" : "none",
                  padding: "7px 16px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Decode
              </button>
            </div>
          </div>

          <div style={{ marginBottom: "22px" }}>
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
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "7px" }}>
              <label className="cyber-label">Transformed Output</label>
              <button
                onClick={() => copyToClipboard(b64Output)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  background: copiedHash ? "rgba(0, 255, 102, 0.25)" : "transparent",
                  color: copiedHash ? "#39ff14" : "#00ff66",
                  border: "none",
                  fontSize: "12.5px",
                  cursor: "pointer",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                }}
              >
                {copiedHash ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedHash ? "Copied!" : "Copy Output"}</span>
              </button>
            </div>

            <div
              style={{
                background: "rgba(3, 8, 4, 0.98)",
                border: "1px solid #00ff66",
                boxShadow: "0 0 15px rgba(0, 255, 102, 0.2)",
                borderRadius: "8px",
                padding: "18px",
                fontFamily: "var(--font-mono)",
                fontSize: "14px",
                color: "#00ff66",
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
