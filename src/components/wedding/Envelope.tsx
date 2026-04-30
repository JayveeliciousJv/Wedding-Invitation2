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

  // ✨ enhanced glitter (still subtle, just more "floating dust" feel)
  const glitterParticles = Array.from({ length: 85 }, (_, i) => ({
    id: i,
    left: `${5 + Math.random() * 90}%`,
    size: Math.random() > 0.6 ? 4 : Math.random() > 0.3 ? 3 : 2,
    duration: 2.8 + Math.random() * 2.4,
    delay: Math.random() * 1.5,
    drift: (Math.random() - 0.5) * 90,
    opacity: 0.35 + Math.random() * 0.5,
  }));

  return (
    <section className="section-dark relative min-h-screen w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 overflow-hidden grain">

      {/* 🌙 BASE RADIAL GLOW (soft gold aura) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(212,175,55,0.10) 0%, transparent 65%)",
        }}
      />

      {/* 🎞️ SILK LIGHT LAYER (NEW CINEMATIC SHIMMER) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(255, 215, 140, 0.10), transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(212,175,55,0.08), transparent 45%),
            linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.04) 45%, transparent 60%)
          `,
          backgroundSize: "200% 200%",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 22,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      {/* 🌫️ SECOND SILK PASS (slower gold foil reflection) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(135deg,
              transparent 0%,
              rgba(212,175,55,0.06) 50%,
              transparent 100%
            )
          `,
          backgroundSize: "300% 300%",
        }}
        animate={{
          backgroundPosition: ["100% 0%", "0% 100%", "100% 0%"],
        }}
        transition={{
          duration: 28,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      {/* ✨ FLOATING GOLD DUST */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(14)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: i % 3 === 0 ? "3px" : "2px",
              height: i % 3 === 0 ? "3px" : "2px",
              background: "rgba(212,175,55,0.5)",
              left: `${(i * 9) % 100}%`,
              top: `${(i * 14) % 100}%`,
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.1, 0.5, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 7 + (i % 5),
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ✨ GLITTER BURST (unchanged envelope interaction) */}
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
                  y: [0, -180, 320],
                  x: [0, p.drift, p.drift * 1.1],
                  opacity: [p.opacity, p.opacity, 0],
                  scale: [1, 1.1, 0.2],
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

      {/* ===== EVERYTHING BELOW IS YOUR ORIGINAL ENVELOPE (UNCHANGED) ===== */}

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
          className="relative w-full max-w-sm md:max-w-md aspect-[3/2] cursor-pointer"
          style={{ perspective: "1600px" }}
        >
          <AnimatePresence>
            {opened && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  initial={{ y: 40, opacity: 0, scale: 0.96 }}
                  animate={{ y: "-60%", opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, duration: 1.2 }}
                  className="w-[88%] aspect-[3/2.4] z-10 rounded-md bg-warm-white border border-gold/30 shadow-soft flex flex-col items-center justify-center px-6 text-center"
                >
                  <p className="font-script text-2xl md:text-3xl text-gold">
                    You are invited
                  </p>
                  <p className="font-script text-3xl md:text-4xl text-gold mt-1">
                    {WEDDING.coupleOrder[0]} &amp; {WEDDING.coupleOrder[1]}
                  </p>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Envelope (UNCHANGED) */}
          <div className="absolute inset-0 z-20 rounded-sm border border-white/10 shadow-soft pointer-events-none overflow-hidden bg-[var(--charcoal-2)]" />

          {/* Flap (UNCHANGED) */}
          <motion.div
            className="absolute left-0 right-0 top-0 z-30 origin-top pointer-events-none"
            style={{ height: `${FLAP_PCT}%`, transformStyle: "preserve-3d" }}
            animate={{ rotateX: opened ? -178 : 0 }}
            transition={{ duration: 1.2 }}
          >
            <div
              className="w-full h-full"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                background: "linear-gradient(to bottom, #3a3a3a, #1f1f1f)",
              }}
            />
          </motion.div>

          {/* Wax seal (UNCHANGED) */}
          <AnimatePresence>
            {!opened && (
              <motion.div
                className="absolute left-1/2 z-40"
                style={{ top: `${SEAL_TOP_PCT}%`, transform: "translate(-50%, -50%)" }}
              >
                <div className="w-20 h-20 rounded-full bg-gold flex items-center justify-center">
                  <span className="font-script text-xl">{WEDDING.monogram}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {!opened && (
        <p className="relative z-10 mt-10 text-[10px] sm:text-xs tracking-[0.3em] text-muted-soft uppercase animate-pulse">
          Tap the envelope to open
        </p>
      )}
    </section>
  );
}
