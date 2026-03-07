"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggleButton } from "./ui/shadcn-io/ToggleButton";

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const lastScrollYRef = useRef(0);

  const navItems = useMemo(
    () => [
      { href: "#hero", label: "Home" },
      { href: "#about", label: "About" },
      { href: "#projects", label: "Projects" },
      { href: "#skills", label: "Skills" },
      { href: "#services", label: "Services" },
      { href: "#contact", label: "Contact" },
    ],
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuOpen &&
        event.target &&
        !(event.target as Element).closest("header")
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

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
        threshold: [0.25, 0.5, 0.75],
        rootMargin: "-18% 0px -18% 0px",
      }
    );

    navItems.forEach((item) => {
      const target = document.querySelector(item.href);
      if (target) {
        observer.observe(target);
      }
    });

    return () => observer.disconnect();
  }, [navItems]);

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-transform duration-500 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex w-full items-center justify-between border-b border-border/40 bg-background/55 px-4 py-2 shadow-[0_10px_30px_rgba(15,23,42,0.04)] backdrop-blur-xl dark:bg-background/45 dark:shadow-[0_10px_30px_rgba(2,6,23,0.22)]">
        <motion.button
          type="button"
          onClick={() => scrollToSection("#hero")}
          className="flex items-center gap-3 px-1 text-left"
          whileHover={{ y: -1.5, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex h-10 w-10 items-center justify-center text-base font-bold text-foreground">
            vXw
          </div>
          <div>
            <div className="text-xs font-semibold tracking-[0.24em] text-foreground/90 sm:text-sm">
              VINCE WARREN
            </div>
            <div className="text-[11px] text-muted-foreground">
              Engineer • Designer • Builder
            </div>
          </div>
        </motion.button>

        <nav className="hidden items-center gap-2 rounded-full border border-border/50 bg-background/50 p-1 md:flex">
          {navItems.map((item) => {
            const sectionId = item.href.replace("#", "");
            const active = sectionId === activeSection;

            return (
              <motion.button
                key={item.href}
                type="button"
                onClick={() => scrollToSection(item.href)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
                  active
                    ? "bg-foreground text-background shadow-sm"
                    : "text-foreground/72 hover:bg-foreground/8 hover:text-foreground"
                }`}
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 340, damping: 20 }}
              >
                {item.label}
              </motion.button>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 px-1">
          <ThemeToggleButton />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`rounded-lg p-2 transition-all duration-300 hover:bg-foreground/10 md:hidden ${
              menuOpen ? "bg-foreground/10" : "hover:scale-105"
            }`}
            aria-label="Toggle menu"
          >
            <div className="relative h-5 w-5">
              <Menu
                size={18}
                className={`absolute inset-0 transition-all duration-300 ${
                  menuOpen
                    ? "rotate-90 scale-75 opacity-0"
                    : "rotate-0 scale-100 opacity-100"
                }`}
              />
              <X
                size={18}
                className={`absolute inset-0 transition-all duration-300 ${
                  menuOpen
                    ? "rotate-0 scale-100 opacity-100"
                    : "-rotate-90 scale-75 opacity-0"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          menuOpen
            ? "max-h-screen translate-y-0 opacity-100"
            : "max-h-0 -translate-y-2 opacity-0"
        }`}
      >
        <nav className="w-full border-t border-border/40 bg-background/80 shadow-[0_10px_24px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:shadow-[0_10px_24px_rgba(2,6,23,0.18)]">
          <div className="space-y-4 px-4 py-6">
            {navItems.map((item, index) => {
              const active = activeSection === item.href.replace("#", "");

              return (
                <div
                  key={item.href}
                  className={`transform transition-all duration-300 ${
                    menuOpen
                      ? "translate-x-0 opacity-100"
                      : "translate-x-4 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setTimeout(() => scrollToSection(item.href), 150);
                    }}
                    className={`block w-full rounded-lg px-3 py-2.5 text-right text-base font-medium transition-all duration-200 ${
                      active
                        ? "bg-foreground text-background"
                        : "text-foreground hover:bg-foreground/5 hover:text-foreground/80"
                    }`}
                  >
                    <span className="inline-block transition-transform duration-200 hover:translate-x-1">
                      {item.label}
                    </span>
                  </a>
                </div>
              );
            })}

            <div className="mt-4 border-t border-foreground/10 pt-4">
              <div className="text-center text-xs text-foreground/50">
                Full-Stack Developer • Ready to build something ambitious?
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
