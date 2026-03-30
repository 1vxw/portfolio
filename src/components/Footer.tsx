"use client";
import { useRef, useEffect } from "react";
import { motion, useInView } from "@/lib/gsap-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaHeart,
  FaArrowUp,
  FaCode,
  FaRocket,
  FaPalette,
  FaMobile,
  FaFacebookF,
  FaFacebook,
} from "react-icons/fa";
import logo from "@/assets/imgs/logo.png";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/vincepradas",
    color: "hover:text-blue-600",
  },
  {
    icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/VincePradas",
    color: "hover:text-gray-800 dark:hover:text-gray-200",
  },
  {
    icon: FaFacebook,
    label: "Twitter",
    href: "https://facebook.com/vince6910",
    color: "hover:text-blue-400",
  },
  {
    icon: FaEnvelope,
    label: "Email",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=vincepradas691@gmail.com",
    color: "hover:text-red-500",
  },
];

const quickLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const services = [
  { icon: FaCode, label: "Frontend Development" },
  { icon: FaRocket, label: "Backend Development" },
  { icon: FaMobile, label: "Mobile Apps" },
  { icon: FaPalette, label: "UI/UX Design" },
];

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer animation
      gsap.fromTo(
        ".footer-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "easeOut",
          stagger: 0.1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            end: "bottom 20%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-foreground/5 border-t border-primary/20 mt-20"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-foreground rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-foreground rounded-full blur-2xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="footer-item space-y-4"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={logo}
                  alt="Vince Pradas logo"
                  className="h-9 w-9 object-contain invert dark:invert-0"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
                <h3 className="text-2xl font-bold">Vince Pradas</h3>
              </div>
              <p className="text-foreground/70 text-sm leading-relaxed">
                Full-Stack Developer passionate about creating amazing digital
                experiences. From frontend magic to backend wizardry, I bring
                ideas to life.
              </p>
            </div>
            <div className="flex items-center space-x-1 text-sm text-foreground/60">
              <span>Made with</span>
              <span>Next.js & TypeScript</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="footer-item"
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 8 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="text-foreground/70 hover:text-foreground transition-colors text-sm block py-1"
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="footer-item"
          >
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <motion.div
                    whileHover={{ x: 8 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="flex items-center space-x-2 text-foreground/70 hover:text-foreground transition-colors text-sm"
                  >
                    <service.icon className="w-4 h-4" />
                    <span>{service.label}</span>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="footer-item"
          >
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-foreground/70 mb-3">
                  Let&apos;s work together on your next project
                </p>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block py-2 px-4 bg-foreground text-background rounded-lg text-sm font-medium hover:bg-foreground/80 transition-all duration-300"
                >
                  Get In Touch
                </motion.a>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Follow Me</p>
                <div className="flex space-x-3">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.18, y: -4 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-8 h-8 bg-foreground/10 hover:bg-foreground text-foreground hover:text-background rounded-lg flex items-center justify-center transition-all duration-300 ${social.color}`}
                    >
                      <social.icon className="w-4 h-4" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="footer-item border-t border-primary/20 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0"
        >
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-foreground/60">
            <p>
              &copy; {new Date().getFullYear()} Vince Pradas. All rights
              reserved.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </a>
            </div>
          </div>

          {/* Back to Top Button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center space-x-2 text-sm text-foreground/70 hover:text-foreground transition-colors group"
          >
            <span>Back to top</span>
            <div className="w-8 h-8 bg-foreground/10 group-hover:bg-foreground text-foreground group-hover:text-background rounded-full flex items-center justify-center transition-all duration-300">
              <FaArrowUp className="w-3 h-3" />
            </div>
          </motion.button>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
    </footer>
  );
}
