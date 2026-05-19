import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Services } from "./components/Services";
import { Blog } from "./components/Blog";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Artificial load for "Entering the System" feel
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary font-sans antialiased overflow-x-hidden">
      <AnimatePresence>
        {loading ? (
          <motion.div 
            key="loader"
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center flex-col gap-4 font-mono"
          >
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              className="h-px bg-primary"
            />
            <span className="text-[10px] uppercase tracking-[0.5em] text-primary animate-pulse">
              Initializing System Architect Portfolio
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <Navbar />
      
      <main className="noise-bg">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Services />
        <Blog />
        <Contact />
      </main>

      <Footer />
      <Toaster 
        position="top-right" 
        expand={false} 
        richColors 
        theme="dark"
        toastOptions={{
          style: {
            background: 'black',
            border: '1px solid oklch(0.2 0 0)',
            color: 'white',
            fontFamily: 'Space Mono, monospace',
            borderRadius: '0px',
            fontSize: '12px',
            textTransform: 'uppercase'
          }
        }}
      />
    </div>
  );
}

export default App;