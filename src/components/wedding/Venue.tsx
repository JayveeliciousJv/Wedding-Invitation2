import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Navigation,
  Church,
  GlassWater,
  ExternalLink,
  Expand,
} from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { WEDDING } from "@/lib/wedding-config";

const locations = [
  {
    key: "ceremony" as const,
    icon: Church,
    label: "Ceremony",
    mapImage: "/maps/ceremony.png",
    ...WEDDING.ceremony,
  },
  {
    key: "reception" as const,
    icon: GlassWater,
    label: "Reception",
    mapImage: "/maps/reception.png",
    ...WEDDING.reception,
  },
];

export function Venue() {
  const [active, setActive] = useState<"ceremony" | "reception">("ceremony");
  const [lightbox, setLightbox] = useState(false);
  const current = locations.find((l) => l.key === active)!;

  return (
    <>
      <section
        id="venue"
        className="section-light py-20 md:py-32 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          <SectionTitle eyebrow="Find Us" title="Ceremony & Reception" />

          <div className="grid md:grid-cols-5 gap-6 md:gap-8 items-stretch">
            {/* LEFT: LOCATION CARDS */}
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
                      >
                        <Icon className="text-gold" size={18} />
                      </span>
                      <p className="text-[10px] tracking-[0.3em] uppercase text-gold">
                        {loc.label}
                      </p>
                      {isActive && (
                        <span className="ml-auto text-[9px] tracking-[0.3em] uppercase text-gold/80">
                          Showing on map
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-xl md:text-2xl">
                      {loc.place}
                    </h3>
                    <p className="mt-1 text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                      {loc.time}
                    </p>
                    <div className="flex items-start gap-2 mt-3 text-muted-foreground">
                      <MapPin className="text-gold mt-1 shrink-0" size={16} />
                      <p className="text-sm leading-relaxed">{loc.address}</p>
                    </div>
                    
                      href={loc.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 border border-gold rounded-full font-medium tracking-[0.2em] text-[10px] uppercase transition-all duration-300 hover:bg-gold hover-glow text-gold hover:text-[#1a1a1a]"
                    >
                      <Navigation size={14} />
                      Get Directions
                    </a>
                  </motion.button>
                );
              })}
            </div>

            {/* RIGHT: MAP */}
            <div className="md:col-span-3 min-h-[320px] md:min-h-[480px]">
              <div className="rounded-2xl overflow-hidden shadow-soft border border-border h-full relative bg-muted">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.key}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    <div className="absolute inset-0 group">
                      <img
                        src={current.mapImage}
                        alt={`Map of ${current.place}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        draggable={false}
                      />

                      {/* Gradient overlay — stronger at bottom for readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                      {/* BOTTOM: venue name + grouped buttons */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                        {/* Venue name */}
                        <div className="mb-3">
                          <p className="text-[9px] tracking-[0.3em] uppercase text-white/70 mb-0.5">
                            {current.label}
                          </p>
                          <p className="font-serif text-white text-lg md:text-xl drop-shadow">
                            {current.place}
                          </p>
                        </div>

                        {/* Grouped buttons */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setLightbox(true)}
                            className="flex-1 flex items-center justify-center gap-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/40 text-white text-[10px] tracking-[0.2em] uppercase font-semibold px-4 py-2.5 rounded-full shadow-md hover:scale-105 transition-all duration-200"
                          >
                            <Expand size={12} />
                            Expand
                          </button>

                          
                            href={current.mapsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-1.5 bg-gold text-[#1a1a1a] text-[10px] tracking-[0.2em] uppercase font-semibold px-4 py-2.5 rounded-full shadow-md hover:brightness-105 hover:scale-105 transition-all duration-200"
                          >
                            <ExternalLink size={12} />
                            Open Map
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/85 backdrop-blur-sm p-4"
            onClick={() => setLightbox(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-white/50 text-[10px] tracking-[0.3em] uppercase mb-3 select-none">
              Tap anywhere outside to close
            </p>

            <motion.div
              className="relative max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <img
                src={current.mapImage}
                alt={`Map of ${current.place}`}
                className="w-full h-auto object-contain"
                draggable={false}
              />

              {/* Lightbox bottom bar */}
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-black/70 backdrop-blur-sm px-5 py-4">
                <div>
                  <p className="text-[9px] tracking-[0.3em] uppercase text-white/60 mb-0.5">
                    {current.label}
                  </p>
                  <p className="font-serif text-white text-base">
                    {current.place}
                  </p>
                </div>
                
                  href={current.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold text-[#1a1a1a] text-[10px] tracking-[0.2em] uppercase font-semibold rounded-full hover:brightness-105 hover:scale-105 transition-all duration-200 shadow-md"
                >
                  <Navigation size={13} />
                  Get Directions
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
