import { useEffect, useState } from "react";
import { FolderGit2, Search, ExternalLink, Star, GitFork, Calendar, Code, AlertTriangle, RefreshCw } from "lucide-react";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";

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
        if (!res.ok) {
          throw new Error(`GitHub API returned status ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setRepos(data);
        } else {
          setRepos([]);
        }
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

  // Extract unique languages
  const languages = ["All", ...new Set(repos.map((r) => r.language).filter(Boolean))];

  // Filter repos based on search and language
  const filteredRepos = repos.filter((repo) => {
    const matchesSearch =
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesLanguage =
      selectedLanguage === "All" || repo.language === selectedLanguage;

    return matchesSearch && matchesLanguage;
  });

  const getLanguageColor = (lang) => {
    switch (lang) {
      case "JavaScript":
        return "#f1e05a";
      case "TypeScript":
        return "#3178c6";
      case "HTML":
        return "#e34c26";
      case "CSS":
        return "#563d7c";
      case "Python":
        return "#3572A5";
      case "C++":
        return "#f34b7d";
      default:
        return "#10b981";
    }
  };

  return (
    <div className="page-container" style={{ textAlign: "left" }}>
      {/* Section Header */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <FolderGit2 size={14} color="#10b981" />
          <span style={{ fontSize: "12px", color: "#10b981", fontFamily: "var(--font-mono)", fontWeight: 600 }}>
            GITHUB INTELLIGENCE // CODEBASE
          </span>
        </div>
        <h1 style={{ fontSize: "32px", color: "#f8fafc", fontWeight: 700, marginBottom: "8px" }}>
          Security & Engineering Repositories
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "15px", maxWidth: "680px" }}>
          Real-time synchronized repositories from GitHub user{" "}
          <strong style={{ color: "#38bdf8" }}>@HarshmShah0106</strong>. Explore full-stack implementations, containerized stacks, and security experiments.
        </p>
      </div>

      {/* Search and Language Filters */}
      <div
        className="cyber-card"
        style={{
          padding: "18px 24px",
          marginBottom: "32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        {/* Search input */}
        <div style={{ position: "relative", minWidth: "260px", flex: "1 1 300px" }}>
          <Search
            size={16}
            color="#64748b"
            style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }}
          />
          <input
            type="text"
            className="cyber-input"
            placeholder="Search repositories by title or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: "40px" }}
          />
        </div>

        {/* Language Filter Pills */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontSize: "13px", color: "#64748b", fontFamily: "var(--font-mono)" }}>Lang:</span>
          {languages.slice(0, 5).map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              style={{
                background: selectedLanguage === lang ? "rgba(6, 182, 212, 0.2)" : "rgba(11, 15, 25, 0.6)",
                color: selectedLanguage === lang ? "#38bdf8" : "#94a3b8",
                border: selectedLanguage === lang ? "1px solid #06b6d4" : "1px solid rgba(56, 189, 248, 0.15)",
                padding: "6px 12px",
                borderRadius: "6px",
                fontSize: "12px",
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
                transition: "all 0.2s ease",
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
              border: "1px solid rgba(56, 189, 248, 0.2)",
              color: "#94a3b8",
              padding: "7px 10px",
              borderRadius: "6px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && <Spinner />}

      {/* Error State */}
      {error && !loading && <ErrorMessage message={error} onRetry={fetchRepositories} />}

      {/* Repositories Grid */}
      {!loading && !error && (
        <>
          {filteredRepos.length === 0 ? (
            <div
              className="cyber-card"
              style={{
                padding: "48px 24px",
                textAlign: "center",
                color: "#94a3b8",
              }}
            >
              <AlertTriangle size={36} color="#f59e0b" style={{ margin: "0 auto 12px" }} />
              <h3 style={{ color: "#f8fafc", marginBottom: "8px" }}>No Repositories Match Your Filter</h3>
              <p style={{ fontSize: "14px" }}>
                Try searching for different keywords or select "All" languages.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "20px",
              }}
            >
              {filteredRepos.map((repo) => (
                <div
                  key={repo.id}
                  className="cyber-card"
                  style={{
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    {/* Header: Name and Status */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "10px",
                        marginBottom: "12px",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "17px",
                          fontWeight: 600,
                          color: "#f8fafc",
                          wordBreak: "break-word",
                        }}
                      >
                        {repo.name}
                      </h3>
                      <span
                        style={{
                          fontSize: "11px",
                          color: "#10b981",
                          background: "rgba(16, 185, 129, 0.1)",
                          border: "1px solid rgba(16, 185, 129, 0.25)",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          fontFamily: "var(--font-mono)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Public
                      </span>
                    </div>

                    {/* Description */}
                    <p
                      style={{
                        fontSize: "13.5px",
                        color: "#94a3b8",
                        lineHeight: 1.55,
                        marginBottom: "18px",
                        minHeight: "42px",
                      }}
                    >
                      {repo.description || "Academic web framework repository and technical laboratory work."}
                    </p>
                  </div>

                  <div>
                    {/* Meta stats: Language, Stars, Forks, Date */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        fontSize: "12px",
                        color: "#64748b",
                        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                        paddingTop: "14px",
                        marginBottom: "16px",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {repo.language && (
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              backgroundColor: getLanguageColor(repo.language),
                            }}
                          ></span>
                          <span style={{ color: "#cbd5e1" }}>{repo.language}</span>
                        </div>
                      )}

                      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <Star size={13} color="#f59e0b" />
                        <span>{repo.stargazers_count}</span>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <GitFork size={13} color="#06b6d4" />
                        <span>{repo.forks_count}</span>
                      </div>
                    </div>

                    {/* Action Link */}
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "8px 14px",
                        background: "rgba(11, 15, 25, 0.8)",
                        border: "1px solid rgba(56, 189, 248, 0.2)",
                        borderRadius: "6px",
                        color: "#38bdf8",
                        textDecoration: "none",
                        fontSize: "13px",
                        fontWeight: 500,
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#38bdf8";
                        e.currentTarget.style.background = "rgba(56, 189, 248, 0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(56, 189, 248, 0.2)";
                        e.currentTarget.style.background = "rgba(11, 15, 25, 0.8)";
                      }}
                    >
                      <span>Inspect Codebase</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Projects;
