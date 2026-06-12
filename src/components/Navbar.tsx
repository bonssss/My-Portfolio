import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "next-themes";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Send, 
  LayoutGrid, 
  User, 
  Code2, 
  Briefcase, 
  MessageSquare,
  ArrowUpRight,
  Sun,
  Moon,
  BookOpen
} from "lucide-react";
import { NAV_LINKS } from "@/constants/data";

export function Navbar() {
  const [active, setActive] = useState("#hero");
  const { scrollYProgress } = useScroll();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Magnetic effect state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  return (
    <>
      {/* Floating Side Info (Desktop) */}
      <div className="fixed top-1/2 -translate-y-1/2 left-8 z-50 hidden xl:flex flex-col gap-8">
        <div className="w-px h-32 bg-border relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full bg-primary"
            style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
          />
        </div>
        <span className="[writing-mode:vertical-lr] rotate-180 text-[10px] tracking-[0.5em] uppercase text-muted-foreground font-mono">
          Scroll to explore
        </span>
      </div>

      {/* Floating Bottom Dock */}
      <nav className="fixed bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-50">
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-card/85 backdrop-blur-xl border border-border p-1 sm:p-2 rounded-full flex items-center gap-0.5 sm:gap-1 shadow-2xl"
        >
          {NAV_LINKS.map((link) => {
            const Icon = getIcon(link.name);
            return (
              <a
                key={link.name}
                href={isHome ? link.href : `/${link.href}`}
                onClick={(e) => {
                  if (isHome) {
                    setActive(link.href);
                  }
                }}
                className={`relative p-2 sm:p-3 rounded-full transition-all group ${
                  active === link.href ? "text-primary" : "text-foreground/50 hover:text-foreground"
                }`}
              >
                {active === link.href && (
                  <motion.div 
                    layoutId="dock-active"
                    className="absolute inset-0 bg-foreground/5 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon className="h-4 w-4 sm:h-5 w-5 relative z-10" />
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-card text-foreground text-[10px] rounded opacity-0 md:group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border pointer-events-none uppercase tracking-widest font-mono hidden md:block">
                  {link.name}
                </span>
              </a>
            );
          })}
        </motion.div>
      </nav>

      {/* Top Right Controls */}
      <div className="fixed top-6 right-6 md:top-8 md:right-8 z-50 flex items-center gap-2 bg-card/85 backdrop-blur-xl border border-border p-1.5 rounded-full shadow-xl">
        {mounted && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2.5 rounded-full text-foreground hover:bg-muted transition-all cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </motion.button>
        )}

        <motion.a
          href={isHome ? "#contact" : "/#contact"}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group hidden sm:flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2.5 rounded-full font-bold text-xs tracking-tighter uppercase"
        >
          LET'S TALK
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </motion.a>
      </div>
    </>
  );
}

function getIcon(name: string) {
  switch (name.toLowerCase()) {
    case 'about': return User;
    case 'skills': return Code2;
    case 'projects': return LayoutGrid;
    case 'experience': return Briefcase;
    case 'services': return Send;
    case 'blog': return BookOpen;
    case 'contact': return MessageSquare;
    default: return LayoutGrid;
  }
}