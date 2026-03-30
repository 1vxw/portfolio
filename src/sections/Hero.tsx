"use client";

import { RotatingText } from "@/components/ui/shadcn-io/rotating-text/index";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { motion } from "@/lib/gsap-motion";
import {
  FaArrowRight,
  FaCode,
  FaGithub,
  FaLocationArrow,
} from "react-icons/fa";
import type { MouseEvent } from "react";
import me from "@/assets/imgs/asdsa.png";
import meHover from "@/assets/imgs/asdsa1.png";
import AutoMovingCursor from "@/components/AutoMovingCursor";
const spotlightStats = [
  { value: "12+", label: "Products shipped" },
  { value: "6", label: "Stacks in rotation" },
  { value: "24h", label: "Typical reply window" },
];

const focusAreas = [
  "Realtime UIs",
  "Motion systems",
  "Mobile apps",
  "Cloud APIs",
];

const containerVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
    },
  },
};

const textReveal = {
  hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: "power3.out" },
  },
};

const highlightReveal = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.1, ease: "power2.out" },
  },
};

const CTA_HOVER = { y: -4, scale: 1.03 };
const CTA_TAP = { scale: 0.98 };
const CTA_TRANSITION = {
  type: "spring" as const,
  stiffness: 320,
  damping: 20,
};
const CHIP_HOVER = { y: -3, scale: 1.04 };
const CARD_HOVER = {
  y: -10,
  scale: 1.02,
  rotateX: -2,
  rotateY: 1.5,
  transition: { type: "spring" as const, stiffness: 220, damping: 18 },
};
const STATS_HOVER = {
  y: -6,
  scale: 1.02,
  transition: { type: "spring" as const, stiffness: 280, damping: 18 },
};
const HERO_INTRO = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "power3.out" },
  },
};
const LEFT_ITEM_BASE_DELAY = 0.08;
const leftItemTransition = (delay: number) => ({
  duration: 0.55,
  ease: "power2.out",
  delay,
});

export default function Hero() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [enableCursor, setEnableCursor] = useState(false);
  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDarkMode = currentTheme === "dark";
  const heroRef = useRef<HTMLDivElement>(null);
  const portraitSrc = mounted && isDarkMode ? me : meHover;

  useEffect(() => {
    setMounted(true);

    const canRunCursor =
      window.matchMedia("(min-width: 1024px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setEnableCursor(canRunCursor);
  }, []);

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-24 text-sans scrollbar-hide"
      ref={heroRef}
    >
      {enableCursor && (
        <AutoMovingCursor
          size={24}
          color="#3b82f6"
          speed={8}
          label="Developer"
          triangleSize={26}
          containerRef={heroRef}
        />
      )}
      <motion.div
        className="relative z-10 mx-auto flex min-h-[84vh] max-w-7xl flex-col justify-center gap-8 px-4 pb-10 sm:px-6 lg:flex-row lg:items-center lg:gap-10 lg:px-8"
        variants={HERO_INTRO}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex w-full max-w-[40rem] flex-col items-center gap-4 text-center lg:items-start lg:text-left"
          style={{ willChange: "transform, opacity" }}
          variants={containerVariants}
          initial={{ opacity: 0, x: -36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "power2.out" }}
        >
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-background/70 px-4 py-2 text-[11px] uppercase tracking-[0.32em] text-muted-foreground backdrop-blur-xl"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={leftItemTransition(LEFT_ITEM_BASE_DELAY)}
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(74,222,128,0.8)]" />
            Available for select builds
          </motion.div>
          <motion.p
            className="text-base font-medium sm:text-lg lg:text-xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={leftItemTransition(LEFT_ITEM_BASE_DELAY + 0.06)}
          >
            Hi, I&apos;m Vince Pradas
          </motion.p>
          <motion.h1
            className="max-w-4xl text-4xl font-semibold leading-[0.94] tracking-[-0.06em] sm:text-5xl xl:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={leftItemTransition(LEFT_ITEM_BASE_DELAY + 0.12)}
          >
            Building digital systems that feel
            <motion.span
              className="bg-[linear-gradient(135deg,#0ea5e9,#22c55e,#f472b6)] bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={leftItemTransition(LEFT_ITEM_BASE_DELAY + 0.18)}
            >
              {" "}
              kinetic, sharp, and alive.
            </motion.span>
          </motion.h1>
          <motion.div
            className="flex w-full max-w-xl justify-center lg:justify-start"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={leftItemTransition(LEFT_ITEM_BASE_DELAY + 0.22)}
          >
            <RotatingText text={["Web Developer", "Freelancer"]} />
          </motion.div>
          <motion.p
            className="max-w-xl px-2 text-sm leading-relaxed opacity-75 sm:px-0"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={leftItemTransition(LEFT_ITEM_BASE_DELAY + 0.28)}
          >
            Building web apps and mobile apps is my jam, from clicking buttons
            on the frontend to handling data on the backend. I care about
            motion, architecture, and the tiny details that make products feel
            premium instead of generic.
          </motion.p>
          <motion.div
            className="mt-2 flex flex-wrap justify-center gap-2 lg:justify-start"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={leftItemTransition(LEFT_ITEM_BASE_DELAY + 0.34)}
          >
            {focusAreas.map((item) => (
              <motion.span
                key={item}
                className="rounded-full border border-border/70 bg-background/65 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur-sm"
                whileHover={CHIP_HOVER}
              >
                {item}
              </motion.span>
            ))}
          </motion.div>
          <motion.div
            className="mt-3 flex flex-wrap justify-center gap-3 sm:gap-4 lg:justify-start"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={leftItemTransition(LEFT_ITEM_BASE_DELAY + 0.4)}
          >
            <motion.a
              href="/docs/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={CTA_HOVER}
              whileTap={CTA_TAP}
              transition={CTA_TRANSITION}
              className="group flex items-center gap-2 rounded-2xl border border-black bg-black py-2.5 px-5 text-sm text-white transition-colors duration-200 dark:border-white dark:bg-white dark:text-black"
            >
              Download CV
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>
            <motion.button
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                e.stopPropagation();
                const contactElement = document.getElementById("contact");
                if (contactElement) {
                  contactElement.scrollIntoView({ behavior: "smooth" });
                }
              }}
              whileHover={CTA_HOVER}
              whileTap={CTA_TAP}
              transition={CTA_TRANSITION}
              className="rounded-2xl border border-black py-2.5 px-5 text-sm transition-colors duration-200 hover:bg-gray-100 dark:border-white dark:hover:bg-gray-800"
            >
              Get in Touch
            </motion.button>
            <motion.a
              href="https://github.com/1vxw"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={CTA_HOVER}
              whileTap={CTA_TAP}
              transition={CTA_TRANSITION}
              className="inline-flex items-center gap-2 rounded-2xl border border-border bg-background/60 py-2.5 px-5 text-sm backdrop-blur-sm transition-colors duration-200 hover:bg-accent"
            >
              <FaGithub />
              View GitHub
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex w-full max-w-lg flex-col items-center gap-4 lg:items-stretch"
          style={{ willChange: "transform, opacity" }}
          initial={{ opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "power2.out", delay: 0.04 }}
        >
          <motion.div
            className="relative h-[18rem] w-full overflow-hidden rounded-[2rem] border border-primary/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.6),rgba(255,255,255,0.28))] p-3 shadow-[0_24px_90px_rgba(14,165,233,0.12)] sm:h-[23rem] dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.62),rgba(15,23,42,0.28))]"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.08, ease: "power2.out" }}
            viewport={{ once: true }}
            style={{ transformStyle: "preserve-3d" }}
            whileHover={CARD_HOVER}
          >
            <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.18),transparent_45%)]" />
            <div className="absolute inset-3 overflow-hidden rounded-[1.65rem]">
              <motion.div
                className="relative h-full w-full"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 160, damping: 18 }}
              >
                <img
                  src={portraitSrc}
                  alt="Vince Pradas - Full Stack Developer"
                  className="absolute inset-0 h-full w-full rounded-[1.65rem] object-cover"
                  loading="eager"
                  decoding="async"
                  draggable={false}
                />
              </motion.div>
            </div>
            <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full border border-white/20 bg-background/78 px-3 py-1.5 text-[11px] uppercase tracking-[0.24em] backdrop-blur-md">
              <FaCode className="text-sky-500" />
              Design + Code
            </div>
            <div className="absolute bottom-4 left-4 right-4 z-20 rounded-[1.2rem] border border-white/20 bg-background/78 px-4 py-2.5 text-sm backdrop-blur-xl">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-muted-foreground">
                <FaLocationArrow className="text-emerald-400" />
                Currently building
              </div>
              <div className="mt-1 font-medium">
                Interactive products with strong motion systems
              </div>
            </div>
          </motion.div>

          <motion.div
            className="w-full py-2"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {spotlightStats.map((stat) => (
                <motion.div
                  key={stat.label}
                  className="flex flex-col gap-y-1 rounded-[1.25rem] border border-border/60 bg-background/55 px-4 py-4 text-left backdrop-blur-md"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  viewport={{ once: true }}
                  whileHover={STATS_HOVER}
                >
                  <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="text-xl font-semibold sm:text-2xl">
                    {stat.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
