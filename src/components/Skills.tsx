import { motion } from "framer-motion";
import { SKILLS } from "@/constants/data";

export function Skills() {
  return (
    <section id="skills" className="py-20 md:py-32 relative overflow-hidden bg-muted/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24 space-y-4">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase opacity-10 absolute -top-10 left-0">TOOLS</h2>
          <div className="relative z-10">
            <span className="text-primary font-mono text-[10px] tracking-[0.4em] uppercase">The Arsenal</span>
            <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mt-2">Core Tech Stack</h3>
          </div>
        </div>

        <div className="space-y-1">
          {SKILLS.map((cat, i) => (
            <div key={cat.category} className="group py-8 md:py-12 border-b border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-8 hover:bg-primary/5 px-4 transition-colors">
              <div className="flex items-center gap-6">
                <span className="text-sm font-mono text-muted-foreground">0{i + 1}</span>
                <div className="p-4 bg-muted rounded-none border border-border group-hover:border-primary/50 transition-colors">
                  <cat.icon className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-2xl md:text-4xl font-black tracking-tighter uppercase group-hover:translate-x-4 transition-transform duration-500">
                  {cat.category}
                </h4>
              </div>

              <div className="flex flex-wrap gap-x-8 gap-y-4 max-w-2xl justify-start md:justify-end">
                {cat.items.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.1, color: "var(--primary)" }}
                    className="text-lg font-mono tracking-tighter text-muted-foreground transition-colors uppercase whitespace-nowrap cursor-none"
                  >
                    /{skill}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Dynamic Marquee (Experimental) */}
      <div className="mt-32 border-y border-border py-8 bg-card">
        <div className="flex whitespace-nowrap overflow-hidden">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-20 text-6xl md:text-8xl font-black text-foreground/5 select-none uppercase italic"
          >
            {[...Array(10)].map((_, i) => (
              <span key={i}>Bonsa Desalegn — QA Engineer — Backend Developer — </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}