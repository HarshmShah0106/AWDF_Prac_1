import { useState } from "react";
import { Award, ShieldCheck, CheckCircle2, Clock, ExternalLink, Sparkles, Database, Cloud, Terminal } from "lucide-react";

const certificates = [
  {
    id: "ceh-v13",
    title: "Certified Ethical Hacker (CEH v13)",
    issuer: "EC-Council",
    status: "ongoing",
    category: "offensive",
    issued: "2026 (In Progress)",
    skills: ["AI-Powered Threat Detection", "Network Penetration Testing", "Malware Analysis", "Vulnerability Assessment", "Social Engineering"],
    description: "Advanced certification covering modern attack vectors, automated vulnerability research, and offensive security methodologies.",
    badgeColor: "amber",
    icon: <Terminal size={20} />,
  },
  {
    id: "google-cyber-v2",
    title: "Google Cybersecurity Professional Certificate (v.2)",
    issuer: "Google",
    status: "completed",
    category: "defense",
    issued: "Verified",
    skills: ["SIEM & Packet Analysis", "Python Security Automation", "Linux & SQL Auditing", "Incident Response", "NIST Framework"],
    description: "Comprehensive 8-course professional credential covering defensive security operations, threat triaging, and hands-on detection.",
    badgeColor: "indigo",
    icon: <ShieldCheck size={20} />,
  },
  {
    id: "google-cloud-cyber",
    title: "Google Cloud Cybersecurity Certificate",
    issuer: "Google Cloud",
    status: "completed",
    category: "cloud",
    issued: "Verified",
    skills: ["Cloud IAM & Zero Trust", "GCP Security Command Center", "VPC Firewalls", "Cloud Threat Detection", "KMS Encryption"],
    description: "Specialized cloud security training focusing on infrastructure hardening, cloud security posture management, and compliance in GCP.",
    badgeColor: "sky",
    icon: <Cloud size={20} />,
  },
  {
    id: "microsoft-immersion",
    title: "Microsoft Security Immersion Completion Badge",
    issuer: "Microsoft",
    status: "completed",
    category: "defense",
    issued: "Verified",
    skills: ["Microsoft Defender", "Entra ID (Azure AD)", "Cloud Identity Protection", "XDR Incident Investigation", "Threat Hunting"],
    description: "Hands-on simulated lab immersion covering enterprise identity security, real-time threat detection, and mitigation strategies.",
    badgeColor: "violet",
    icon: <Award size={20} />,
  },
  {
    id: "ethical-hacking-essentials",
    title: "Ethical Hacking Essentials (EHE)",
    issuer: "EC-Council",
    status: "completed",
    category: "offensive",
    issued: "Verified",
    skills: ["Web App Pen-testing", "Port Scanning & Footprinting", "Cryptography Basics", "Countermeasures", "OWASP Top 10"],
    description: "Foundational offensive security qualification covering fundamental penetration testing techniques and system defense.",
    badgeColor: "rose",
    icon: <Sparkles size={20} />,
  },
  {
    id: "belkasoft-sqlite",
    title: "Advanced SQLite Queries with Belkasoft",
    issuer: "Belkasoft Digital Forensics",
    status: "completed",
    category: "forensics",
    issued: "Verified",
    skills: ["Digital Forensics", "SQLite Database Analysis", "WAL & Journal Carving", "Evidence Recovery", "Query Optimization"],
    description: "Technical specialization in database forensics, analyzing fragmented SQLite databases, and recovering critical digital evidence.",
    badgeColor: "emerald",
    icon: <Database size={20} />,
  },
];

const categories = [
  { id: "all", label: "All Certifications" },
  { id: "offensive", label: "Offensive Security & Pen-testing" },
  { id: "defense", label: "Defense & Operations" },
  { id: "cloud", label: "Cloud & Infrastructure" },
  { id: "forensics", label: "Digital Forensics" },
];

function Certifications() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? certificates
    : certificates.filter((c) => c.category === activeCategory);

  return (
    <section style={{ padding: "40px 0 56px" }}>
      {/* Section Header */}
      <div className="anim-up" style={{ textAlign: "left", marginBottom: "36px" }}>
        <div className="section-label">Verified Credentials</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <h2 className="section-heading" style={{ marginBottom: "10px" }}>
              Professional <span className="gradient-text">Certifications & Badges</span>
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "15px", maxWidth: "680px", lineHeight: 1.65 }}>
              Industry-recognized credentials validated across cloud security, enterprise threat detection,
              digital forensics, and ethical penetration testing.
            </p>
          </div>

          {/* Quick Counter Badge */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            background: "rgba(99, 102, 241, 0.08)",
            border: "1px solid rgba(99, 102, 241, 0.2)",
            padding: "8px 16px",
            borderRadius: "10px",
          }}>
            <Award size={18} color="#818cf8" />
            <div style={{ fontSize: "13px", color: "var(--text-primary)", fontWeight: 600 }}>
              <span>6 Accredited Programs</span>
              <span style={{ color: "#a5b4fc", margin: "0 6px" }}>·</span>
              <span style={{ color: "#fbbf24", fontSize: "12px" }}>1 In Progress</span>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          marginTop: "24px",
          padding: "6px",
          background: "rgba(255, 255, 255, 0.02)",
          borderRadius: "12px",
          border: "1px solid var(--border)",
          width: "fit-content",
        }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                background: activeCategory === cat.id ? "rgba(99, 102, 241, 0.18)" : "transparent",
                color: activeCategory === cat.id ? "#c7d2fe" : "var(--text-secondary)",
                border: activeCategory === cat.id ? "1px solid rgba(99, 102, 241, 0.4)" : "1px solid transparent",
                padding: "7px 15px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.18s ease",
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== cat.id) {
                  e.currentTarget.style.color = "var(--text-primary)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== cat.id) {
                  e.currentTarget.style.color = "var(--text-secondary)";
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Certifications Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))",
        gap: "20px",
        textAlign: "left",
      }}>
        {filtered.map((cert) => {
          const isOngoing = cert.status === "ongoing";
          const iconBoxClass = `icon-box ib-${cert.badgeColor}`;

          return (
            <div
              key={cert.id}
              className="card"
              style={{
                padding: "26px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                border: isOngoing ? "1px solid rgba(245, 158, 11, 0.35)" : "1px solid var(--border)",
                background: isOngoing ? "linear-gradient(135deg, rgba(245, 158, 11, 0.04) 0%, rgba(255, 255, 255, 0.02) 100%)" : "var(--bg-card)",
              }}
            >
              <div>
                {/* Top Row: Icon, Issuer, and Status */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "16px",
                  gap: "12px",
                }}>
                  <div className={iconBoxClass}>
                    {cert.icon}
                  </div>

                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
                    <span style={{
                      fontSize: "11.5px",
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-mono)",
                      fontWeight: 600,
                      background: "rgba(255, 255, 255, 0.04)",
                      padding: "3px 8px",
                      borderRadius: "6px",
                      border: "1px solid var(--border)",
                    }}>
                      {cert.issuer}
                    </span>

                    {isOngoing ? (
                      <span className="badge badge-amber" style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                        <Clock size={11} />
                        Ongoing
                      </span>
                    ) : (
                      <span className="badge badge-emerald" style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                        <CheckCircle2 size={11} />
                        Verified
                      </span>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: "17px",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: "8px",
                  lineHeight: 1.35,
                }}>
                  {cert.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: "13.5px",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                  marginBottom: "18px",
                }}>
                  {cert.description}
                </p>
              </div>

              <div>
                {/* Skills Chips */}
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px",
                  paddingTop: "14px",
                  borderTop: "1px solid var(--border)",
                  marginTop: "8px",
                }}>
                  {cert.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      style={{
                        fontSize: "11.5px",
                        padding: "3px 8px",
                        borderRadius: "5px",
                        background: "rgba(255, 255, 255, 0.04)",
                        color: "var(--text-secondary)",
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                        fontFamily: "var(--font-sans)",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Certifications;

