import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Navigation,
  Church,
  GlassWater,
  ExternalLink,
  ArrowLeft,
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

  const openMap = () => setLightbox(true);
  const closeMap = () => setLightbox(false);

  return (
    <>
      <section
        id="venue"
        className="section-light py-20 md:py-32 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          <SectionTitle eyebrow="Find Us" title="Ceremony & Reception" />

          <div className="grid md:grid-cols-5 gap-6 md:gap-8 items-stretch">

            {/* LEFT CARDS */}
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
                    className={`text-left rounded-2xl p-6 md:p-7 border transition-all duration-300 ${
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
                      <MapPin className="text-gold mt-1" size={16} />
                      <p className="text-sm">{loc.address}</p>
                    </div>

                    <a
                      href={loc.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 border border-gold rounded-full text-[10px] uppercase tracking-[0.2em] text-gold hover:bg-gold hover:text-black transition"
                    >
                      <Navigation size={14} />
                      Get Directions
                    </a>
                  </motion.button>
                );
              })}
            </div>

            {/* RIGHT MAP */}
            <div className="md:col-span-3 min-h-[320px] md:min-h-[480px]">
              <div className="relative rounded-2xl overflow-hidden border shadow-soft h-full bg-muted">

                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.key}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* MAP IMAGE */}
                    <button
                      onClick={openMap}
                      className="absolute inset-0 w-full h-full group cursor-zoom-in"
                    >
                      <img
                        src={current.mapImage}
                        alt={current.place}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                      <div className="absolute top-3 left-3 bg-black/60 text-white text-[10px] px-3 py-1 rounded-full uppercase tracking-[0.2em]">
                        Tap to expand
                      </div>
                    </button>

                    {/* TOP RIGHT BUTTON */}
                    <div className="absolute top-3 right-3">
                      <a
                        href={current.mapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 bg-gold text-black text-[10px] px-3 py-2 rounded-full uppercase font-semibold hover:brightness-110"
                      >
                        <ExternalLink size={12} />
                        Open Map
                      </a>
                    </div>

                    {/* BOTTOM INFO */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                      <p className="text-[9px] tracking-[0.3em] uppercase text-white/70">
                        {current.label}
                      </p>
                      <p className="font-serif text-white text-lg md:text-xl">
                        {current.place}
                      </p>
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
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeMap}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-5xl w-full rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              {/* BACK BUTTON */}
              <button
                onClick={closeMap}
                className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/60 text-white text-[10px] uppercase px-3 py-2 rounded-full"
              >
                <ArrowLeft size={14} />
                Back
              </button>

              <img
                src={current.mapImage}
                alt={current.place}
                className="w-full h-auto object-contain"
              />

              {/* BOTTOM BAR */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center bg-black/70 px-5 py-4">
                <div>
                  <p className="text-[9px] uppercase text-white/60">
                    {current.label}
                  </p>
                  <p className="text-white font-serif">
                    {current.place}
                  </p>
                </div>

                <a
                  href={current.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gold text-black text-[10px] px-4 py-2 rounded-full uppercase font-semibold"
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
