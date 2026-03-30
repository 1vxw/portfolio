"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "@/lib/gsap-motion";
import {
  FaReact,
  FaMobile,
  FaDatabase,
  FaServer,
  FaPalette,
  FaCloud,
  FaTerminal,
  FaBox,
  FaAws,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiFirebase,
  SiFigma,
  SiGit,
  SiGithub,
  SiPostman,
  SiNpm,
  SiYarn,
  SiApple,
} from "react-icons/si";
import { VscAzure, VscVscode } from "react-icons/vsc";
import Shuffle from "@/components/Shuffle";

const skillCategories = [
  {
    id: "frontend",
    title: "Frontend Development",
    icon: FaReact,
    description: "Modern web interfaces and user experiences",
    technologies: [
      { name: "React", icon: FaReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "JavaScript", icon: SiJavascript },
      { name: "HTML5", icon: SiHtml5 },
      { name: "CSS3", icon: SiCss },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    icon: FaServer,
    description: "Server-side logic and API development",
    technologies: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express.js", icon: SiExpress },
      { name: "REST APIs", icon: SiNodedotjs },
    ],
  },
  {
    id: "mobile",
    title: "Mobile Development",
    icon: FaMobile,
    description: "Cross-platform and native mobile applications",
    technologies: [
      { name: "React Native", icon: FaReact },
      { name: "iOS", icon: SiApple },
      { name: "Android", icon: FaMobile },
    ],
  },
  {
    id: "database",
    title: "Database & Storage",
    icon: FaDatabase,
    description: "Data management and storage solutions",
    technologies: [
      { name: "MongoDB", icon: SiMongodb },
      { name: "MySQL", icon: SiMysql },
      { name: "Firebase", icon: SiFirebase },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    icon: FaCloud,
    description: "Infrastructure, deployment, and scalability",
    technologies: [
      { name: "AWS", icon: FaAws },
      { name: "Azure", icon: VscAzure },
    ],
  },
  {
    id: "design",
    title: "UI/UX Design",
    icon: FaPalette,
    description: "Design systems and user experience",
    technologies: [
      { name: "Figma", icon: SiFigma },
      { name: "Photoshop", icon: FaPalette },
      { name: "Illustrator", icon: FaPalette },
    ],
  },
  {
    id: "tools",
    title: "Development Tools",
    icon: FaTerminal,
    description: "Development environment and productivity tools",
    technologies: [
      { name: "VS Code", icon: VscVscode },
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "Postman", icon: SiPostman },
    ],
  },
  {
    id: "package",
    title: "Package Managers",
    icon: FaBox,
    description: "Dependency management systems",
    technologies: [
      { name: "npm", icon: SiNpm },
      { name: "Yarn", icon: SiYarn },
    ],
  },
];

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeAutoPlayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isInViewport = useInView(sectionRef, {
    margin: "-15% 0px -15% 0px",
  });

  const activeCategoryData = skillCategories.find(
    (cat) => cat.id === activeCategory
  );

  useEffect(() => {
    if (isAutoPlaying && isInViewport && !prefersReducedMotion) {
      autoPlayRef.current = setInterval(() => {
        setActiveCategory((current) => {
          const currentIndex = skillCategories.findIndex(
            (cat) => cat.id === current
          );
          const nextIndex = (currentIndex + 1) % skillCategories.length;
          return skillCategories[nextIndex].id;
        });
      }, 4500);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, isInViewport, prefersReducedMotion]);

  useEffect(() => {
    return () => {
      if (resumeAutoPlayRef.current) {
        clearTimeout(resumeAutoPlayRef.current);
      }
    };
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    setIsAutoPlaying(false);

    if (resumeAutoPlayRef.current) {
      clearTimeout(resumeAutoPlayRef.current);
    }

    resumeAutoPlayRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000);
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12"
    >
      <div className="pointer-events-none absolute left-1/2 mt-8 h-32 w-64 -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl" />
      {/* Header */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2 
          className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Technologies & Tools
        </motion.h2>
        <motion.p 
          className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          A comprehensive showcase of technologies and tools I use across
          software development
        </motion.p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8 ">
        {/* Flowing Menu - Left Side */}
        <motion.div 
          className="lg:w-2/5 "
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div
            ref={containerRef}
            className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide"
          >
            {skillCategories.map((category) => {
              const IconComponent = category.icon;
              const isActive = activeCategory === category.id;

              return (
                <motion.button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-500 ease-out flex-shrink-0 lg:flex-shrink
                    ${
                      isActive
                        ? "border-primary/30 bg-primary/10 scale-105"
                        : "border-border/50 bg-card/50 hover:bg-accent/50 hover:border-primary/20"
                    }
                  `}
                  whileHover={{ x: 6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className={`
                    p-2 rounded-lg transition-colors duration-500
                    ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary/80 text-secondary-foreground"
                    }
                  `}
                  >
                    <IconComponent size={20} />
                  </div>
                  <div className="text-left">
                    <h3
                      className={`
                      font-semibold transition-colors duration-500
                      ${isActive ? "text-primary" : "text-card-foreground"}
                    `}
                    >
                      {category.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {category.technologies.length} technologies
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Content Area - Right Side */}
        <motion.div 
          className="lg:w-3/5"
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="p-6 border-2 border-dashed bg-card/50 backdrop-blur-sm ">
            {activeCategoryData && (
              <motion.div 
                className="space-y-6"
                key={activeCategoryData.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-2 ">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <activeCategoryData.icon
                      size={24}
                      className="text-primary"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-card-foreground">
                      {activeCategoryData.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {activeCategoryData.description}
                    </p>
                  </div>
                </div>

                {/* Technology Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 ">
                  {activeCategoryData.technologies.map((tech, index) => {
                    const TechIconComponent = tech.icon;
                    return (
                      <motion.div
                        key={tech.name}
                        className="flex flex-col items-center p-3 rounded-lg border border-border/50 bg-background/50 hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 group"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{ scale: 1.08, y: -6 }}
                      >
                        <div className="w-12 h-12 mb-2 flex items-center justify-center rounded-lg bg-secondary/80 text-secondary-foreground group-hover:text-primary transition-colors duration-300">
                          <TechIconComponent size={24} />
                        </div>
                        <span className="text-xs font-medium text-center leading-tight text-card-foreground">
                          {tech.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>

          {/* Auto-play Indicator */}
          <motion.div 
            className="flex justify-center mt-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="flex gap-1">
              {skillCategories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`
                    w-[5px] h-[5px] rounded-full transition-all duration-300
                    ${
                      activeCategory === category.id
                        ? "bg-primary scale-125"
                        : "bg-border hover:bg-primary/50"
                    }
                  `}
                  whileHover={{ scale: 1.6 }}
                />
              ))}
            </div>
          </motion.div>
          <motion.div 
            className="relative py-15 hidden lg:block border-2 border-dashed my-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Shuffle
              text="Open to work!"
              shuffleDirection="right"
              duration={0.35}
              animationMode="evenodd"
              shuffleTimes={1}
              ease="power3.out"
              stagger={0.03}
              threshold={0.1}
              triggerOnce={true}
              triggerOnHover={true}
              respectReducedMotion={true}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
