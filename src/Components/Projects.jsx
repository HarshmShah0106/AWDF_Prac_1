import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";

function Projects() {

    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        fetch("https://api.github.com/users/HarshmShah0106/repos")

            .then((response) => {

                if (!response.ok) {
                    throw new Error("Failed to fetch repositories.");
                }

                return response.json();
            })

            .then((data) => {

                setRepos(data);
                setLoading(false);

            })

            .catch((err) => {

                setError(err.message);
                setLoading(false);

            });

    }, []);

    if (loading) return <Spinner />;

    if (error) return <ErrorMessage message={error} />;

    return (

        <div className="container">

            <h1 style={{ textAlign: "center", color: "#38bdf8" }}>
                My GitHub Repositories
            </h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
                    gap: "20px",
                    marginTop: "30px",
                }}
            >

                {repos.map((repo) => (

                    <div
                        key={repo.id}
                        style={{
                            background: "#1e293b",
                            padding: "20px",
                            borderRadius: "12px",
                            boxShadow: "0 5px 15px rgba(0,0,0,.3)",
                        }}
                    >

                        <h2>{repo.name}</h2>

                        <p>
                            {repo.description
                                ? repo.description
                                : "No description available."}
                        </p>

                        <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                color: "#38bdf8",
                                textDecoration: "none",
                                fontWeight: "bold",
                            }}
                        >
                            View Repository →
                        </a>

                    </div>

                ))}

            </div>

        </div>

    );
}

export default Projects;