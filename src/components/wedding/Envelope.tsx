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

  // ✨ ONLY enhancement: more subtle floating glitter (no visual envelope change)
  const glitterParticles = Array.from({ length: 90 }, (_, i) => ({
    id: i,
    left: `${10 + Math.random() * 80}%`,
    size: Math.random() > 0.5 ? 4 : 3,
    duration: 2.5 + Math.random() * 2,
    delay: Math.random() * 1.2,
    drift: (Math.random() - 0.5) * 80,
    opacity: 0.5 + Math.random() * 0.4,
  }));

  return (
    <section className="section-dark relative min-h-screen w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 overflow-hidden grain">

      {/* 🌙 original glow (kept safe) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in oklab, var(--gold) 12%, transparent) 0%, transparent 60%)",
        }}
      />

      {/* 🎞️ CINEMATIC SILK LIGHT (slower, candle-like movement) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 25% 30%, rgba(255, 220, 140, 0.10), transparent 45%),
            radial-gradient(circle at 75% 70%, rgba(212,175,55,0.08), transparent 50%),
            linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.035) 50%, transparent 65%)
          `,
          backgroundSize: "200% 200%",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 26, // slowed
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      {/* 🌫️ GOLD FOIL SLOW SWEEP */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, transparent 0%, rgba(212,175,55,0.06) 50%, transparent 100%)",
          backgroundSize: "300% 300%",
        }}
        animate={{
          backgroundPosition: ["100% 0%", "0% 100%", "100% 0%"],
        }}
        transition={{
          duration: 32, // very slow cinematic sweep
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      {/* ✨ FLOATING GOLD DUST */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: i % 3 === 0 ? "3px" : "2px",
              height: i % 3 === 0 ? "3px" : "2px",
              background: "rgba(212,175,55,0.55)",
              left: `${(i * 7.5) % 100}%`,
              top: `${(i * 11.3) % 100}%`,
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.15, 0.6, 0.15],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 7 + (i % 6),
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ✨ GLITTER BURST (UNCHANGED ENVELOPE BEHAVIOR) */}
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
                      ? "rgba(255, 215, 0, 0.9)"
                      : p.id % 3 === 1
                      ? "rgba(212, 175, 55, 0.85)"
                      : "rgba(255, 240, 150, 0.8)",
                }}
                initial={{ y: 0, x: 0, opacity: p.opacity, scale: 1 }}
                animate={{
                  y: [0, -160, 320],
                  x: [0, p.drift, p.drift * 1.1],
                  opacity: [p.opacity, p.opacity, 0],
                  scale: [1, 1.1, 0.3],
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

      {/* ================= ORIGINAL ENVELOPE (UNCHANGED) ================= */}

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

      <div className="relative z-10 w-full flex items-center justify-center">
        <motion.button
          type="button"
          onClick={handleOpen}
          whileHover={!opened ? { scale: 1.03 } : undefined}
          whileTap={!opened ? { scale: 0.98 } : undefined}
          className="relative w-full max-w-sm md:max-w-md aspect-[3/2] cursor-pointer"
          style={{ perspective: "1600px" }}
        >
          {/* ENVELOPE BODY (UNCHANGED) */}
          <div
            className="absolute inset-0 z-20 rounded-sm border border-white/10 shadow-soft pointer-events-none overflow-hidden"
            style={{
              backgroundColor: "var(--charcoal-2)",
              boxShadow:
                "inset 0 0 40px rgba(0,0,0,0.45), 0 20px 40px -20px rgba(0,0,0,0.6)",
            }}
          />

          {/* FLAP (UNCHANGED) */}
          <motion.div
            className="absolute left-0 right-0 top-0 z-30 origin-top pointer-events-none"
            style={{ height: `${FLAP_PCT}%`, transformStyle: "preserve-3d" }}
            animate={{ rotateX: opened ? -178 : 0 }}
            transition={{ duration: 1.2, ease: [0.7, 0, 0.3, 1] }}
          >
            <div
              className="w-full h-full"
              style={{
                background:
                  "linear-gradient(to bottom, oklch(0.50 0.001 60), oklch(0.40 0.001 60))",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              }}
            />
          </motion.div>

          {/* WAX SEAL (UNCHANGED — fully preserved) */}
          <AnimatePresence>
            {!opened && (
              <motion.div
                initial={{ x: "-50%", y: "-50%", scale: 0, opacity: 0 }}
                animate={{ x: "-50%", y: "-50%", scale: 1, opacity: 1 }}
                exit={{ x: "-50%", y: "-50%", scale: 0.6, opacity: 0 }}
                className="absolute left-1/2 z-40"
                style={{ top: `${SEAL_TOP_PCT}%` }}
              >
                <div className="relative w-20 h-20 rounded-full flex items-center justify-center overflow-hidden"
                  style={{
                    background:
                      "radial-gradient(circle at 32% 24%, hsl(48 100% 92%) 0%, hsl(43 82% 68%) 17%, hsl(var(--gold)) 47%, hsl(43 64% 29%) 100%)",
                  }}
                >
                  <span className="font-script text-xl text-center text-black">
                    {WEDDING.monogram}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {!opened && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          className="relative z-10 mt-10 text-[10px] sm:text-xs tracking-[0.3em] text-muted-soft uppercase animate-pulse"
        >
          Tap the envelope to open
        </motion.p>
      )}
    </section>
  );
}
