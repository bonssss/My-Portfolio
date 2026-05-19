import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PROJECTS } from "@/constants/data";
import { Github, ExternalLink, ArrowRight } from "lucide-react";

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section id="projects" className="py-32 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24">
          <div className="space-y-4">
            <span className="text-primary font-mono text-[10px] tracking-[0.4em] uppercase">Portfolio</span>
            <h2 className="text-7xl font-black tracking-tighter uppercase leading-none">
              Featured <br /> <span className="text-mask hover:text-foreground transition-all duration-500">Works.</span>
            </h2>
          </div>
          <div className="max-w-md text-right">
            <p className="text-muted-foreground font-mono text-sm leading-relaxed">
              Selection of high-impact systems, from geofencing engines to automated QA frameworks.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
          {PROJECTS.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="group relative aspect-square bg-background overflow-hidden flex flex-col p-12 hover:bg-muted/10 transition-colors"
    >
      {/* Background Image on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
        <img src={project.image} alt="" className="w-full h-full object-cover grayscale" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-8">
          <span className="text-sm font-mono text-primary font-bold tracking-tighter">0{index + 1} // {project.category}</span>
          <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
            <a href={project.github} className="text-foreground hover:text-primary transition-colors"><Github className="h-5 w-5" /></a>
            <a href={project.demo} className="text-foreground hover:text-primary transition-colors"><ExternalLink className="h-5 w-5" /></a>
          </div>
        </div>

        <h3 className="text-5xl font-black tracking-tighter uppercase mb-6 leading-tight">
          {project.title.split(' ').map((word: string, i: number) => (
            <span key={i} className={i % 2 !== 0 ? "text-primary italic" : ""}>{word} </span>
          ))}
        </h3>
        
        <p className="text-muted-foreground font-mono text-sm max-w-sm mb-12 line-clamp-3">
          {project.description}
        </p>

        <div className="mt-auto flex flex-wrap gap-2">
          {project.tech.map((t: string) => (
            <span key={t} className="text-[10px] font-mono border border-border px-2 py-0.5 uppercase tracking-tighter group-hover:border-primary transition-colors">
              {t}
            </span>
          ))}
        </div>

        <div className="absolute bottom-12 right-12 group-hover:translate-x-2 transition-transform">
          <ArrowRight className="h-8 w-8 text-foreground/10 group-hover:text-primary" />
        </div>
      </div>
    </motion.div>
  );
}