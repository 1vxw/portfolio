import { ThemeProvider } from "next-themes";
import { type ReactNode, useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Project from "@/sections/Projects";
import Skills from "@/sections/Skills";
import Services from "@/sections/Services";
import Contact from "@/sections/Contact";
import Footer from "@/components/Footer";
import AmbientBackground from "@/components/AmbientBackground";
import "@/styles/scrollBar.css";

function LazyMount({
  sectionId,
  children,
  rootMargin = "280px 0px",
  minHeightClassName = "min-h-[24vh]",
}: {
  sectionId: string;
  children: ReactNode;
  rootMargin?: string;
  minHeightClassName?: string;
}) {
  const hostRef = useRef<HTMLElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isMounted || !hostRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(hostRef.current);

    return () => observer.disconnect();
  }, [isMounted, rootMargin]);

  if (isMounted) {
    return <>{children}</>;
  }

  return <section id={sectionId} ref={hostRef} className={minHeightClassName} />;
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,0.94)_0%,rgba(246,248,252,0.96)_36%,rgba(255,255,255,1)_100%)] text-primary font-sans dark:bg-[linear-gradient(180deg,rgba(2,6,23,0.98)_0%,rgba(8,15,31,0.98)_36%,rgba(2,6,23,1)_100%)]">
        <AmbientBackground />
        <Header />
        <Hero />
        <LazyMount sectionId="about">
          <About />
        </LazyMount>
        <LazyMount sectionId="projects">
          <Project />
        </LazyMount>
        <LazyMount sectionId="skills">
          <Skills />
        </LazyMount>
        <LazyMount sectionId="services">
          <Services />
        </LazyMount>
        <LazyMount sectionId="contact">
          <Contact />
        </LazyMount>
        <LazyMount sectionId="footer" minHeightClassName="min-h-[8vh]">
          <Footer />
        </LazyMount>
      </div>
    </ThemeProvider>
  );
}
