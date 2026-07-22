import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        background: "#1e293b",
        padding: "18px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2 style={{ color: "#38bdf8" }}>Harsh Portfolio</h2>

      <div style={{ display: "flex", gap: "25px" }}>
        <Link to="/">Home</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
}

export default Navbar;