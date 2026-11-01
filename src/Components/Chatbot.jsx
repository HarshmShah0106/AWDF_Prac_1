import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Sparkles, AlertCircle, RefreshCw, ChevronDown, Key } from "lucide-react";

// Harsh Shah's Comprehensive Knowledge Base Context for Gemini
const HARSH_SYSTEM_PROMPT = `
You are the personal AI Assistant for Harsh Shah's Portfolio Website. Your job is to answer questions from recruiters, engineers, professors, and visitors about Harsh, his qualifications, technical skills, projects, and contact details.

Here is everything you know about Harsh Shah:
- FULL NAME: Harsh Shah
- TITLE / ROLE: Cybersecurity Researcher & Full-Stack Architect
- ACADEMIC DEGREE: 5th-Semester B.Tech in Information Technology
- PRIMARY EMAIL: harsh@gmail.com
- GITHUB PROFILE: https://github.com/HarshmShah0106
- PORTFOLIO WEBSITE: Built with React 19, Vite, and containerized with Docker Compose.

TECHNICAL SKILLS:
- Cybersecurity & Defense: OWASP Top 10 Auditing (SQL Injection, XSS, CSRF, IDOR), Web Application Penetration Testing (Burp Suite), Password Hashing (Bcrypt), Stateless Tokens (JWT), Cryptography & Hashing (SHA-256, AES-256, HMAC), Linux System Hardening (iptables, permissions, SSH), Packet Analysis (Wireshark).
- Web Development: React 19, React Router, Node.js, Express.js, JavaScript (ES6+), TypeScript, Vite, Modern CSS/HTML5, MongoDB & Mongoose ODM.
- DevSecOps & Architecture: Docker, Multi-Container Docker Compose, Segmented Bridge Networks, In-Memory Caching (node-cache with sub-10ms response latencies), Git & Version Control, Bash Shell Scripting.

PROFESSIONAL CERTIFICATIONS (6 Accredited Credentials):
1. Certified Ethical Hacker (CEH v13) — EC-Council (Status: Active Candidate / Ongoing) — Focused on AI-driven threat detection, network penetration testing, and malware analysis.
2. Google Cybersecurity Professional Certificate (v.2) — Google (Verified) — SIEM, Python security automation, Linux/SQL auditing, incident response.
3. Google Cloud Cybersecurity Certificate — Google Cloud (Verified) — Cloud IAM, VPC firewalls, GCP Security Command Center, KMS encryption.
4. Microsoft Security Immersion Completion Badge — Microsoft (Verified) — Microsoft Defender XDR, Entra ID (Azure AD), identity protection.
5. Ethical Hacking Essentials (EHE) — EC-Council (Verified) — Web app pentesting, port scanning, footprinting, countermeasures.
6. Advanced SQLite Queries with Belkasoft — Belkasoft Digital Forensics (Verified) — Database forensics, WAL/journal carving, digital evidence recovery.

FEATURED PROJECTS & LABS:
- Task Management Application: Full-stack MERN system with JWT authentication, custom middleware, node-cache in-memory optimization, and containerized Docker Compose architecture.
- Interactive Cyber Security Workbench: Client-side cryptographic suite with Shannon Bit Entropy Analyzer, native Web Cryptography Hash Generator (SHA-256/384/512), and Base64 transformers.
- Open Source Repositories on GitHub: Contains public projects covering web frameworks, security scripts, and container deployments.

CAREER AVAILABILITY:
- Harsh is actively exploring cybersecurity internships, software engineering roles, and collaborative technical projects.

GUIDELINES FOR YOUR RESPONSES:
- Be professional, warm, engaging, and articulate.
- Highlight his strengths in defensive security, full-stack architecture, and problem-solving.
- Keep answers concise (2-4 paragraphs or formatted bullet points).
- If someone asks how to hire or contact Harsh, provide his email (harsh@gmail.com) and invite them to use the Contact page.
- Do not make up facts outside the provided context.
`;

const INITIAL_MESSAGE = {
  id: "welcome",
  role: "model",
  text: "Hello! I'm Harsh's AI Portfolio Assistant. Ask me anything about his qualifications, cybersecurity certifications, technical skills, or projects!",
  time: "Just now",
};

const SUGGESTIONS = [
  "What are Harsh's cybersecurity certifications?",
  "Tell me about his technical skills",
  "What projects has he worked on?",
  "Is Harsh open for internships?",
];

// Rich curated knowledge base ensuring instant, zero-failure responses
const CURATED_KNOWLEDGE = {
  certifications: `Harsh Shah holds 6 accredited credentials across Offensive & Defensive Cybersecurity, Cloud Governance, and Digital Forensics:

1. 🛡️ Certified Ethical Hacker (CEH v13) — EC-Council (Active Candidate / Ongoing)
   • Core Focus: AI-driven threat mitigation, network penetration testing, perimeter vulnerability auditing, and malware defense.

2. ☁️ Google Cloud Cybersecurity Certificate — Google Cloud
   • Core Focus: Cloud IAM identity boundaries, VPC firewall architectures, Google Security Command Center (SCC), and KMS encryption protocols.

3. 🔒 Google Cybersecurity Professional Certificate (v.2) — Google
   • Core Focus: SIEM security event log analysis, Python automation scripts for intrusion detection, Linux system hardening, and incident triage.

4. 🛡️ Microsoft Security Immersion Completion Badge — Microsoft
   • Core Focus: Enterprise threat hunting with Microsoft Defender XDR, Azure AD / Microsoft Entra ID privileged identity governance.

5. ⚔️ Ethical Hacking Essentials (EHE) — EC-Council
   • Core Focus: Web application security auditing, SQL injection & XSS vulnerability assessment, footprinting, and countermeasures.

6. 🔍 Advanced SQLite Queries with Belkasoft — Belkasoft Digital Forensics
   • Core Focus: Forensic database query reconstruction, Write-Ahead Logging (WAL) forensic carving, deleted record recovery, and evidence integrity.`,

  skills: `Harsh Shah's technical skill set and cybersecurity arsenal:

• 🛡️ Defensive Security & Auditing:
  - OWASP Top 10 Auditing (SQLi, XSS, CSRF, IDOR, SSRF)
  - Web Application Penetration Testing (Burp Suite, Nmap)
  - Cryptography & Hashing (SHA-256/512, AES-256, HMAC, Bcrypt)
  - Stateless Authentication & RBAC (JWT, Session Management)
  - Network Traffic & Packet Analysis (Wireshark, tcpdump)
  - Linux Hardening (iptables, UFW, file permissions, SSH keys)

• 💻 Modern Full-Stack Engineering:
  - React 19, Modern JavaScript (ES6+), TypeScript, Vite
  - Node.js & Express.js RESTful API architectures
  - MongoDB & Mongoose ODM database modeling

• ⚙️ DevSecOps & Containerization:
  - Multi-Container Docker Compose setups
  - Segmented bridge networking & least-privilege containers
  - Sub-10ms In-Memory Caching (node-cache) with auto-invalidation
  - Git version control & CI/CD deployment workflows`,

  projects: `Featured Projects & Engineering Labs built by Harsh:

1. 🚀 Full-Stack Task Management & Performance Engine:
   • Architecture: Multi-tier MERN stack containerized with Docker Compose.
   • Security: Bcrypt password hashing, JWT stateless authentication middleware, and route protection.
   • Performance: High-speed in-memory caching (node-cache) achieving sub-10ms response latencies.

2. 🔬 Interactive Cyber Security Workbench:
   • Shannon Bit Entropy Analyzer to detect high-entropy keys/secrets.
   • Web Cryptography API Hash Generator (SHA-256, SHA-384, SHA-512).
   • Base64 encoding/decoding transformers for payload analysis.

3. 🌐 Modern Glassmorphism Portfolio:
   • Built with React 19, Vite, responsive CSS design tokens, and integrated Gemini AI conversational assistant.`,

  education: `🎓 Academic Background & Qualifications:

• Degree: B.Tech in Information Technology
• Academic Standing: Currently in 5th Semester
• Focus Areas: Applied Cybersecurity, Defensive Security Frameworks, Distributed Systems, and Advanced Web Development Frameworks (AWDF).
• Practical Experience: Extensive hands-on lab work in containerization, penetration testing, and secure web application development.`,

  contact: `📫 Contact & Career Availability:

• Primary Email: harsh@gmail.com
• GitHub Profile: https://github.com/HarshmShah0106
• Message Form: You can send a direct transmission via the Contact / Transmission page on this site!
• Status: Harsh is actively exploring cybersecurity internships, security engineering roles, and collaborative full-stack projects.`,
};

// Match user prompts to curated answers for zero-latency, reliable outputs
const getCuratedAnswer = (query) => {
  const lower = (query || "").toLowerCase();

  // 1. Certifications
  if (
    lower.includes("certif") ||
    lower.includes("ceh") ||
    lower.includes("credential") ||
    lower.includes("belkasoft") ||
    lower.includes("sqlite") ||
    lower.includes("ethical hack") ||
    lower.includes("google cloud") ||
    lower.includes("immersion") ||
    lower.includes("badge")
  ) {
    return CURATED_KNOWLEDGE.certifications;
  }

  // 2. Skills & Tech Stack
  if (
    lower.includes("skill") ||
    lower.includes("tech") ||
    lower.includes("stack") ||
    lower.includes("owasp") ||
    lower.includes("tool") ||
    lower.includes("defense") ||
    lower.includes("penetration") ||
    lower.includes("cyber")
  ) {
    return CURATED_KNOWLEDGE.skills;
  }

  // 3. Projects & Labs
  if (
    lower.includes("project") ||
    lower.includes("task") ||
    lower.includes("portfolio") ||
    lower.includes("lab") ||
    lower.includes("work") ||
    lower.includes("app")
  ) {
    return CURATED_KNOWLEDGE.projects;
  }

  // 4. Education & Qualifications
  if (
    lower.includes("qualif") ||
    lower.includes("educat") ||
    lower.includes("degree") ||
    lower.includes("btech") ||
    lower.includes("sem") ||
    lower.includes("college") ||
    lower.includes("school")
  ) {
    return CURATED_KNOWLEDGE.education;
  }

  // 5. Contact & Hiring
  if (
    lower.includes("contact") ||
    lower.includes("hire") ||
    lower.includes("email") ||
    lower.includes("intern") ||
    lower.includes("reach") ||
    lower.includes("message") ||
    lower.includes("github")
  ) {
    return CURATED_KNOWLEDGE.contact;
  }

  // 6. About Harsh / General intro
  if (
    lower.includes("who is") ||
    lower.includes("about harsh") ||
    lower.includes("who are you") ||
    lower.includes("tell me about") ||
    lower.includes("intro")
  ) {
    return `Harsh Shah is a 5th-semester B.Tech Information Technology student specializing in applied cybersecurity, defensive architectures, and full-stack engineering.\n\nHe holds 6 accredited certifications (including CEH v13, Google Cloud Cybersecurity, and Microsoft Security Immersion) and develops containerized web applications with high-security zero-trust principles.\n\nFeel free to ask about his:\n• 🛡️ 6 Cybersecurity Certifications\n• ⚡ Technical Skills & Arsenal\n• 🚀 Featured Projects & Labs\n• 📫 Contact & Internship availability`;
  }

  return null;
};

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Retrieve Gemini API Key from Vite environment
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY || "";
  const hasKey = Boolean(apiKey && apiKey.trim().length > 5);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const callGeminiAPI = async (userPrompt, chatHistory) => {
    // Build conversation contents for Gemini API
    const contents = [
      {
        role: "user",
        parts: [{ text: `${HARSH_SYSTEM_PROMPT}\n\nPlease acknowledge and act as Harsh's AI assistant.` }],
      },
      {
        role: "model",
        parts: [{ text: "Understood. I am ready to represent Harsh Shah and assist visitors with details on his skills, certifications, and projects." }],
      },
    ];

    // Append recent messages
    chatHistory.slice(-4).forEach((msg) => {
      contents.push({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      });
    });

    // Add current user prompt
    contents.push({
      role: "user",
      parts: [{ text: userPrompt }],
    });

    const payload = {
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 600,
      },
    };

    const models = ["gemini-3.8-flash", "gemini-flash-latest"];

    for (const model of models) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`;
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          const candidate = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidate) return candidate;
        }
      } catch (err) {
        clearTimeout(timeoutId);
      }
    }

    throw new Error("Gemini fallback triggered");
  };

  const handleSend = async (textToSend) => {
    const text = (textToSend || input).trim();
    if (!text || loading) return;

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // 1. Instant check for Curated Responses (Certifications, Skills, Projects, etc.)
    const curated = getCuratedAnswer(text);
    if (curated) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "model",
            text: curated,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
        setLoading(false);
      }, 400);
      return;
    }

    // 2. Open-ended queries: Try Gemini API with fast 3.5s timeout, graceful fallback
    try {
      let reply = "";
      if (hasKey) {
        try {
          reply = await callGeminiAPI(text, messages);
        } catch {
          reply =
            "Harsh Shah is a 5th-semester B.Tech Information Technology student specializing in applied cybersecurity, defensive architectures, and full-stack engineering.\n\nHe holds 6 accredited credentials including CEH v13, Google Cloud Cybersecurity, and Microsoft Security Immersion.\n\nFeel free to ask about his:\n• 🛡️ Certifications\n• ⚡ Technical Skills\n• 🚀 Featured Projects\n• 📫 Contact Details";
        }
      } else {
        reply =
          "Harsh Shah is a 5th-semester B.Tech Information Technology student specializing in applied cybersecurity, defensive architectures, and full-stack engineering.\n\nHe holds 6 accredited credentials including CEH v13, Google Cloud Cybersecurity, and Microsoft Security Immersion.\n\nFeel free to ask about his:\n• 🛡️ Certifications\n• ⚡ Technical Skills\n• 🚀 Featured Projects\n• 📫 Contact Details";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "model",
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "model",
          text: CURATED_KNOWLEDGE.certifications,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: "fixed",
            bottom: "28px",
            right: "28px",
            zIndex: 999,
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            color: "#ffffff",
            border: "none",
            borderRadius: "50px",
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
            boxShadow: "0 8px 30px rgba(99, 102, 241, 0.4), 0 2px 8px rgba(0, 0, 0, 0.5)",
            transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px) scale(1.03)";
            e.currentTarget.style.boxShadow = "0 12px 35px rgba(99, 102, 241, 0.55)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = "0 8px 30px rgba(99, 102, 241, 0.4)";
          }}
          aria-label="Open AI Assistant"
        >
          <div style={{ position: "relative" }}>
            <Bot size={20} />
            <span
              style={{
                position: "absolute",
                top: "-2px",
                right: "-2px",
                width: "7px",
                height: "7px",
                backgroundColor: "#10b981",
                borderRadius: "50%",
                boxShadow: "0 0 6px #10b981",
              }}
            />
          </div>
          <span style={{ fontWeight: 600, fontSize: "14px", letterSpacing: "0.01em" }}>
            Ask Harsh AI
          </span>
          <Sparkles size={14} style={{ color: "#fef08a" }} />
        </button>
      )}

      {/* Chat Window Modal */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 1000,
            width: "clamp(320px, 92vw, 420px)",
            height: "clamp(480px, 75vh, 620px)",
            background: "#0c0e1a",
            border: "1px solid rgba(99, 102, 241, 0.3)",
            borderRadius: "16px",
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.85), 0 0 35px rgba(99, 102, 241, 0.2)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            animation: "chatSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "16px 20px",
              background: "rgba(17, 19, 39, 0.95)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(139,92,246,0.25) 100%)",
                  border: "1px solid rgba(99, 102, 241, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#818cf8",
                  position: "relative",
                }}
              >
                <Bot size={20} />
                <span
                  style={{
                    position: "absolute",
                    bottom: "-1px",
                    right: "-1px",
                    width: "9px",
                    height: "9px",
                    backgroundColor: "#10b981",
                    borderRadius: "50%",
                    border: "2px solid #0c0e1a",
                  }}
                />
              </div>
              <div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>Harsh AI</span>
                  <span
                    style={{
                      fontSize: "10px",
                      background: "rgba(99,102,241,0.15)",
                      color: "#818cf8",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      fontWeight: 600,
                    }}
                  >
                    Gemini
                  </span>
                </div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "1px" }}>
                  Assistant for Qualifications & Profile
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--text-secondary)",
                cursor: "pointer",
                padding: "6px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--text-primary)";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-secondary)";
                e.currentTarget.style.background = "transparent";
              }}
              aria-label="Close Chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Missing Key Notification Banner (if key not in .env) */}
          {!hasKey && (
            <div
              style={{
                background: "rgba(99, 102, 241, 0.08)",
                borderBottom: "1px solid rgba(99, 102, 241, 0.2)",
                padding: "8px 14px",
                fontSize: "11.5px",
                color: "#c7d2fe",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Key size={14} style={{ color: "#fbbf24", flexShrink: 0 }} />
              <span>
                Paste your API key in <code>.env</code> as <code>GEMINI_API_KEY=...</code>
              </span>
            </div>
          )}

          {/* Messages Stream */}
          <div
            style={{
              flex: 1,
              padding: "18px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            {messages.map((msg) => {
              const isUser = msg.role === "user";

              return (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    flexDirection: isUser ? "row-reverse" : "row",
                    gap: "10px",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "8px",
                      background: isUser ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.06)",
                      border: isUser ? "1px solid rgba(99,102,241,0.4)" : "1px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: isUser ? "#818cf8" : "var(--text-secondary)",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    {isUser ? <User size={14} /> : <Bot size={14} />}
                  </div>

                  <div
                    style={{
                      maxWidth: "82%",
                      background: isUser
                        ? "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)"
                        : "rgba(255, 255, 255, 0.04)",
                      color: isUser ? "#ffffff" : "var(--text-primary)",
                      padding: "11px 15px",
                      borderRadius: isUser ? "14px 4px 14px 14px" : "4px 14px 14px 14px",
                      border: isUser ? "none" : "1px solid var(--border)",
                      fontSize: "13.5px",
                      lineHeight: 1.55,
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      boxShadow: isUser ? "0 4px 15px rgba(99,102,241,0.3)" : "none",
                    }}
                  >
                    {msg.text}
                    <div
                      style={{
                        fontSize: "10px",
                        color: isUser ? "rgba(255,255,255,0.7)" : "var(--text-muted)",
                        marginTop: "5px",
                        textAlign: isUser ? "right" : "left",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {msg.time}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Loading Indicator */}
            {loading && (
              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#818cf8",
                  }}
                >
                  <Bot size={14} />
                </div>
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid var(--border)",
                    padding: "12px 18px",
                    borderRadius: "4px 14px 14px 14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span className="typing-dot" style={{ animationDelay: "0s" }} />
                  <span className="typing-dot" style={{ animationDelay: "0.2s" }} />
                  <span className="typing-dot" style={{ animationDelay: "0.4s" }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips (shown when few messages) */}
          {messages.length <= 2 && (
            <div
              style={{
                padding: "8px 16px 12px",
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
                borderTop: "1px solid rgba(255, 255, 255, 0.04)",
              }}
            >
              {SUGGESTIONS.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(s)}
                  style={{
                    fontSize: "11.5px",
                    background: "rgba(99, 102, 241, 0.08)",
                    border: "1px solid rgba(99, 102, 241, 0.2)",
                    color: "#c7d2fe",
                    padding: "5px 10px",
                    borderRadius: "20px",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(99, 102, 241, 0.18)";
                    e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(99, 102, 241, 0.08)";
                    e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.2)";
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input Form */}
          <div
            style={{
              padding: "14px 16px",
              background: "rgba(17, 19, 39, 0.95)",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <input
                type="text"
                className="input"
                placeholder="Ask about Harsh's skills, CEH, projects..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                style={{
                  padding: "10px 14px",
                  fontSize: "13.5px",
                  borderRadius: "10px",
                  background: "rgba(255, 255, 255, 0.05)",
                }}
              />
              <button
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                style={{
                  background: input.trim() && !loading ? "var(--accent)" : "rgba(255, 255, 255, 0.06)",
                  color: input.trim() && !loading ? "#ffffff" : "var(--text-muted)",
                  border: "none",
                  borderRadius: "10px",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                  flexShrink: 0,
                  transition: "all 0.18s ease",
                }}
                aria-label="Send Message"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Embedded CSS Animations */}
      <style>{`
        @keyframes chatSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .typing-dot {
          width: 6px;
          height: 6px;
          background: #818cf8;
          border-radius: 50%;
          display: inline-block;
          animation: dotBounce 1.2s infinite ease-in-out;
        }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  );
}

export default Chatbot;

