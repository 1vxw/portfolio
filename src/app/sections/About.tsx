"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiGit,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import LogoLoop from "@/components/LogoLoop";

gsap.registerPlugin(ScrollTrigger);

const techLogos = [
  {
    node: <SiReact className="w-12 h-12" />,
    title: "React",
    href: "https://react.dev",
  },
  {
    node: <SiNextdotjs className="w-12 h-12" />,
    title: "Next.js",
    href: "https://nextjs.org",
  },
  {
    node: <SiTypescript className="w-12 h-12" />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    node: <SiTailwindcss className="w-12 h-12" />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
  {
    node: <SiNodedotjs className="w-12 h-12" />,
    title: "Node.js",
    href: "https://nodejs.org",
  },
  {
    node: <SiMongodb className="w-12 h-12" />,
    title: "MongoDB",
    href: "https://www.mongodb.com",
  },
  {
    node: <SiExpress className="w-12 h-12" />,
    title: "Express",
    href: "https://expressjs.com",
  },
  {
    node: <FaAws className="w-12 h-12" />,
    title: "AWS",
    href: "https://aws.amazon.com",
  },
  {
    node: <SiGit className="w-12 h-12" />,
    title: "Git",
    href: "https://git-scm.com",
  },
];

const ANIMATION_CONFIG = {
  staggerDelay: 0.15,
  duration: 0.5,
  ease: "easeOut",
} as const;

const techStack = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "MongoDB",
  "Express",
  "AWS S3",
  "Git",
  "REST API",
];

const currentFocus = [
  "Full-Stack Development",
  "Performance Optimization",
  "Clean Architecture",
  "Developer Experience",
  "System Design",
  "Code Quality",
];

const developerPrinciples = [
  { title: "Performance", desc: "Optimized & efficient" },
  { title: "Security", desc: "Safe & reliable" },
  { title: "Quality", desc: "Clean & maintainable" },
  { title: "Scalability", desc: "Future-proof design" },
];
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: ANIMATION_CONFIG.staggerDelay },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_CONFIG.duration,
      ease: ANIMATION_CONFIG.ease,
    },
  },
};

export default function About() {
  const svgContainerRef1 = useRef<HTMLDivElement>(null);
  const svgContainerRef2 = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });

  useEffect(() => {
    const container1 = svgContainerRef1.current;
    const container2 = svgContainerRef2.current;

    if (!container1 && !container2) return;

    const scrollContainer = document.querySelector(".overflow-y-auto");

    const animateContainer = (container: HTMLDivElement) => {
      const paths = container.querySelectorAll("path");
      paths.forEach((path, index) => {
        const pathLength = path.getTotalLength();

        gsap.set(path, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            scroller: scrollContainer,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 0.5,
            markers: false,
          },
          delay: index * 0.1,
        });
      });
    };

    if (container1) animateContainer(container1);
    if (container2) animateContainer(container2);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      id="about"
      aria-label="About"
      className="relative min-h-screen pt-24 md:pt-24"
      ref={ref}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-16 h-40 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.10),transparent_65%)]"
        animate={{ opacity: [0.35, 0.75, 0.35], y: [0, 12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* SVG Background Line - Top Right */}
      <div
        ref={svgContainerRef1}
        className="absolute top-20 right-20 pointer-events-none opacity-25"
      >
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
          <path d="M0,100 L400,100" stroke="#5984F8" strokeWidth="2" />
          <path d="M0,200 L400,200" stroke="#5984F8" strokeWidth="2" />
          <path d="M100,0 L100,400" stroke="#5984F8" strokeWidth="2" />
          <path d="M200,0 L200,400" stroke="#5984F8" strokeWidth="2" />
        </svg>
      </div>

      {/* SVG Background Line - Bottom Left */}
      <div
        ref={svgContainerRef2}
        className="absolute bottom-20 left-50 pointer-events-none opacity-25"
      >
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
          <path d="M0,100 L400,100" stroke="#5984F8" strokeWidth="2" />
          <path d="M0,200 L400,200" stroke="#5984F8" strokeWidth="2" />
          <path d="M100,0 L100,400" stroke="#5984F8" strokeWidth="2" />
          <path d="M200,0 L200,400" stroke="#5984F8" strokeWidth="2" />
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl relative z-10">
        <motion.div
          className="space-y-16 md:space-y-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {"<About />"}
            </motion.h1>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl">
              Building digital experiences with precision and purpose
            </p>
          </motion.div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Profile Card */}
              <motion.div variants={itemVariants}>
                <Card className="border bg-background/80 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(14,165,233,0.10)]">
                  <CardContent className="p-6 md:p-8">
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 pb-4 border-b">
                        <div className="w-2 h-2 rounded-full bg-foreground" />
                        <div className="w-2 h-2 rounded-full bg-foreground/60" />
                        <div className="w-2 h-2 rounded-full bg-foreground/30" />
                      </div>

                      <div className="space-y-3 text-sm md:text-base font-mono">
                        <p>
                          <span className="text-muted-foreground">const</span>{" "}
                          <span className="font-semibold">Me</span> = {"{"}
                        </p>
                        <p className="pl-4">
                          passion:{" "}
                          <span className="text-muted-foreground">
                            &quot;transforming ideas into elegant code&quot;
                          </span>
                          ,
                        </p>
                        <p className="pl-4">
                          focus:{" "}
                          <span className="text-muted-foreground">
                            &quot;creating seamless experiences&quot;
                          </span>
                          ,
                        </p>
                        <p className="pl-4">
                          philosophy:{" "}
                          <span className="text-muted-foreground">
                            &quot;clean, maintainable, scalable&quot;
                          </span>
                        </p>
                        <p>{"}"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Principles Grid */}
              <motion.div variants={itemVariants} className="space-y-6">
                <h2 className="text-2xl font-semibold">Core Principles</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {developerPrinciples.map((principle) => (
                    <motion.div
                      key={principle.title}
                      whileHover={{ y: -8, scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    >
                      <Card className="border h-full bg-background/78 backdrop-blur-md">
                        <CardContent className="p-4 md:p-5">
                          <div className="space-y-2">
                            <h3 className="font-semibold text-sm md:text-base">
                              {principle.title}
                            </h3>
                            <p className="text-xs md:text-sm text-muted-foreground">
                              {principle.desc}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Tech Stack */}
              <motion.div variants={itemVariants} className="space-y-6">
                <h2 className="text-2xl font-semibold">Tech Stack</h2>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      whileHover={{ y: -4, scale: 1.05 }}
                    >
                      <Badge
                        variant="outline"
                        className="px-3 py-1.5 text-xs md:text-sm font-medium bg-background"
                      >
                        {tech}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Current Focus */}
              <motion.div variants={itemVariants} className="space-y-6">
                <h2 className="text-2xl font-semibold">Current Focus</h2>
                <div className="space-y-2">
                  {currentFocus.map((focus, index) => (
                    <motion.div
                      key={focus}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      whileHover={{ x: 6, scale: 1.01 }}
                      className="flex items-center gap-3 p-3 border rounded-2xl bg-background/75 backdrop-blur-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-foreground rounded-full flex-shrink-0" />
                      <span className="text-sm md:text-base">{focus}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Logo Loop Section */}
          <motion.div
            variants={itemVariants}
            className="space-y-8 pt-8 border-t"
          >
            <h2 className="text-2xl font-semibold text-center">
              Technologies I Work With
            </h2>
          </motion.div>
        </motion.div>
      </div>

      {/* Full-width Logo Loop - outside container */}
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-8">
        <LogoLoop
          logos={techLogos}
          speed={120}
          direction="left"
          logoHeight={48}
          gap={40}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="hsl(var(--background))"
          ariaLabel="Technology stack"
        />
      </div>
    </section>
  );
}
