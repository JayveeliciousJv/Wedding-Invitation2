import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, Church, GlassWater } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { WEDDING } from "@/lib/wedding-config";

const locations = [
  {
    key: "ceremony" as const,
    icon: Church,
    label: "Ceremony",
    ...WEDDING.ceremony,
  },
  {
    key: "reception" as const,
    icon: GlassWater,
    label: "Reception",
    ...WEDDING.reception,
  },
];

export function Venue() {
  const [active, setActive] = useState<"ceremony" | "reception">("ceremony");
  const current = locations.find((l) => l.key === active)!;

  return (
    <section id="venue" className="section-light py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionTitle eyebrow="Find Us" title="Ceremony & Reception" />

        <div className="grid md:grid-cols-5 gap-6 md:gap-8 items-stretch">
          {/* Cards (left) */}
          <div className="md:col-span-2 flex flex-col gap-5">
            {locations.map((loc) => {
              const isActive = loc.key === active;
              const Icon = loc.icon;
              return (
                <motion.button
                  key={loc.key}
                  type="button"
                  onClick={() => setActive(loc.key)}
                  whileHover={{ y: -2 }}
                  className={`text-left rounded-2xl p-6 md:p-7 border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-warm-white border-gold shadow-glow-gold"
                      : "bg-warm-white border-border hover:border-gold/50 shadow-soft"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                        isActive ? "border-gold bg-gold/15" : "border-gold/30"
                      }`}
                      style={
                        isActive
                          ? undefined
                          : { backgroundColor: "color-mix(in oklab, var(--gold) 10%, transparent)" }
                      }
                    >
                      <Icon className="text-gold" size={18} />
                    </span>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-gold">{loc.label}</p>
                    {isActive && (
                      <span className="ml-auto text-[9px] tracking-[0.3em] uppercase text-gold/80">
                        Showing on map
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl">{loc.place}</h3>
                  <p className="mt-1 text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                    {loc.time}
                  </p>
                  <div className="flex items-start gap-2 mt-3 text-muted-foreground">
                    <MapPin className="text-gold mt-1 shrink-0" size={16} />
                    <p className="text-sm leading-relaxed">{loc.address}</p>
                  </div>
                  <a
                    href={loc.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 border border-gold rounded-full font-medium tracking-[0.2em] text-[10px] uppercase transition-all duration-300 hover:bg-gold hover-glow text-gold hover:text-[#1a1a1a]"
                  >
                    <Navigation size={14} /> Get Directions
                  </a>
                </motion.button>
              );
            })}
          </div>

          {/* Map (right) */}
          <div className="md:col-span-3 min-h-[320px] md:min-h-[480px]">
            <div className="rounded-2xl overflow-hidden shadow-soft border border-border h-full min-h-[320px] md:min-h-[480px] relative">
              <AnimatePresence mode="wait">
                <motion.iframe
                  key={current.key}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  title={`${current.label} map`}
                  src={current.mapsEmbed}
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
