import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SOCIAL_LINKS } from "@/constants/data";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 500], [0, -200]);
  const y2 = useTransform(scrollY, [0, 500], [0, 200]);
  const rotate = useTransform(scrollY, [0, 1000], [0, 45]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden grid-bg"
    >
      {/* Background Huge Text (Experimental) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
        <motion.h1 
          style={{ y: y1, rotate }}
          className="text-[18vw] font-black leading-none whitespace-nowrap"
        >
          BONSA
        </motion.h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/30 text-primary text-[10px] font-mono tracking-[0.3em] uppercase mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Architecting Quality
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black leading-[0.85] tracking-tighter mb-8">
              BACKEND <span className="text-primary italic">&</span> <br /> 
              <span className="text-mask hover:text-foreground transition-all duration-500">QUALITY ASSURANCE ENGINEER</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-xl leading-relaxed font-mono">
              [Bonsa Desalegn] — Building scalable systems and ensuring software integrity through automated precision.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-8"
          >
            <div className="space-y-4">
              <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Connect</span>
              <div className="flex gap-6">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-foreground hover:text-primary transition-colors"
                    aria-label={social.name}
                  >
                    <social.icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Specialization</span>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-muted border border-border text-[10px] uppercase tracking-tighter">Microservices</span>
                <span className="px-2 py-1 bg-muted border border-border text-[10px] uppercase tracking-tighter">SDET</span>
                <span className="px-2 py-1 bg-muted border border-border text-[10px] uppercase tracking-tighter">Cloud Infrastructure</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Visual Element (Right side) */}
        <motion.div 
          style={{ y: y2 }}
          className="relative aspect-square hidden lg:block"
        >
          <div className="absolute inset-0 border-[20px] border-primary opacity-10 rotate-12 scale-90" />
          <div className="absolute inset-0 border border-primary/20 -rotate-12 scale-110" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full bg-primary/5 brutalist-shadow rotate-3 group overflow-hidden">
               <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/2bf73bea-628d-4dc3-aed7-97d8bf08837b/hero-bg-ad664462-1779184586784.webp" 
                alt="Bonsa Desalegn" 
                className="w-full h-full object-cover grayscale contrast-125 mix-blend-luminosity hover:grayscale-0 hover:mix-blend-normal transition-all duration-700 scale-110 hover:scale-100"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <ArrowDown className="h-6 w-6 text-primary" />
      </motion.div>
    </section>
  );
}