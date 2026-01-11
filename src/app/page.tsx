"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowUpRight, Menu, X, ChevronRight, Mail, MapPin, Phone } from "lucide-react";

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, input, textarea")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[100] mix-blend-difference hidden md:block"
      animate={{
        x: position.x - 16,
        y: position.y - 16,
        scale: isHovering ? 2 : 1,
      }}
      transition={{ type: "spring", damping: 20, stiffness: 250, mass: 0.5 }}
    >
      <div className="w-full h-full bg-white rounded-full" />
    </motion.div>
  );
}

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

const services = [
  {
    num: "01",
    title: "Web Development",
    description: "High-performance websites engineered for conversion. From landing pages to complex web applications.",
    tags: ["React", "Next.js", "Custom CMS"],
  },
  {
    num: "02",
    title: "UI/UX Design",
    description: "Strategic design that captures attention and drives action. Every pixel serves a purpose.",
    tags: ["Figma", "Prototyping", "User Research"],
  },
  {
    num: "03",
    title: "SEO & Growth",
    description: "Data-driven optimization that puts you in front of your ideal customers organically.",
    tags: ["Technical SEO", "Content Strategy", "Analytics"],
  },
  {
    num: "04",
    title: "Brand Identity",
    description: "Cohesive visual systems that communicate your value and resonate with your audience.",
    tags: ["Logo Design", "Brand Guidelines", "Visual Identity"],
  },
];

const processSteps = [
  {
    num: "01",
    title: "Discovery",
    description: "We dive deep into your business, goals, and target audience to understand what success looks like for you.",
  },
  {
    num: "02",
    title: "Strategy",
    description: "We craft a tailored roadmap that aligns your digital presence with your business objectives.",
  },
  {
    num: "03",
    title: "Design & Build",
    description: "Our team brings the vision to life with pixel-perfect design and clean, performant code.",
  },
  {
    num: "04",
    title: "Launch & Grow",
    description: "We deploy your project and provide ongoing support to ensure continuous improvement.",
  },
];

const WHATSAPP_URL = "https://wa.me/916263288522?text=Hi%2C%20I%27m%20interested%20in%20your%20web%20development%20services";

const openWhatsApp = () => {
  if (window.self !== window.top) {
    window.parent.postMessage({ type: "OPEN_EXTERNAL_URL", data: { url: WHATSAPP_URL } }, "*");
  } else {
    window.open(WHATSAPP_URL, "_blank");
  }
};

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 md:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between rounded-full border border-white/10 bg-black/60 backdrop-blur-xl px-6 py-3">
            <a href="#" className="text-xl font-bold tracking-tight">
              Sovereign<span className="text-[#c9ff00]">.</span>
            </a>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-white/60 hover:text-white transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <button
              onClick={openWhatsApp}
              className="hidden md:flex items-center gap-2 bg-[#c9ff00] text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#b8e600] transition-colors"
            >
              Start a Project
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 mx-auto max-w-7xl rounded-2xl border border-white/10 bg-black/90 backdrop-blur-xl p-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg text-white/80 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => {
                  setIsOpen(false);
                  openWhatsApp();
                }}
                className="flex items-center justify-center gap-2 bg-[#c9ff00] text-black px-5 py-3 rounded-full text-sm font-semibold mt-4"
              >
                Start a Project
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </motion.nav>
    </>
  );
}

function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#c9ff00]/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />

      <motion.div style={{ y, opacity }} className="relative z-10 px-6 md:px-12">
        <div className="mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60">
              <span className="w-2 h-2 rounded-full bg-[#c9ff00] animate-pulse" />
              Premium Web Development Agency
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-8"
          >
            We build websites
            <br />
            <span className="font-serif italic font-normal text-[#c9ff00]">that convert</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto max-w-2xl text-lg md:text-xl text-white/60 mb-12"
          >
            High-performance digital experiences engineered for growth. We transform ambitious businesses into market leaders through strategic design and development.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#contact"
              className="group flex items-center gap-3 bg-[#c9ff00] text-black px-8 py-4 rounded-full text-base font-semibold hover:bg-[#b8e600] transition-all duration-300"
            >
              Start Your Project
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            <a
              href="#services"
              className="flex items-center gap-3 border border-white/20 text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-white/5 transition-all duration-300"
            >
              View Our Services
            </a>
          </motion.div>
        </div>
      </motion.div>

    </section>
  );
}

function Process() {
  return (
    <section className="py-24 px-6 md:px-12 border-y border-white/10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="text-[#c9ff00] text-sm font-semibold uppercase tracking-wider mb-4 block">
            How We Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Our <span className="font-serif italic font-normal text-white/60">Process</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="text-6xl font-bold text-white/5 absolute -top-4 -left-2 group-hover:text-[#c9ff00]/10 transition-colors duration-500">
                {step.num}
              </div>
              <div className="relative pt-8">
                <h3 className="text-xl font-bold mb-3 group-hover:text-[#c9ff00] transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
              {index < processSteps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-[1px] bg-white/10" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="pt-32 pb-0 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="text-[#c9ff00] text-sm font-semibold uppercase tracking-wider mb-4 block">
            What We Do
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Services that drive
            <br />
            <span className="font-serif italic font-normal text-white/60">real results</span>
          </h2>
        </motion.div>

        <div className="space-y-0">
          {services.map((service, index) => (
            <motion.div
              key={service.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group border-t border-white/10 py-10 md:py-14"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
                <span className="text-[#c9ff00] text-sm font-mono">{service.num}</span>
                <h3 className="text-2xl md:text-4xl font-bold flex-1 group-hover:text-[#c9ff00] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-white/50 max-w-md flex-1">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full border border-white/10 text-white/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="pt-12 pb-32 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-[#c9ff00] text-sm font-semibold uppercase tracking-wider mb-4 block">
              About Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
              We&apos;re not just developers.
              <br />
              <span className="font-serif italic font-normal text-white/60">We&apos;re growth partners.</span>
            </h2>
            <div className="space-y-6 text-white/60">
              <p>
                Sovereign Sites was founded on a simple belief: every business deserves a digital presence that works as hard as they do. We combine strategic thinking with technical excellence to create websites that don&apos;t just look stunning—they deliver measurable results.
              </p>
              <p>
                Our team brings together expertise in design, development, and digital strategy. We&apos;ve helped startups launch, established brands reinvent themselves, and enterprises scale their digital operations.
              </p>
            </div>
            <div className="mt-10 flex items-center gap-6">
              <a
                href="#contact"
                className="group flex items-center gap-2 text-[#c9ff00] font-semibold"
              >
                Work With Us
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=800&fit=crop"
                alt="Team collaboration"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-32 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#c9ff00] to-[#98c900] p-12 md:p-20 text-center"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-black mb-6">
              Ready to dominate
              <br />
              your market?
            </h2>
            <p className="text-black/70 text-lg max-w-xl mx-auto mb-10">
              Let&apos;s build something extraordinary together. Your next chapter starts with a conversation.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-black/80 transition-colors"
            >
              Schedule a Call
              <ArrowUpRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface Message {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  created_at: string;
}

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(false);

  const isAdmin = formData.name.toLowerCase() === "aaryaveer" && formData.email.toLowerCase() === "legend159980@gmail.com";

  const fetchMessages = async () => {
    setLoadingMessages(true);
    try {
      const res = await fetch("/api/messages");
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error("Failed to fetch messages", error);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isAdmin) {
      setShowAdmin(true);
      fetchMessages();
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", company: "", message: "" });
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch (error) {
      console.error("Failed to send message", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const groupedMessages = messages.reduce((acc, msg) => {
    const name = msg.name.toLowerCase();
    if (!acc[name]) {
      acc[name] = [];
    }
    acc[name].push(msg);
    return acc;
  }, {} as Record<string, Message[]>);

  const filteredGroups = Object.entries(groupedMessages).filter(([name]) =>
    name.includes(searchTerm.toLowerCase())
  );

  if (showAdmin) {
    return (
      <section id="contact" className="py-32 px-6 md:px-12 bg-[#0f0f0f]">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Contact Messages</h1>
            <button
              onClick={() => {
                setShowAdmin(false);
                setFormData({ name: "", email: "", company: "", message: "" });
              }}
              className="text-white/50 hover:text-white transition-colors"
            >
              Close
            </button>
          </div>
          
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#c9ff00] transition-colors mb-8"
          />

          {loadingMessages ? (
            <div className="text-white/50">Loading...</div>
          ) : filteredGroups.length === 0 ? (
            <div className="text-white/50">No messages found</div>
          ) : (
            <div className="space-y-8">
              {filteredGroups.map(([name, msgs]) => (
                <div key={name} className="border border-white/10 rounded-2xl p-6">
                  <h2 className="text-xl font-semibold text-[#c9ff00] mb-4 capitalize">
                    {name} ({msgs.length} message{msgs.length > 1 ? "s" : ""})
                  </h2>
                  <div className="space-y-4">
                    {msgs.map((msg) => (
                      <div key={msg.id} className="bg-white/5 rounded-xl p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="text-white/50 text-sm">Email: </span>
                            <span>{msg.email}</span>
                          </div>
                          <span className="text-white/30 text-xs">
                            {new Date(msg.created_at).toLocaleString()}
                          </span>
                        </div>
                        {msg.company && (
                          <div className="mb-2">
                            <span className="text-white/50 text-sm">Company: </span>
                            <span>{msg.company}</span>
                          </div>
                        )}
                        <div className="mt-3 pt-3 border-t border-white/10">
                          <p className="text-white/80">{msg.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-32 px-6 md:px-12 bg-[#0f0f0f]">
      <div className="mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-[#c9ff00] text-sm font-semibold uppercase tracking-wider mb-4 block">
              Get In Touch
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
              Let&apos;s start your
              <br />
              <span className="font-serif italic font-normal text-white/60">success story</span>
            </h2>
            <p className="text-white/60 mb-12 max-w-md">
              Have a project in mind? We&apos;d love to hear about it. Drop us a line and let&apos;s explore how we can help you achieve your goals.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#c9ff00]" />
                </div>
                <div>
                  <div className="text-white/50 text-sm">Email</div>
                  <div className="font-medium">sovereign.webdevs@gmail.com</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#c9ff00]" />
                </div>
                <div>
                  <div className="text-white/50 text-sm">WhatsApp</div>
                  <div className="font-medium">+91 6263288522</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#c9ff00]" />
                </div>
                <div>
                  <div className="text-white/50 text-sm">Location</div>
                  <div className="font-medium">Raipur, Chhattisgarh, IN</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <button
                type="button"
                onClick={openWhatsApp}
                className="w-full mb-6 bg-[#c9ff00] text-black py-4 rounded-xl font-semibold hover:bg-[#b8e600] transition-colors flex items-center justify-center gap-3"
              >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Get Started on WhatsApp
            </button>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Or Send Us a Message</h3>
              <p className="text-white/50 text-sm">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-white/50 mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#c9ff00] transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/50 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#c9ff00] transition-colors"
                    placeholder="john@company.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-white/50 mb-2">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#c9ff00] transition-colors"
                  placeholder="Your Company"
                />
              </div>
              <div>
                <label className="block text-sm text-white/50 mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#c9ff00] transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#c9ff00] text-black py-4 rounded-xl font-semibold hover:bg-[#b8e600] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : submitted ? "Message Sent!" : "Send Message"}
                {!isSubmitting && !submitted && <ArrowUpRight className="w-5 h-5" />}
              </button>
              {submitted && (
                <div className="text-[#c9ff00] text-center font-medium">
                  Thank you! We&apos;ll get back to you soon.
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-6 md:px-12 border-t border-white/10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <a href="#" className="text-2xl font-bold tracking-tight">
              Sovereign<span className="text-[#c9ff00]">.</span>
            </a>
            <p className="text-white/40 text-sm mt-2">
              Engineering digital excellence since 2019
            </p>
          </div>

          <div className="flex flex-wrap gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white/50 hover:text-white transition-colors text-sm"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-white/40 text-sm text-center">
            &copy; {new Date().getFullYear()} Sovereign Sites. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden cursor-none">
      <CustomCursor />
      <Navbar />
      <Hero />
      <Process />
      <Services />
      <About />
      <CTA />
      <Contact />
      <Footer />
    </main>
  );
}
