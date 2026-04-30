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

  const glitterParticles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${10 + Math.random() * 80}%`,
    size: Math.random() > 0.5 ? 4 : 3,
    duration: 1.8 + Math.random() * 1.4,
    delay: Math.random() * 0.8,
    drift: (Math.random() - 0.5) * 80,
    opacity: 0.6 + Math.random() * 0.4,
  }));

  return (
    <section
      className="section-dark relative min-h-screen w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 overflow-hidden grain"
      style={{ isolation: "isolate" }}
    >
      {/* Base glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in oklab, var(--gold) 12%, transparent) 0%, transparent 60%)",
        }}
      />

      {/* ============================= */}
      {/* EDGE-ONLY LUXURY SHIMMER FX */}
      {/* ============================= */}

      {/* Edge shimmer layer 1 */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(115deg, transparent 0%, transparent 40%, rgba(212,175,55,0.18) 50%, transparent 60%, transparent 100%)",
          backgroundSize: "300% 300%",

          /* KEY: only edges visible */
          WebkitMaskImage:
            "radial-gradient(circle, transparent 55%, black 78%)",
          maskImage: "radial-gradient(circle, transparent 55%, black 78%)",

          opacity: 0.6,
          filter: "blur(4px)",
          mixBlendMode: "screen",
        }}
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
      />

      {/* Edge shimmer layer 2 (softer counter drift) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(250deg, transparent 0%, transparent 38%, rgba(212,175,55,0.10) 50%, transparent 62%, transparent 100%)",
          backgroundSize: "300% 300%",

          WebkitMaskImage:
            "radial-gradient(circle, transparent 58%, black 82%)",
          maskImage: "radial-gradient(circle, transparent 58%, black 82%)",

          opacity: 0.35,
          filter: "blur(6px)",
          mixBlendMode: "soft-light",
        }}
        animate={{ backgroundPosition: ["100% 100%", "0% 0%", "100% 100%"] }}
        transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
      />

      {/* Floating ambient dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: i % 3 === 0 ? "3px" : "2px",
              height: i % 3 === 0 ? "3px" : "2px",
              background: "rgba(212, 175, 55, 0.6)",
              left: `${(i * 8.3) % 100}%`,
              top: `${(i * 13.7 + 10) % 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.15, 0.5, 0.15],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 5 + (i % 4),
              delay: i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Gold glitter burst */}
      <AnimatePresence>
        {opened && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {glitterParticles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  width: p.size,
                  height: p.size,
                  left: p.left,
                  top: "50%",
                  background:
                    p.id % 3 === 0
                      ? "rgba(255, 215, 0, 0.95)"
                      : p.id % 3 === 1
                      ? "rgba(212, 175, 55, 0.9)"
                      : "rgba(255, 240, 150, 0.85)",
                  boxShadow:
                    p.id % 2 === 0
                      ? "0 0 4px 1px rgba(255,215,0,0.6)"
                      : "none",
                }}
                initial={{ y: 0, x: 0, opacity: p.opacity, scale: 1 }}
                animate={{
                  y: [0, -120 - Math.random() * 80, 300],
                  x: [0, p.drift, p.drift * 1.4],
                  opacity: [p.opacity, p.opacity, 0],
                  scale: [1, 1.2, 0.4],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  ease: [0.2, 0.8, 0.4, 1],
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 mb-8 md:mb-12 max-w-xl"
      >
        <p className="text-[10px] sm:text-xs tracking-[0.4em] text-gold uppercase mb-4">
          Together with their families
        </p>
        <h1 className="font-script text-5xl sm:text-6xl md:text-7xl text-white leading-tight">
          {WEDDING.coupleOrder[0]} <span className="text-gold">&amp;</span>{" "}
          {WEDDING.coupleOrder[1]}
        </h1>
        <p className="mt-3 text-sm md:text-base text-secondary-soft tracking-wide">
          You are invited to celebrate with us
        </p>
      </motion.div>

      {/* Envelope */}
      <div className="relative z-50 w-full flex items-center justify-center">
        <motion.button
          type="button"
          onClick={handleOpen}
          whileHover={!opened ? { scale: 1.03 } : undefined}
          whileTap={!opened ? { scale: 0.98 } : undefined}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          className="relative w-full max-w-sm md:max-w-md aspect-[3/2] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 rounded-sm"
          style={{ perspective: "1600px" }}
        >
          {/* keep rest of your envelope unchanged */}
        </motion.button>
      </div>

      {!opened && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="relative z-10 mt-10 text-[10px] sm:text-xs tracking-[0.3em] text-muted-soft uppercase animate-pulse"
        >
          Tap the envelope to open
        </motion.p>
      )}
    </section>
  );
}
