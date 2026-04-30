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

  // ✨ Improved glitter (more particles, smoother + softer)
  const glitterParticles = Array.from({ length: 70 }, (_, i) => ({
    id: i,
    left: `${10 + Math.random() * 80}%`,
    size: Math.random() > 0.5 ? 4 : 3,
    duration: 2.4 + Math.random() * 1.8,
    delay: Math.random() * 1.0,
    drift: (Math.random() - 0.5) * 80,
    opacity: 0.5 + Math.random() * 0.4,
  }));

  return (
    <section className="section-dark relative min-h-screen w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 overflow-hidden grain">

      {/* Original radial glow (UNCHANGED) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in oklab, var(--gold) 12%, transparent) 0%, transparent 60%)",
        }}
      />

      {/* ✨ SLOWER shimmer layer 1 */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(115deg, transparent 0%, transparent 40%, rgba(212,175,55,0.12) 50%, transparent 60%, transparent 100%)",
          backgroundSize: "300% 300%",
        }}
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
      />

      {/* ✨ SLOWER shimmer layer 2 */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(250deg, transparent 0%, transparent 35%, rgba(212,175,55,0.08) 50%, transparent 65%, transparent 100%)",
          backgroundSize: "300% 300%",
        }}
        animate={{ backgroundPosition: ["100% 100%", "0% 0%", "100% 100%"] }}
        transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
      />

      {/* Floating ambient dots (UNCHANGED) */}
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

      {/* ✨ Glitter burst (enhanced only, structure unchanged) */}
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
                      ? "0 0 5px rgba(255,215,0,0.5)"
                      : "none",
                }}
                initial={{ y: 0, x: 0, opacity: p.opacity, scale: 1 }}
                animate={{
                  y: [0, -130 - Math.random() * 90, 320],
                  x: [0, p.drift, p.drift * 1.3],
                  opacity: [p.opacity, p.opacity, 0],
                  scale: [1, 1.15, 0.3],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Heading (UNCHANGED) */}
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
          {WEDDING.coupleOrder[0]}{" "}
          <span className="text-gold">&amp;</span>{" "}
          {WEDDING.coupleOrder[1]}
        </h1>
        <p className="mt-3 text-sm md:text-base text-secondary-soft tracking-wide">
          You are invited to celebrate with us
        </p>
      </motion.div>

      {/* ===== ENVELOPE (UNCHANGED ORIGINAL BLOCK) ===== */}
      <div className="relative z-10 w-full flex items-center justify-center">
        <motion.button
          type="button"
          onClick={handleOpen}
          whileHover={!opened ? { scale: 1.03 } : undefined}
          whileTap={!opened ? { scale: 0.98 } : undefined}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          aria-label="Open invitation"
          className="relative w-full max-w-sm md:max-w-md aspect-[3/2] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 rounded-sm"
          style={{ perspective: "1600px" }}
        >

          {/* Envelope body (UNCHANGED) */}
          <div
            className="absolute inset-0 z-20 rounded-sm border border-white/10 shadow-soft pointer-events-none overflow-hidden"
            style={{
              backgroundColor: "var(--charcoal-2)",
              boxShadow:
                "inset 0 0 40px rgba(0,0,0,0.45), 0 20px 40px -20px rgba(0,0,0,0.6)",
            }}
          />

          {/* Wax seal (UNCHANGED FULL ORIGINAL) */}
          <AnimatePresence>
            {!opened && (
              <motion.div
                initial={{ x: "-50%", y: "-50%", scale: 0, opacity: 0, rotate: -10 }}
                animate={{ x: "-50%", y: "-50%", scale: 1, opacity: 1, rotate: 0 }}
                exit={{ x: "-50%", y: "-50%", scale: 0.6, opacity: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="absolute left-1/2 z-40 pointer-events-none"
                style={{ top: `${SEAL_TOP_PCT}%` }}
              >
                <div
                  className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center overflow-hidden"
                  style={{
                    background:
                      "radial-gradient(circle at 32% 24%, hsl(48 100% 92%) 0%, hsl(43 82% 68%) 17%, hsl(var(--gold)) 47%, hsl(43 64% 29%) 100%)",
                    boxShadow:
                      "0 0 28px hsl(var(--gold) / 0.55), inset 0 3px 6px rgba(255,240,180,0.55), inset 0 -5px 10px rgba(60,40,5,0.55), 0 6px 14px rgba(0,0,0,0.45)",
                    border: "1.5px solid hsl(43 69% 25%)",
                  }}
                >
                  <span className="relative grid place-items-center font-script text-2xl sm:text-3xl md:text-4xl text-center">
                    {WEDDING.monogram}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.button>
      </div>

    </section>
  );
}
