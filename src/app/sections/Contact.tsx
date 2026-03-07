"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaPaperPlane,
  FaUser,
  FaProjectDiagram,
  FaClock,
  FaFacebook,
  FaCheckCircle,
  FaCopy,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: FaEnvelope,
    label: "Email",
    value: "vincepradas.business@gmail.com",
    href: "mailto:vincepradas.business@gmail.com",
  },
  {
    icon: FaPhone,
    label: "Phone",
    value: "+639305971050",
    href: "tel:+639305971050",
  },
  {
    icon: FaMapMarkerAlt,
    label: "Location",
    value: "Philippines",
    href: null,
  },
];

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
];

const ANIMATION_CONFIG = {
  staggerDelay: 0.1,
  duration: 0.6,
  ease: "easeOut",
} as const;

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    timeline: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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

      gsap.fromTo(
        ".contact-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: ANIMATION_CONFIG.duration,
          ease: ANIMATION_CONFIG.ease,
          stagger: ANIMATION_CONFIG.staggerDelay,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 20%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = `Project Consultation Request - ${formData.service}`;
    const emailBody = `Name: ${formData.name}
        Email: ${formData.email}
        Service Needed: ${formData.service}
        Timeline: ${formData.timeline}
        Budget Range: ${formData.budget}

        Message:
        ${formData.message}`;

    const mailtoLink = `mailto:vincepradas.business@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(emailBody)}`;

    window.location.href = mailtoLink;

    setShowSuccess(true);

    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        service: "",
        timeline: "",
        budget: "",
        message: "",
      });
      setIsSubmitting(false);

      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }, 1000);
  };

  const copyEmailDetails = () => {
    const subject = `Project Consultation Request - ${
      formData.service || "General"
    }`;
    const emailBody = `Name: ${formData.name || "[Your Name]"}
        Email: ${formData.email || "[Your Email]"}
        Service Needed: ${formData.service || "[Service Type]"}
        Timeline: ${formData.timeline || "[Timeline]"}
        Budget Range: ${formData.budget || "[Budget]"}

        Message:
        ${formData.message || "[Your message here]"}`;

    const emailDetails = `To: vincepradas.business@gmail.com
        Subject: ${subject}

        ${emailBody}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(emailDetails).then(() => {
        alert(
          "✅ Email details copied to clipboard!\n\nYou can paste this into any email client:\n- Gmail\n- Outlook\n- Yahoo Mail\n- Apple Mail\n- Any other email app"
        );
      });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = emailDetails;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        alert(
          "Email details copied to clipboard!\n\nYou can paste this into any email client."
        );
      } catch (err) {
        alert(`Please copy this email template:\n\n${emailDetails}`);
      }
      document.body.removeChild(textArea);
    }
  };

  const openGmailCompose = () => {
    const subject = `Project Consultation Request - ${
      formData.service || "General"
    }`;
    const emailBody = `Name: ${formData.name || "[Your Name]"}
        Email: ${formData.email || "[Your Email]"}
        Service Needed: ${formData.service || "[Service Type]"}
        Timeline: ${formData.timeline || "[Timeline]"}
        Budget Range: ${formData.budget || "[Budget]"}

        Message:
        ${formData.message || "[Your message here]"}`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=vincepradas.business@gmail.com&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(emailBody)}`;

    window.open(gmailUrl, "_blank");
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen py-10 px-4 sm:px-6 lg:px-20 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-10 w-72 h-72 bg-foreground rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-foreground rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-20 left-1/2 z-50 flex -translate-x-1/2 items-center space-x-3 rounded-lg bg-green-500 px-6 py-4 text-white shadow-lg">
          <FaCheckCircle className="w-5 h-5" />
          <span className="font-medium">
            Email client opened! If it didn&apos;t work, use the copy button
            below.
          </span>
        </div>
      )}

      {/* Section Title */}
      <div ref={titleRef} className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="outline" className="mb-4 px-4 py-2">
            <FaEnvelope className="w-4 h-4 mr-2" />
            Let&apos;s Connect
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Get In <span className="text-foreground">Touch</span>
          </h2>
          <p className="text-lg sm:text-xl opacity-75 max-w-3xl mx-auto">
            Ready to bring your ideas to life? Let&apos;s discuss your project
            and create something amazing together.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="contact-card"
                  >
                    <Card className="border border-primary/20 hover:border-primary/50 transition-all duration-300 bg-card/55 backdrop-blur-md hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(14,165,233,0.10)]">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-foreground text-background rounded-lg flex items-center justify-center">
                            <info.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-semibold">{info.label}</p>
                            {info.href ? (
                              <a
                                href={info.href}
                                className="text-foreground/70 hover:text-foreground transition-colors"
                              >
                                {info.value}
                              </a>
                            ) : (
                              <p className="text-foreground/70">{info.value}</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-xl font-semibold mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.12, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-12 h-12 bg-foreground/10 hover:bg-foreground text-foreground hover:text-background rounded-lg flex items-center justify-center transition-all duration-300 ${social.color}`}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="border border-primary/20 bg-foreground/5 backdrop-blur-md">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold mb-3 flex items-center">
                    <FaClock className="w-4 h-4 mr-2" />
                    Current Availability
                  </h4>
                  <p className="text-sm opacity-75 mb-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-2"></span>
                    Available for new projects
                  </p>
                  <p className="text-sm opacity-75">
                    Response time: Within 24 hours
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="border border-primary/20 bg-card/55 backdrop-blur-md hover:shadow-[0_28px_70px_rgba(14,165,233,0.08)] transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <FaProjectDiagram className="w-6 h-6 mr-2" />
                  Let&apos;s Discuss Your Project
                </h3>

                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <FaUser className="w-3 h-3 inline mr-1" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-primary/30 rounded-lg bg-background/50 focus:border-primary focus:outline-none transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <FaEnvelope className="w-3 h-3 inline mr-1" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-primary/30 rounded-lg bg-background/50 focus:border-primary focus:outline-none transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  {/* Service and Timeline */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Service Needed *
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-primary/30 rounded-lg bg-background/50 focus:border-primary focus:outline-none transition-colors"
                      >
                        <option value="">Select a service</option>
                        <option value="Frontend Development">
                          Frontend Development
                        </option>
                        <option value="Backend Development">
                          Backend Development
                        </option>
                        <option value="Full-Stack Development">
                          Full-Stack Development
                        </option>
                        <option value="Mobile App Development">
                          Mobile App Development
                        </option>
                        <option value="E-Commerce Development">
                          E-Commerce Development
                        </option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="API Development">API Development</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Project Timeline
                      </label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-primary/30 rounded-lg bg-background/50 focus:border-primary focus:outline-none transition-colors"
                      >
                        <option value="">Select timeline</option>
                        <option value="ASAP">ASAP</option>
                        <option value="1-2 weeks">1-2 weeks</option>
                        <option value="1 month">1 month</option>
                        <option value="2-3 months">2-3 months</option>
                        <option value="3+ months">3+ months</option>
                        <option value="Flexible">Flexible</option>
                      </select>
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Budget Range (Optional)
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-primary/30 rounded-lg bg-background/50 focus:border-primary focus:outline-none transition-colors"
                    >
                      <option value="">Select budget range</option>
                      <option value="Let's discuss">Let&apos;s discuss</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Project Details *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-primary/30 rounded-lg bg-background/50 focus:border-primary focus:outline-none transition-colors resize-none"
                      placeholder="Tell me about your project, goals, and any specific requirements..."
                    />
                  </div>

                  {/* Submit Buttons */}
                  <div className="space-y-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-foreground text-background rounded-lg hover:bg-foreground/80 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      <FaPaperPlane className="w-4 h-4" />
                      <span>
                        {isSubmitting ? "Opening Email..." : "Send Message"}
                      </span>
                    </button>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={copyEmailDetails}
                        className="py-3 border border-primary/50 text-foreground rounded-lg hover:bg-primary/5 transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        <FaCopy className="w-4 h-4" />
                        <span className="text-sm">Copy Details</span>
                      </button>

                      <button
                        type="button"
                        onClick={openGmailCompose}
                        className="py-3 border border-primary/50 text-foreground rounded-lg hover:bg-primary/5 transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        <FaEnvelope className="w-4 h-4" />
                        <span className="text-sm">Open Gmail</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-center opacity-60 mt-4">
                    Having trouble? You can also email directly at{" "}
                    <a
                      href="mailto:vincepradas.business@gmail.com"
                      className="underline hover:opacity-100"
                    >
                      vincepradas.business@gmail.com
                    </a>
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
