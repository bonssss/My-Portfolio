import { motion } from "framer-motion";
import { EXPERIENCE } from "@/constants/data";

export function Experience() {
  return (
    <section id="experience" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24 flex flex-col md:flex-row items-center justify-between gap-12">
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase">Trajectory</h2>
          <div className="w-full md:w-1/2 h-px bg-border hidden md:block" />
        </div>

        <div className="space-y-0 border-l border-border">
          {EXPERIENCE.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative pl-12 pb-24 group last:pb-0"
            >
              {/* Dot */}
              <div className="absolute left-[-5px] top-0 w-[10px] h-[10px] bg-foreground group-hover:bg-primary group-hover:scale-150 transition-all duration-500 rounded-none rotate-45" />
              
              <div className="grid md:grid-cols-4 gap-8">
                <div className="md:col-span-1">
                  <span className="text-primary font-mono text-sm font-bold tracking-widest">{exp.period}</span>
                  <div className="mt-2 text-muted-foreground uppercase text-[10px] tracking-widest font-mono">{exp.company}</div>
                </div>
                
                <div className="md:col-span-3 space-y-6">
                  <h3 className="text-2xl md:text-4xl font-black tracking-tighter uppercase group-hover:text-primary transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-xl text-muted-foreground font-mono leading-relaxed max-w-2xl">
                    {exp.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-muted-foreground/30">
                    <exp.icon className="h-12 w-12" />
                    <div className="h-px w-24 bg-border" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}