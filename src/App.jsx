import Header from "./components/Header";
import About from "./components/About";
import Skills from "./components/Skills";
import Footer from "./components/Footer";

function App() {

  const skills = [
    "Python",
    "Bash",
    "Security Analysis (SOC)",
    "DBMS",
    "Networks and Protocols",
    "Vulnerability Assessment",
    "Shell Scripting",
  ];

  return (
    <>
      <Header name="Harsh Shah" />

      <About />

      <Skills skills={skills} />

      <Footer />
    </>
  );
}

export default App;