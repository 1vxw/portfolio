"use client";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useRef, useState } from "react";

const projectCards = [
  {
    title: "Sandra's: Mobile Only E-Commerce Platform",
    description: "Full-stack e-commerce platform with React and Tailwind v4.",
    tech: ["ReactJS", "Tailwind v4"],
    status: "Completed",
    url: "https://sandras-shop.tech/",
  },
  {
    title: "Sandra's REST API",
    description: "The official RESTful API for Sandra's deployed on Azure.",
    tech: ["MongoDB", "Express.js", "Node.js", "Azure", "Multer", "AWS S3"],
    status: "Completed",
    url: "https://ecom-sandras-g6abfyg2azbqekf8.southeastasia-01.azurewebsites.net/api/products",
  },
  {
    title: "Nemsu E-Learning Environment API",
    description:
      "North Eastern Mindanao State University E-Learning Enviroment Server",
    tech: ["Node.js", "TypeScript", "Express.js", "SQLite", "Azure"],
    status: "In Progress",
    url: "https://github.com/Vincepradas/nemsuee-server",
  },
  {
    title: "Nemsu E-Learning Environment",
    description:
      "North Eastern Mindanao State University E-Learning Enviroment Frontend",
    tech: ["React", "TypeScript", "Tailwind v4"],
    status: "In Progress",
    url: "https://github.com/Vincepradas/nemsuee-server",
  },
  {
    title: "SmartQuiz Android APP",
    description:
      "AI-powered quiz generation app with GPT integration (Gemini).",
    tech: ["React Native", "Tailwind", "Expo"],
    status: "Completed",
    url: "https://expo.dev/accounts/vince691/projects/ai-quizgen-app/builds/abe41d25-dae3-4c71-a177-3bd98526fada",
  },
  {
    title: "SmartQuiz REST API",
    description:
      "The official RESTful API for SmartQuiz android application deployed on Azure.",
    tech: ["MongoDB", "Express.js", "Azure", "Google Gemini"],
    status: "Completed",
    url: "https://quiz-gen-be-c5bmh0azcycyg8gz.southeastasia-01.azurewebsites.net/quizzes",
  },
    {
    title: "Madrid Government Website API",
    description:
      "A RESTful API for Madrid's Government Website",
    tech: ["SQLite", "Express.js", "Azure", "TypeScript"],
    status: "In Progess",
    url: "https://github.com/Vincepradas/madridsds_gov_website_api",
  },
  {
    title: "Savince: Savings Tracker APP",
    description:
      "Savince is an ultimate savings app designed to help you achieve your financial goals, built with Appwrite and AWS S3 for storage.",
    tech: ["React Native", "Appwrite", "AWS S3", "Nativewind"],
    status: "Completed",
    url: "https://github.com/VincePradas",
  },
  {
    title: "AI OCR Desktop Overlay",
    description:
      "A desktop application that lets you take a screenshot, extract questions from the image using OCR, and get instant AI-generated answers using Google Gemini. Built with Electron, Tesseract.js, and Google GenAI.",
    tech: ["Google Gemini", "Electron", "Tesseract.js", "Google GenAI"],
    status: "In Progress",
    url: "https://github.com/VincePradas/AI_OCR_DESKTOPAPP",
  },
  {
    title: "Dating Site REST API",
    description:
      "A RESTful API for a dating platform, enabling user authentication, profile management, and messaging functionalities.",
    tech: ["Node.js", "Express.js", "MongoDB", "Multer", "Socket.io"],
    status: "In Progress",
    url: "https://github.com/VincePradas/datingsite-backend",
  },
  {
    title: "Simple Blog Website",
    description: "My first project with node.js and mongodb",
    tech: ["Node.js", "Express.js", "MongoDB", "EJS"],
    status: "Completed",
    url: "https://write-em.vercel.app/",
  },
  {
    title: "CSWEEK HACKATHON PROJECT",
    description:
      "An E-Commerce platform designed to address SDG #2: Zero Hunger, which placed 2nd in VSU's Computer Science Week.",
    tech: ["MongoDB", "Express.js", "Node.js", "Azure", "Multer", "AWS S3"],
    status: "Completed",
    url: "https://github.com/VincePradas/csweekhackathon",
  },
  {
    title: "My Website Portfolio",
    description: "A portfolio of my web projects and development work.",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind v4",
      "Vercel",
      "Animation Libraries",
    ],
    status: "Completed",
    url: "https://github.com/VincePradas/csweekhackathon",
  },
  {
    title: "MY GITHUB ACCOUNT",
    description:
      "A collection of my projects, featuring scripts for automation and other tools.",
    tech: ["Github"],
    status: "Github",
    url: "https://github.com/VincePradas/",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20";
    case "In Progress":
      return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20";
    case "Planning":
      return "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20";
    default:
      return "";
  }
};

export default function Project() {
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  // Calculate pagination
  const totalPages = Math.ceil(projectCards.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = projectCards.slice(startIndex, endIndex);

  const handleCardClick = (url: string) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of projects section when page changes
    cardsContainerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-12 h-48 w-48 -translate-x-1/2 rounded-full bg-sky-500/10 blur-3xl"
        animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl relative z-10">
        <motion.div
          ref={cardsContainerRef}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Featured Projects
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Explore my latest work spanning web development, mobile apps, and
              emerging technologies
            </motion.p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {currentProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
                viewport={{ once: true, margin: "-50px" }}
                className="h-full group"
              >
                <motion.div
                  whileHover={{
                    y: -12,
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 240, damping: 18 },
                  }}
                  className="h-full"
                >
                  <Card
                    className="border border-border/50 bg-card/55 backdrop-blur-md h-full hover:shadow-[0_28px_80px_rgba(14,165,233,0.14)] hover:border-primary/30 transition-all duration-300 overflow-hidden relative cursor-pointer"
                    onClick={() => handleCardClick(project.url!)}
                  >
                    {/* Hover Gradient Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 pointer-events-none"
                      animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    />

                    <CardContent className="p-6 h-full flex flex-col relative z-10">
                      {/* Status Badge and External Link Icon */}
                      <div className="flex justify-between items-start mb-4">
                        <Badge
                          variant="outline"
                          className={`${getStatusColor(
                            project.status
                          )} font-medium`}
                        >
                          {project.status}
                        </Badge>
                        <div className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            className="w-full h-full"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Project Title */}
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>

                      {/* Project Description */}
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border/50">
                        {project.tech.map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="text-xs px-2.5 py-1 bg-secondary/80 hover:bg-secondary transition-colors duration-200"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <motion.div
              className="flex justify-center items-center gap-2 mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {/* Previous Button */}
              <motion.button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-lg border border-border bg-background hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </motion.button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <motion.button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 rounded-lg border transition-all duration-200 ${
                      currentPage === page
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border bg-background hover:bg-accent"
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    {page}
                  </motion.button>
                )
              )}

              {/* Next Button */}
              <motion.button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-lg border border-border bg-background hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </motion.button>

              {/* Page Info */}
              <div className="ml-4 text-sm text-muted-foreground">
                Page {currentPage} of {totalPages} • {projectCards.length}{" "}
                projects
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
