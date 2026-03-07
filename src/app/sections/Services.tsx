"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  FaReact,
  FaServer,
  FaMobile,
  FaDatabase,
  FaPalette,
  FaRocket,
  FaShoppingCart,
  FaChartLine,
  FaShieldAlt,
  FaCode,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    title: "Frontend Development",
    description:
      "Modern, responsive web applications with cutting-edge technologies",
    icon: FaReact,
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    features: [
      "Responsive Design",
      "Performance Optimization",
      "SEO Optimization",
      "Modern UI/UX",
      "Cross-browser Compatibility",
    ],
    deliveryTime: "2-4 weeks",
  },
  {
    id: 2,
    title: "Backend Development",
    description: "Scalable server-side solutions and robust API development",
    icon: FaServer,
    technologies: ["Node.js", "Express.js", "MongoDB", "sREST APIs"],
    features: [
      "RESTful API Development",
      "Database Design",
      "Authentication & Authorization",
      "Data Security",
      "Cloud Integration",
    ],
    deliveryTime: "3-5 weeks",
  },
  {
    id: 3,
    title: "Mobile App Development",
    description: "Cross-platform mobile applications for iOS and Android",
    icon: FaMobile,
    technologies: ["React Native", "Expo", "Firebase", "Native APIs"],
    features: [
      "Cross-platform Development",
      "Native Performance",
      "Push Notifications",
      "Offline Functionality",
      "App Store Deployment",
    ],
    deliveryTime: "4-6 weeks",
  },
  {
    id: 4,
    title: "Full-Stack Development",
    description:
      "Complete web solutions from frontend to backend and deployment",
    icon: FaRocket,
    technologies: ["MERN Stack", "Next.js", "TypeScript", "AWS"],
    features: [
      "End-to-end Development",
      "Database Management",
      "Cloud Deployment",
      "CI/CD Pipeline",
      "Maintenance & Support",
    ],
    deliveryTime: "6-8 weeks",
  },
  {
    id: 5,
    title: "E-Commerce Development",
    description: "Complete online store solutions with payment integration",
    icon: FaShoppingCart,
    technologies: ["Next.js", "Stripe", "PayPal", "Inventory Management"],
    features: [
      "Payment Gateway Integration",
      "Inventory Management",
      "Order Tracking",
      "Admin Dashboard",
      "Mobile Responsive",
    ],
    deliveryTime: "5-7 weeks",
  },
  {
    id: 6,
    title: "API Development",
    description: "Custom REST APIs and third-party service integrations",
    icon: FaDatabase,
    technologies: ["Node.js", "Express", "MongoDB", "MySQL"],
    features: [
      "Custom API Development",
      "Third-party Integrations",
      "API Documentation",
      "Rate Limiting",
      "Monitoring & Analytics",
    ],
    deliveryTime: "2-3 weeks",
  },
  {
    id: 7,
    title: "UI/UX Design",
    description: "Modern and intuitive user interface and experience design",
    icon: FaPalette,
    technologies: ["Figma", "Adobe XD", "Tailwind", "Framer Motion"],
    features: [
      "User Research",
      "Wireframing",
      "Prototyping",
      "Design Systems",
      "Usability Testing",
    ],
    deliveryTime: "2-3 weeks",
  },
  {
    id: 8,
    title: "Analytics Integration",
    description:
      "Data tracking and analytics implementation for better insights",
    icon: FaChartLine,
    technologies: ["Google Analytics", "Custom Analytics", "Dashboards"],
    features: [
      "User Tracking",
      "Conversion Analytics",
      "Custom Dashboards",
      "A/B Testing",
      "Performance Metrics",
    ],
    deliveryTime: "1-2 weeks",
  },
  {
    id: 9,
    title: "Security Implementation",
    description: "Comprehensive security solutions for web applications",
    icon: FaShieldAlt,
    technologies: ["JWT", "OAuth", "SSL", "Encryption"],
    features: [
      "Authentication Systems",
      "Data Encryption",
      "Security Audits",
      "Vulnerability Assessment",
      "Compliance Standards",
    ],
    deliveryTime: "2-3 weeks",
  },
];

const ANIMATION_CONFIG = {
  staggerDelay: 0.1,
  duration: 0.6,
  ease: "easeOut",
} as const;

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 4;
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const totalPages = Math.ceil(services.length / servicesPerPage);
  const startIndex = (currentPage - 1) * servicesPerPage;
  const endIndex = startIndex + servicesPerPage;
  const currentServices = services.slice(startIndex, endIndex);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setSelectedService(null);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setSelectedService(null);
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    setSelectedService(null);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: ANIMATION_CONFIG.duration,
          ease: ANIMATION_CONFIG.ease,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
          },
        }
      );

      const visibleCards = cardsRef.current.filter(
        (card) => card !== undefined
      );
      if (visibleCards.length > 0) {
        gsap.fromTo(
          visibleCards,
          { y: 60, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: ANIMATION_CONFIG.duration,
            ease: ANIMATION_CONFIG.ease,
            stagger: ANIMATION_CONFIG.staggerDelay,
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [currentPage]);

  useEffect(() => {
    cardsRef.current = [];
  }, [currentPage]);

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el && !cardsRef.current[index]) {
      cardsRef.current[index] = el;
    }
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="min-h-screen pt-5 px-4 sm:px-6 lg:px-20 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-foreground blur-3xl" />
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-foreground blur-3xl" />
      </div>

      {/* Section Title */}
      <div ref={titleRef} className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="outline" className="mb-4 px-4 py-2">
            <FaCode className="w-4 h-4 mr-2" />
            What I Offer
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            My <span className="text-foreground">Services</span>
          </h2>
          <p className="text-lg sm:text-xl opacity-75 max-w-3xl mx-auto">
            From concept to deployment, I provide comprehensive development
            services to bring your digital ideas to life with modern
            technologies and best practices.
          </p>
        </motion.div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10 mb-12">
        {currentServices.map((service, index) => (
          <motion.div
            key={service.id}
            ref={(el) => addToRefs(el, index)}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: "easeOut",
            }}
            whileHover={{ y: -12, scale: 1.02, rotateX: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group cursor-pointer"
            onClick={() =>
              setSelectedService(
                selectedService === service.id ? null : service.id
              )
            }
          >
            <Card className="h-full border-2 border-dashed border-primary/25 hover:border-primary/50 transition-all duration-300 bg-card/55 backdrop-blur-md hover:bg-card/85 hover:shadow-[0_28px_70px_rgba(14,165,233,0.10)]">
              <CardContent className="p-6">
                {/* Service Header */}
                <div className="mb-4">
                  <motion.div
                    className="w-12 h-12 rounded-lg bg-foreground p-3 mb-4"
                    whileHover={{ rotate: 8, scale: 1.12 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  >
                    <service.icon className="w-full h-full text-background" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-foreground/80 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm opacity-75 mb-4">
                    {service.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {service.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Delivery Time */}
                <div className="flex justify-center items-center mb-4 text-sm">
                  <span className="opacity-75">{service.deliveryTime}</span>
                </div>

                {/* Expandable Features */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: selectedService === service.id ? "auto" : 0,
                    opacity: selectedService === service.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-primary/20 pt-4 mt-4">
                    <h4 className="font-semibold mb-2 text-sm">
                      Included Features:
                    </h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="text-xs opacity-75 flex items-center"
                        >
                          <div className="w-1 h-1 bg-foreground rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const contactElement =
                          document.getElementById("contact");
                        if (contactElement) {
                          contactElement.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="w-full mt-4 py-2 px-4 bg-foreground text-background text-sm rounded-lg hover:bg-foreground/80 transition-all duration-300"
                    >
                      Get Started
                    </button>
                  </div>
                </motion.div>

                {/* View More Indicator */}
                <div className="flex justify-center mt-4">
                  <motion.div
                    animate={{
                      rotate: selectedService === service.id ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-foreground/70 text-sm flex items-center"
                  >
                    {selectedService === service.id ? "Less Info" : "More Info"}
                    <span className="ml-1">↓</span>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Pagination Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex justify-center items-center gap-4 mb-16 relative z-20"
      >
        {/* Previous Button */}
        <motion.button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            goToPreviousPage();
          }}
          disabled={currentPage === 1}
          className={`p-3 rounded-lg border transition-all duration-300 relative z-30 ${
            currentPage === 1
              ? "border-primary/20 text-foreground/30 cursor-not-allowed"
              : "border-primary/50 text-foreground hover:bg-primary/5 hover:border-primary/80 cursor-pointer"
          }`}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
        >
          <FaChevronLeft className="w-4 h-4 pointer-events-none" />
        </motion.button>

        {/* Page Numbers */}
        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <motion.button
              key={page}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                goToPage(page);
              }}
              className={`px-4 py-2 rounded-lg border transition-all duration-300 relative z-30 cursor-pointer ${
                currentPage === page
                  ? "bg-foreground text-background border-foreground"
                  : "border-primary/50 text-foreground hover:bg-primary/5 hover:border-primary/80"
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              {page}
            </motion.button>
          ))}
        </div>

        {/* Next Button */}
        <motion.button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            goToNextPage();
          }}
          disabled={currentPage === totalPages}
          className={`p-3 rounded-lg border transition-all duration-300 relative z-30 ${
            currentPage === totalPages
              ? "border-primary/20 text-foreground/30 cursor-not-allowed"
              : "border-primary/50 text-foreground hover:bg-primary/5 hover:border-primary/80 cursor-pointer"
          }`}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
        >
          <FaChevronRight className="w-4 h-4 pointer-events-none" />
        </motion.button>
      </motion.div>

      {/* Pagination Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-center mb-16"
      >
        <div className="text-sm opacity-75 mb-2">
          Showing {startIndex + 1}-{Math.min(endIndex, services.length)} of{" "}
          {services.length} services
        </div>
        <div className="text-xs opacity-50">
          Current Page: {currentPage} | Total Pages: {totalPages} | Services Per
          Page: {servicesPerPage}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center mt-16"
      >
        <div className="bg-card/50 backdrop-blur-sm rounded-xl p-8 border-2 border-dashed border-primary/25 hover:border-primary/50 transition-all duration-300">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">
            Ready to Start Your Project?
          </h3>
          <p className="text-lg text-foreground/75 mb-6 max-w-2xl mx-auto">
            Let&apos;s discuss your requirements and create something amazing
            together. I&apos;m here to help you turn your ideas into reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const contactElement = document.getElementById("contact");
                if (contactElement) {
                  contactElement.scrollIntoView({ behavior: "smooth" });
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="py-3 px-8 bg-foreground text-background rounded-lg hover:bg-foreground/80 transition-all duration-300 font-medium relative z-50"
              type="button"
            >
              Get Free Consultation
            </motion.button>
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const projectsElement = document.getElementById("projects");
                if (projectsElement) {
                  projectsElement.scrollIntoView({ behavior: "smooth" });
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="py-3 px-8 border-2 border-foreground/50 text-foreground rounded-lg hover:bg-foreground/5 hover:border-foreground transition-all duration-300 font-medium relative z-50"
              type="button"
            >
              View Projects
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
