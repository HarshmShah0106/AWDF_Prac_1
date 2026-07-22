import Header from "./Header";
import About from "./About";
import Skills from "./Skills";
import Footer from "./Footer";

function Home() {

    const skills = [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "SQL"
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

export default Home;