import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-32 relative overflow-hidden border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Large Vertical Text */}
          <div className="lg:col-span-1 hidden lg:flex items-center justify-center">
            <span className="[writing-mode:vertical-lr] rotate-180 text-6xl md:text-8xl font-black text-foreground/5 select-none uppercase tracking-tighter">
              IDENTITY
            </span>
          </div>

          <div className="lg:col-span-11 space-y-20">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none">
                  Crafting <span className="text-primary italic underline underline-offset-8">Robust</span> <br /> 
                  Digital Foundations.
                </h2>
                <div className="w-24 h-1 bg-primary" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-6 text-xl text-muted-foreground font-mono leading-relaxed"
              >
                <p>
                  I bridge the gap between complex backend logic and bulletproof quality assurance. 
                  My philosophy is simple: <span className="text-foreground font-bold">Build for scale, test for failure.</span>
                </p>
                <p>
                  With half a decade in the trenches of API development and automation, 
                  I don't just write code; I architect ecosystems that thrive under pressure.
                </p>
              </motion.div>
            </div>

            {/* Stats / Focus Areas in a non-standard grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border">
              {[
                { label: "Stability", value: "99.9%", desc: "Uptime focus in backend systems" },
                { label: "Coverage", value: "100%", desc: "Commitment to automated testing" },
                { label: "Response", value: "<50ms", desc: "API latency optimization goal" }
              ].map((stat, i) => (
                <div key={i} className="p-12 border-b md:border-b-0 md:border-r border-border hover:bg-muted transition-colors group">
                  <div className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase mb-8">{stat.label}</div>
                  <div className="text-4xl md:text-6xl font-black text-foreground mb-4 group-hover:text-primary transition-colors">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-mono">{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}