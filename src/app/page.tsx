import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Project from "./sections/Projects";
import Skills from "./sections/Skills";
import Services from "./sections/Services";
import Contact from "./sections/Contact";
import VisitCount from "@/components/VisitCount";
import AmbientBackground from "@/components/AmbientBackground";

import "@/styles/scrollBar.css";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,0.94)_0%,rgba(246,248,252,0.96)_36%,rgba(255,255,255,1)_100%)] text-primary font-sans dark:bg-[linear-gradient(180deg,rgba(2,6,23,0.98)_0%,rgba(8,15,31,0.98)_36%,rgba(2,6,23,1)_100%)]">
      <AmbientBackground />
      <Header />
      <Hero />
      <About />
      <Project />
      <Skills />
      <Services />
      <Contact />
      <Footer />
      <VisitCount />
    </div>
  );
}
