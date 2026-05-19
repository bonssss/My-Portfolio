import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { SOCIAL_LINKS } from "@/constants/data";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("INITIATED: Message received and queued for processing.");
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24">
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="text-primary font-mono text-[10px] tracking-[0.4em] uppercase">Transmission</span>
              <h2 className="text-8xl font-black tracking-tighter uppercase leading-none">
                Get In <br /> <span className="text-mask hover:text-foreground transition-all duration-500">Touch.</span>
              </h2>
            </div>
            
            <p className="text-2xl text-muted-foreground font-mono leading-relaxed max-w-md">
              Ready to scale your backend or automate your quality cycle? Let's connect.
            </p>

            <div className="space-y-8 pt-8 border-t border-border">
              <div className="grid grid-cols-2 gap-12">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Location</span>
                  <div className="text-foreground font-mono uppercase tracking-tighter">Addis Ababa // Remote</div>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Status</span>
                  <div className="text-primary font-mono uppercase tracking-tighter">Available for hire</div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="p-6 border border-border hover:border-primary/50 hover:bg-muted transition-all text-foreground hover:text-primary group"
                >
                  <social.icon className="h-6 w-6 group-hover:scale-125 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <form onSubmit={handleSubmit} className="space-y-12 p-12 border border-border bg-card/50 brutalist-shadow">
              <div className="space-y-8">
                <div className="space-y-2 relative">
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Identification</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="FULL NAME"
                    className="w-full bg-transparent border-b border-border py-4 focus:border-primary outline-none transition-colors font-mono text-lg placeholder:text-muted-foreground/30"
                  />
                </div>
                <div className="space-y-2 relative">
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Response Address</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="EMAIL@PROVIDER.COM"
                    className="w-full bg-transparent border-b border-border py-4 focus:border-primary outline-none transition-colors font-mono text-lg placeholder:text-muted-foreground/30"
                  />
                </div>
                <div className="space-y-2 relative">
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Payload</label>
                  <textarea 
                    required 
                    rows={4} 
                    placeholder="BRIEF YOUR PROJECT"
                    className="w-full bg-transparent border-b border-border py-4 focus:border-primary outline-none transition-colors font-mono text-lg placeholder:text-muted-foreground/30 resize-none"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-primary text-black font-black uppercase tracking-tighter py-6 flex items-center justify-center gap-4 hover:bg-white transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <>EXECUTE COMMAND <Send className="h-5 w-5" /></>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}