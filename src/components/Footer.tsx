import { NAV_LINKS, SOCIAL_LINKS } from "@/constants/data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-20 border-t border-border bg-card relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.02] pointer-events-none">
        <div className="w-full h-full grid-bg" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-16 mb-20">
          <div className="space-y-6 max-w-xs">
            <span className="text-4xl font-black tracking-tighter text-foreground">BD<span className="text-primary">.</span></span>
            <p className="text-sm text-muted-foreground font-mono uppercase tracking-tighter leading-relaxed">
              Architecting resilient backends and automated quality cycles for the modern web.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-16">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-mono">Navigation</span>
              <div className="flex flex-col gap-2">
                {NAV_LINKS.map(link => (
                  <a key={link.name} href={link.href} className="text-sm font-mono uppercase tracking-tighter text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-mono">Socials</span>
              <div className="flex flex-col gap-2">
                {SOCIAL_LINKS.map(social => (
                  <a key={social.name} href={social.href} className="text-sm font-mono uppercase tracking-tighter text-muted-foreground hover:text-primary transition-colors">
                    {social.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-mono">Contact</span>
              <div className="text-sm font-mono uppercase tracking-tighter text-muted-foreground">
                Addis Ababa, ET <br />
                Remote Worldwide
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-border">
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60">
            &copy; {currentYear} // BONSA DESALEGN // DESIGNED FOR IMPACT
          </span>
          <div className="flex gap-8">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60 cursor-help hover:text-primary transition-colors">Privacy Policy</span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60 cursor-help hover:text-primary transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}