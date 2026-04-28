import { motion } from "framer-motion";
import { Users, Church, Camera, MapPin, Mic, Utensils, PartyPopper, type LucideIcon } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { WEDDING } from "@/lib/wedding-config";

const ICONS: Record<string, LucideIcon> = {
  Users,
  Church,
  Camera,
  MapPin,
  Mic,
  Utensils,
  PartyPopper,
};

export function Timeline() {
  return (
    <section id="timeline" className="section-light py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionTitle eyebrow="The Day Of" title="Wedding Timeline" subtitle="June 13, 2026" />

        <div className="relative">
          <div className="overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth">
            <div className="relative min-w-[820px] md:min-w-0">
              {/* The connecting line — sits behind the icons */}
              <div className="absolute left-0 right-0 top-[26px] h-px bg-gold/40" />
              <div className="grid grid-cols-7 gap-2 md:gap-4">
                {WEDDING.timeline.map((item, i) => {
                  const Icon = ICONS[item.icon] ?? Users;
                  return (
                    <motion.div
                      key={item.time}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.07 }}
                      className="group flex flex-col items-center text-center cursor-default"
                    >
                      <div
                        className="relative z-10 w-[52px] h-[52px] rounded-full bg-ivory ring-4 ring-ivory border border-gold/50 flex items-center justify-center text-gold transition-all duration-300 group-hover:scale-110 group-hover:bg-gold group-hover:text-ivory"
                        style={{ boxShadow: "0 0 14px color-mix(in oklab, var(--gold) 35%, transparent)" }}
                      >
                        <Icon size={22} strokeWidth={1.6} />
                      </div>
                      <p className="mt-4 text-xs sm:text-sm font-serif text-gold tabular-nums tracking-wide">
                        {item.time}
                      </p>
                      <p className="mt-1 text-[11px] sm:text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                        {item.label}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          <p className="md:hidden text-center text-[10px] tracking-[0.3em] uppercase text-muted-foreground mt-2">
            Swipe to explore →
          </p>
        </div>
      </div>
    </section>
  );
}
