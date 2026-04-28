import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { WEDDING } from "@/lib/wedding-config";

export function Timeline() {
  return (
    <section id="timeline" className="section-light py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionTitle eyebrow="The Day Of" title="Wedding Timeline" subtitle="June 13, 2026" />

        {/* Horizontal scrolling timeline */}
        <div className="relative">
          <div className="overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth">
            <div className="relative min-w-[760px] md:min-w-0">
              {/* The line */}
              <div className="absolute left-0 right-0 top-[34px] h-px bg-gold/40" />
              <div className="grid grid-cols-7 gap-2 md:gap-4">
                {WEDDING.timeline.map((item, i) => (
                  <motion.div
                    key={item.time}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.07 }}
                    className="group flex flex-col items-center text-center cursor-default"
                  >
                    <div
                      className="relative z-10 w-[18px] h-[18px] rounded-full bg-gold ring-4 ring-ivory transition-all duration-300 group-hover:scale-125"
                      style={{ boxShadow: "0 0 14px color-mix(in oklab, var(--gold) 60%, transparent)" }}
                    />
                    <p className="mt-4 text-xs sm:text-sm font-serif text-gold tabular-nums tracking-wide">
                      {item.time}
                    </p>
                    <p className="mt-1 text-[11px] sm:text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                      {item.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile scroll hint */}
          <p className="md:hidden text-center text-[10px] tracking-[0.3em] uppercase text-muted-foreground mt-2">
            Swipe to explore →
          </p>
        </div>
      </div>
    </section>
  );
}
