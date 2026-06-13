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
import { BlogPostDetail } from "./components/BlogPostDetail";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { AdminLayout } from "./components/admin/AdminLayout";
import { Login } from "./pages/admin/Login";
import { Dashboard } from "./pages/admin/Dashboard";
import { ManageProjects } from "./pages/admin/ManageProjects";
import { ManageExperience } from "./pages/admin/ManageExperience";
import { ManageSkills } from "./pages/admin/ManageSkills";
import { ManageServices } from "./pages/admin/ManageServices";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function Home() {
  return (
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
  );
}

function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Artificial load for "Entering the System" feel
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary font-sans antialiased overflow-x-hidden">
      <AnimatePresence>
        {loading ? (
          <motion.div 
            key="loader"
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center flex-col gap-4 font-mono px-6"
          >
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "150px" }}
              className="h-px bg-primary"
            />
            <span className="text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.5em] text-primary animate-pulse text-center max-w-xs sm:max-w-none">
              Initializing System Architect Portfolio
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes>
            <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/blog/:slug" element={<BlogPostDetail />} />
          </Route>
          
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<ManageProjects />} />
            <Route path="experience" element={<ManageExperience />} />
            <Route path="skills" element={<ManageSkills />} />
            <Route path="services" element={<ManageServices />} />
          </Route>
        </Routes>
      </AuthProvider>
      </QueryClientProvider>

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
    </BrowserRouter>
  );
}

export default App;