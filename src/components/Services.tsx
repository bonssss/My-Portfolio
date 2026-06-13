import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import * as Icons from "lucide-react";
import { ArrowUpRight } from "lucide-react";

export function Services() {
  const { data: SERVICES, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase.from('services').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  return (
    <section id="services" className="py-20 md:py-32 grid-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 mb-24">
          <div className="lg:col-span-6">
            <span className="text-primary font-mono text-[10px] tracking-[0.4em] uppercase">Offerings</span>
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase mt-4">System <br /> Integrity.</h2>
          </div>
          <div className="lg:col-span-6 flex items-end justify-start lg:justify-end">
             <p className="text-muted-foreground font-mono text-sm max-w-sm text-left lg:text-right">
              Providing specialized services at the intersection of backend stability and automated validation.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-border">
          {isLoading ? (
            <div className="p-12 text-center text-muted-foreground col-span-2">Loading services...</div>
          ) : SERVICES?.map((service, idx) => {
            const Icon = (Icons as any)[service.icon] || Icons.Settings;
            return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="group p-6 sm:p-10 lg:p-16 bg-background hover:bg-primary transition-all duration-700 flex flex-col h-full relative overflow-hidden"
            >
              {/* Background Number */}
              <span className="absolute -bottom-10 -right-10 text-[200px] font-black text-foreground/5 group-hover:text-black/10 transition-colors pointer-events-none">
                0{idx + 1}
              </span>

              <div className="relative z-10 space-y-8">
                <div className="p-4 bg-muted w-fit rounded-none border border-border group-hover:bg-black/20 group-hover:border-black/20 transition-all">
                  <Icon className="h-8 w-8 text-primary group-hover:text-black" />
                </div>
                <h3 className="text-2xl md:text-4xl font-black tracking-tighter uppercase group-hover:text-black transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground font-mono text-sm max-w-sm group-hover:text-black/80 transition-colors">
                  {service.description}
                </p>
                <div className="pt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-2 text-black font-bold uppercase tracking-tighter text-sm">
                    Inquire now <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          )})}
        </div>
      </div>
    </section>
  );
}