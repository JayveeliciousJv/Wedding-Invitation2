import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WEDDING } from "@/lib/wedding-config";

export function Envelope({ onOpen }: { onOpen: () => void }) {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    setTimeout(onOpen, 2200);
  };

  const FLAP_PCT = 55;
  const SEAL_TOP_PCT = FLAP_PCT;

  // Generate burst glitter particles (post-open)
  const glitterParticles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: `${10 + Math.random() * 80}%`,
    size: Math.random() > 0.5 ? 4 : 3,
    duration: 2.2 + Math.random() * 1.8,
    delay: Math.random() * 0.8,
    drift: (Math.random() - 0.5) * 120,
    opacity: 0.6 + Math.random() * 0.4,
  }));

  return (
    <section className="section-dark relative min-h-screen w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 overflow-hidden grain">
      
      {/* Background Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, color-mix(in oklab, var(--gold) 12%, transparent) 0%, transparent 60%)",
        }}
      />

      {/* Shimmer Layer 1 - Slowed down to 12s */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(115deg, transparent 0%, transparent 40%, rgba(212,175,55,0.1) 50%, transparent 60%, transparent 100%)",
          backgroundSize: "300% 300%",
        }}
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 12, ease: "linear", repeat: Infinity }}
      />

      {/* Shimmer Layer 2 - Slowed down to 18s */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(250deg, transparent 0%, transparent 35%, rgba(212,175,55,0.05) 50%, transparent 65%, transparent 100%)",
          backgroundSize: "300% 300%",
        }}
        animate={{ backgroundPosition: ["100% 100%", "0% 0%", "100% 100%"] }}
        transition={{ duration: 18, ease: "linear", repeat: Infinity }}
      />

      {/* Ambient Floating Glitter - Increased count and varied movement */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(35)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full shadow-[0_0_5px_rgba(212,175,55,0.8)]"
            style={{
              width: i % 4 === 0 ? "3px" : "1.5px",
              height: i % 4 === 0 ? "3px" : "1.5px",
              background: i % 2 === 0 ? "#f1d592" : "#d4af37",
              left: `${(i * 7.7) % 100}%`,
              top: `${(i * 11.3 + 5) % 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, (i % 2 === 0 ? 10 : -10), 0],
              opacity: [0.1, 0.7, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 6 + (i % 6),
              delay: i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Burst Animation (When opened) */}
      <AnimatePresence>
        {opened && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {glitterParticles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  width: p.size, height: p.size, left: p.left, top: "50%",
                  background: p.id % 2 === 0 ? "#ffd700" : "#f1d592",
                }}
                initial={{ y: 0, x: 0, opacity: p.opacity, scale: 1 }}
                animate={{
                  y: [0, -150 - Math.random() * 100, 400],
                  x: [0, p.drift, p.drift * 1.5],
                  opacity: [p.opacity, p.opacity, 0],
                  scale: [1, 1.4, 0.2],
                }}
                transition={{ duration: p.duration, delay: p.delay, ease: [0.2, 0.8, 0.4, 1] }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="relative z-10 mb-8 md:mb-12 max-w-xl"
      >
        <p className="text-[10px] sm:text-xs tracking-[0.4em] text-gold uppercase mb-4">Together with their families</p>
        <h1 className="font-script text-5xl sm:text-6xl md:text-7xl text-white leading-tight">
          {WEDDING.coupleOrder[0]} <span className="text-gold">&amp;</span> {WEDDING.coupleOrder[1]}
        </h1>
        <p className="mt-3 text-sm md:text-base text-secondary-soft tracking-wide">You are invited to celebrate with us</p>
      </motion.div>

      {/* Envelope Section */}
      <div className="relative z-10 w-full flex items-center justify-center">
        <motion.button
          type="button"
          onClick={handleOpen}
          whileHover={!opened ? { scale: 1.02 } : undefined}
          whileTap={!opened ? { scale: 0.98 } : undefined}
          className="relative w-full max-w-sm md:max-w-md aspect-[3/2] cursor-pointer focus:outline-none rounded-sm"
          style={{ perspective: "1600px" }}
        >
          {/* Inner Invitation Paper */}
          <AnimatePresence>
            {opened && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  initial={{ y: 40, opacity: 0, scale: 0.96 }}
                  animate={{ y: "-60%", opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="w-[88%] aspect-[3/2.4] z-10 rounded-md bg-warm-white border border-gold/30 shadow-soft flex flex-col items-center justify-center px-6 text-center"
                >
                  <p className="font-script text-2xl md:text-3xl text-gold">You are invited</p>
                  <div className="w-12 h-px bg-gold/50 my-2" />
                  <p className="font-serif text-base md:text-xl text-stone-800">to the wedding of</p>
                  <p className="font-script text-3xl md:text-4xl text-gold mt-1">
                    {WEDDING.coupleOrder[0]} &amp; {WEDDING.coupleOrder[1]}
                  </p>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Envelope Body */}
          <div className="absolute inset-0 z-20 rounded-sm border border-white/10 shadow-2xl overflow-hidden" style={{ backgroundColor: "var(--charcoal-2)" }}>
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top right, transparent 49.7%, rgba(255,255,255,0.03) 50%, transparent 50.3%)" }} />
          </div>

          {/* Top Flap */}
          <motion.div
            className="absolute left-0 right-0 top-0 z-30 origin-top"
            style={{ height: `${FLAP_PCT}%`, transformStyle: "preserve-3d" }}
            animate={{ rotateX: opened ? -170 : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: opened ? 0.2 : 0 }}
          >
            <div className="w-full h-full" style={{ background: "linear-gradient(to bottom, #444, #222)", clipPath: "polygon(0 0, 100% 0, 50% 100%)", backfaceVisibility: "hidden" }} />
          </motion.div>

          {/* INTEGRATED WAX SEAL */}
          <AnimatePresence>
            {!opened && (
              <motion.div
                initial={{ x: "-50%", y: "-50%", scale: 0, rotate: -20 }}
                animate={{ x: "-50%", y: "-50%", scale: 1, rotate: 0 }}
                exit={{ x: "-50%", y: "-50%", scale: 0, opacity: 0, transition: { duration: 0.4 } }}
                transition={{ type: "spring", damping: 12, delay: 0.5 }}
                className="absolute left-1/2 z-40"
                style={{ top: `${SEAL_TOP_PCT}%` }}
              >
                {/* Wax Body */}
                <div 
                  className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center transition-transform hover:scale-105"
                  style={{
                    background: "radial-gradient(circle at 30% 30%, #f1d592, #d4af37, #996515)",
                    borderRadius: "50% 48% 52% 49% / 51% 52% 48% 49%",
                    boxShadow: "inset 2px 2px 5px rgba(255,255,255,0.4), inset -5px -5px 10px #7a5210, 0 6px 15px rgba(0,0,0,0.5)",
                  }}
                >
                  {/* Inner Ring */}
                  <div className="w-[80%] h-[80%] rounded-full border border-[#7a5210]/40 flex items-center justify-center" style={{ boxShadow: "inset 0 0 8px #7a5210" }}>
                    <span 
                      className="font-serif font-bold text-2xl md:text-3xl"
                      style={{ 
                        color: "#4a3208", 
                        textShadow: "1px 1px 1px rgba(255,255,255,0.3), -1px -1px 1px rgba(0,0,0,0.5)",
                        letterSpacing: "-1px"
                      }}
                    >
                      D&J
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {!opened && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.5 }}
          className="relative z-10 mt-10 text-[10px] tracking-[0.3em] text-gold uppercase animate-pulse"
        >
          Tap to open
        </motion.p>
      )}
    </section>
  );
}
