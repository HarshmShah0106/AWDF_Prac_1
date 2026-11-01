import { useEffect, useState } from "react";
import { FolderGit2, Search, ExternalLink, Star, GitFork, AlertTriangle, RefreshCw, Code2, Sparkles } from "lucide-react";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";

const languageColors = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  Shell: "#89e051",
  Dockerfile: "#384d54",
  default: "#818cf8",
};

function getLanguageColor(lang) {
  return languageColors[lang] || languageColors.default;
}

function RepoCard({ repo }) {
  const langColor = repo.language ? getLanguageColor(repo.language) : null;

  return (
    <div
      className="card"
      style={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        textAlign: "left",
      }}
    >
      <div>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "10px",
            marginBottom: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
            <div className="icon-box ib-indigo" style={{ width: "32px", height: "32px", borderRadius: "8px" }}>
              <Code2 size={16} />
            </div>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "var(--text-primary)",
                wordBreak: "break-word",
                lineHeight: 1.3,
              }}
            >
              {repo.name}
            </h3>
          </div>
          <span className="badge badge-muted" style={{ fontFamily: "var(--font-mono)", fontSize: "10px" }}>
            PUBLIC
          </span>
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: "13.5px",
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            marginBottom: "18px",
            minHeight: "42px",
          }}
        >
          {repo.description || "Academic web framework repository and technical laboratory work."}
        </p>
      </div>

      <div>
        {/* Meta Stats */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            fontSize: "12px",
            color: "var(--text-muted)",
            borderTop: "1px solid var(--border)",
            paddingTop: "14px",
            marginBottom: "16px",
            fontFamily: "var(--font-mono)",
            flexWrap: "wrap",
          }}
        >
          {repo.language && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: langColor,
                  boxShadow: `0 0 6px ${langColor}`,
                  flexShrink: 0,
                }}
              />
              <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>{repo.language}</span>
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Star size={13} color="#fbbf24" />
            <span>{repo.stargazers_count}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <GitFork size={13} color="#94a3b8" />
            <span>{repo.forks_count}</span>
          </div>
          {repo.updated_at && (
            <span style={{ marginLeft: "auto", color: "var(--text-faint)", fontSize: "11px" }}>
              {new Date(repo.updated_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
            </span>
          )}
        </div>

        {/* Action Link */}
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="btn-secondary"
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "9px 14px",
            fontSize: "13px",
            borderRadius: "8px",
          }}
        >
          <span>Inspect Source Code</span>
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}

function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All");

  const fetchRepositories = () => {
    setLoading(true);
    setError(null);

    fetch("https://api.github.com/users/HarshmShah0106/repos?sort=updated&per_page=100")
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API returned status ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setRepos(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch repositories.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  const languages = ["All", ...new Set(repos.map((r) => r.language).filter(Boolean))];

  const filteredRepos = repos.filter((repo) => {
    const matchesSearch =
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLanguage = selectedLanguage === "All" || repo.language === selectedLanguage;
    return matchesSearch && matchesLanguage;
  });

  return (
    <div className="page-container" style={{ textAlign: "left" }}>
      {/* Section Header */}
      <div style={{ marginBottom: "36px" }}>
        <div className="section-label">GitHub Intelligence</div>
        <h1 className="section-heading" style={{ fontSize: "clamp(28px, 4vw, 42px)", marginBottom: "10px" }}>
          Security & Engineering <span className="gradient-text">Codebase</span>
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "15.5px", maxWidth: "680px", lineHeight: 1.65 }}>
          Live telemetry synchronized from GitHub profile{" "}
          <a
            href="https://github.com/HarshmShah0106"
            target="_blank"
            rel="noreferrer"
            style={{
              color: "#818cf8",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            @HarshmShah0106
          </a>
          . Explore containerized architectures, applied security tools, and practical framework implementations.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div
        className="card"
        style={{
          padding: "16px 20px",
          marginBottom: "32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "14px",
        }}
      >
        {/* Search */}
        <div style={{ position: "relative", minWidth: "260px", flex: "1 1 300px" }}>
          <Search
            size={16}
            color="#64748b"
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
          />
          <input
            type="text"
            className="input"
            placeholder="Search repositories by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: "40px" }}
          />
        </div>

        {/* Language Pills */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontWeight: 600 }}>
            LANG:
          </span>
          {languages.slice(0, 6).map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              style={{
                background: selectedLanguage === lang ? "rgba(99, 102, 241, 0.2)" : "rgba(255, 255, 255, 0.03)",
                color: selectedLanguage === lang ? "#c7d2fe" : "var(--text-secondary)",
                border: selectedLanguage === lang ? "1px solid rgba(99, 102, 241, 0.4)" : "1px solid var(--border)",
                padding: "5px 12px",
                borderRadius: "6px",
                fontSize: "12px",
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
                fontWeight: 500,
                transition: "all 0.15s ease",
              }}
            >
              {lang}
            </button>
          ))}

          <button
            onClick={fetchRepositories}
            title="Refresh Repositories"
            style={{
              background: "transparent",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
              padding: "7px 11px",
              borderRadius: "6px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--text-primary)";
              e.currentTarget.style.borderColor = "var(--border-strong)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-secondary)";
              e.currentTarget.style.borderColor = "var(--border)";
            }}
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {/* Counter */}
      {!loading && !error && (
        <div style={{ marginBottom: "20px", fontSize: "12px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
          Showing {filteredRepos.length} of {repos.length} repositories
          {searchQuery && ` matching "${searchQuery}"`}
        </div>
      )}

      {/* Loading */}
      {loading && <Spinner text="Retrieving repository telemetry from GitHub..." />}

      {/* Error */}
      {error && !loading && <ErrorMessage message={error} onRetry={fetchRepositories} />}

      {/* Grid */}
      {!loading && !error && (
        <>
          {filteredRepos.length === 0 ? (
            <div
              className="card"
              style={{
                padding: "60px 24px",
                textAlign: "center",
                color: "var(--text-secondary)",
              }}
            >
              <AlertTriangle size={36} color="#f59e0b" style={{ margin: "0 auto 14px" }} />
              <h3 style={{ color: "var(--text-primary)", marginBottom: "8px", fontSize: "18px" }}>
                No Repositories Found
              </h3>
              <p style={{ fontSize: "14px" }}>
                No projects matched your search criteria. Try a different query or select "All".
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "20px",
              }}
            >
              {filteredRepos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Projects;
