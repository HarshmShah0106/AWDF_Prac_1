import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Projects from "./Components/Projects";
import SecurityTools from "./Components/SecurityTools";
import Certifications from "./Components/Certifications";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import Chatbot from "./Components/Chatbot";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/certifications" element={<div className="page-container"><Certifications /></div>} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tools" element={<SecurityTools />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />

      {/* Floating Gemini-powered AI Assistant */}
      <Chatbot />
    </>
  );
}

export default App;
