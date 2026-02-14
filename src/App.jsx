import React from "react";
import { LanguageProvider } from "./contexts/LanguageContext";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Contact from "./components/sections/Contact";
import Footer from "./components/layout/Footer";

const App = () => {
  return (
    <LanguageProvider>
      <div>
        <div className="relative z-10">
          <Navbar />

          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>

          <Footer />
        </div>
      </div>
    </LanguageProvider>
  );
};

export default App;