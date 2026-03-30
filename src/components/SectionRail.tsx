"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "@/lib/gsap-motion";

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

export default function SectionRail() {
  const [activeSection, setActiveSection] = useState("hero");
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    mass: 0.3,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        threshold: [0.25, 0.45, 0.65],
        rootMargin: "-20% 0px -20% 0px",
      }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 xl:flex">
      <div className="flex items-center gap-4 rounded-full border border-border/50 bg-background/70 px-3 py-4 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:shadow-[0_12px_40px_rgba(2,6,23,0.45)]">
        <div className="relative flex h-44 w-[2px] justify-center rounded-full bg-border/60">
          <motion.div
            style={{ scaleY }}
            className="absolute inset-x-0 top-0 origin-top rounded-full bg-gradient-to-b from-sky-500 via-cyan-400 to-emerald-400"
          />
        </div>
        <div className="flex flex-col gap-3">
          {sections.map((section) => {
            const active = activeSection === section.id;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() =>
                  document.getElementById(section.id)?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                }
                className="group flex items-center gap-3 text-left"
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full border transition-all duration-300 ${
                    active
                      ? "border-sky-500 bg-sky-500 shadow-[0_0_16px_rgba(14,165,233,0.8)]"
                      : "border-border bg-background group-hover:border-sky-400"
                  }`}
                />
                <span
                  className={`text-xs uppercase tracking-[0.28em] transition-colors duration-300 ${
                    active
                      ? "text-foreground"
                      : "text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  {section.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
