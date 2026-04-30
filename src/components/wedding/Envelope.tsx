import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WEDDING } from "@/lib/wedding-config";

/**
 * Premium envelope reveal — cinematic choreography:
 *  0.0s  Seal lifts & fades (no jarring rotate)
 *  0.4s  Flap opens smoothly (cubic ease)
 *  1.3s  Soft golden light blooms from inside the envelope
 *  1.5s  Invitation card glides UP out of envelope (no shoot/overshoot)
 *  3.0s  Card settles centered, gently breathing
 *  6.5s  Hand-off to hero
 */
export function Envelope({ onOpen }: { onOpen: () => void }) {
  const [opened, setOpened] = useState(false);

  const REVEAL_HOLD_MS = 6500;

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    setTimeout(onOpen, REVEAL_HOLD_MS);
  };

  const FLAP_PCT = 55;
  const SEAL_TOP_PCT = FLAP_PCT;

  // Ambient glitter — softer, fewer, more elegant
  const ambientGlitter = Array.from({ length: 45 }, (_, i) => ({
    id: i,
    left: `${(i * 7.7) % 100}%`,
    top: `${(i * 13.3 + 5) % 100}%`,
    size: i % 7 === 0 ? 2.5 : 1.2,
    duration: 8 + (i % 5),
    delay: i * 0.22,
  }));

  // Slow drifting gold embers
  const embers = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    left: `${(i * 17 + 5) % 100}%`,
    duration: 22 + (i % 4) * 3,
    delay: i * 1.6,
    size: 3 + (i % 2),
  }));

  // Elegant rising sparkles on open (replaces chaotic burst)
  const risingSparkles = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    left: `${20 + (i * 2.5) % 60}%`,
    delay: 1.0 + (i % 8) * 0.08,
    duration: 3.5 + (i % 4) * 0.4,
    size: i % 4 === 0 ? 3 : 1.8,
    drift: ((i % 5) - 2) * 18,
  }));

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-[#0a0a0a] grain">

      {/* ============ 1. PREMIUM ANIMATED GOLD BACKGROUND ============ */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, #1a1207 0%, #0a0705 55%, #000 100%)",
          }}
        />

        <motion.div
          className="absolute -inset-[20%] opacity-[0.16]"
          style={{
            background:
              "conic-gradient(from 0deg at 50% 50%, transparent 0deg, #d4af37 60deg, transparent 120deg, transparent 240deg, #b08d26 300deg, transparent 360deg)",
            filter: "blur(70px)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 80, ease: "linear", repeat: Infinity }}
        />

        <motion.div
          className="absolute inset-0 opacity-20 mix-blend-screen"
          style={{
            background:
              "linear-gradient(115deg, transparent 38%, rgba(241,213,146,0.45) 50%, transparent 62%)",
            backgroundSize: "300% 300%",
          }}
          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
          transition={{ duration: 24, ease: "linear", repeat: Infinity }}
        />

        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(212,175,55,0.15) 0%, transparent 55%)",
          }}
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
        />

        {/* Ornamental frames */}
        <div className="absolute inset-6 border border-[#d4af37]/15 rounded-sm" />
        <div className="absolute inset-10 border border-[#d4af37]/[0.08] rounded-sm" />

        {ambientGlitter.map((p) => (
          <motion.div
            key={`ambient-${p.id}`}
            className="absolute rounded-full bg-[#f1d592]"
            style={{
              width: p.size,
              height: p.size,
              left: p.left,
              top: p.top,
              boxShadow: "0 0 6px #d4af37, 0 0 12px rgba(212,175,55,0.5)",
            }}
            animate={{
              y: [0, -60, 0],
              opacity: [0.1, 0.7, 0.1],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {embers.map((e) => (
          <motion.div
            key={`ember-${e.id}`}
            className="absolute rounded-full"
            style={{
              left: e.left,
              bottom: -10,
              width: e.size,
              height: e.size,
              background:
                "radial-gradient(circle, #fff4c4 0%, #d4af37 50%, transparent 100%)",
              filter: "blur(0.5px)",
            }}
            animate={{
              y: [0, -800],
              opacity: [0, 0.8, 0],
              x: [0, e.id % 2 ? 25 : -25],
            }}
            transition={{
              duration: e.duration,
              delay: e.delay,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* ============ 2. HEADER TEXT ============ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: opened ? 0 : 1, y: opened ? -10 : 0 }}
        transition={{ duration: 1.5 }}
        className="relative z-10 mb-12"
      >
        <p className="text-[10px] tracking-[0.5em] text-[#d4af37] uppercase mb-2">
          Together with their families
        </p>
        <h1 className="font-script text-6xl md:text-8xl text-white drop-shadow-[0_4px_20px_rgba(212,175,55,0.4)]">
          {WEDDING.coupleOrder[0]}{" "}
          <span className="text-[#d4af37]">&amp;</span>{" "}
          {WEDDING.coupleOrder[1]}
        </h1>
      </motion.div>

      {/* ============ 3. ENVELOPE ASSEMBLY ============ */}
      <div className="relative z-10 w-full flex items-center justify-center">
        <motion.button
          type="button"
          onClick={handleOpen}
          whileHover={!opened ? { scale: 1.015, y: -2 } : {}}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative w-full max-w-sm md:max-w-md aspect-[3/2] outline-none cursor-pointer"
          style={{ perspective: "2200px" }}
          aria-label="Open invitation"
        >
          {/* GOLDEN LIGHT BLOOM — emanates from envelope when opened */}
          <AnimatePresence>
            {opened && (
              <motion.div
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: [0, 0.9, 0.6], scale: [0.4, 2.2, 2] }}
                transition={{
                  duration: 2.2,
                  delay: 1.1,
                  times: [0, 0.5, 1],
                  ease: "easeOut",
                }}
                className="absolute inset-0 pointer-events-none z-[5]"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(255,220,140,0.55) 0%, rgba(212,175,55,0.25) 30%, transparent 65%)",
                  filter: "blur(20px)",
                }}
              />
            )}
          </AnimatePresence>

          {/* INVITATION CARD — glides up smoothly, settles, breathes */}
          <AnimatePresence>
            {opened && (
              <motion.div
                initial={{ y: 30, opacity: 0, scale: 0.92 }}
                animate={{
                  y: [30, -180, -180],
                  opacity: [0, 1, 1],
                  scale: [0.92, 1, 1],
                }}
                transition={{
                  delay: 1.5,
                  duration: 2.4,
                  times: [0, 0.7, 1],
                  ease: [0.22, 1, 0.36, 1], // refined cubic-bezier (easeOutExpo-ish)
                }}
                className="absolute inset-0 flex items-center justify-center z-10"
              >
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 30px 60px rgba(0,0,0,0.55), 0 0 0 rgba(212,175,55,0)",
                      "0 35px 70px rgba(0,0,0,0.55), 0 0 50px rgba(212,175,55,0.35)",
                      "0 30px 60px rgba(0,0,0,0.55), 0 0 30px rgba(212,175,55,0.2)",
                    ],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 3.5,
                  }}
                  className="w-[94%] aspect-[3/2.5] bg-gradient-to-br from-[#fffdf7] via-[#fffdfa] to-[#faf3e3] rounded-sm border border-[#d4af37]/50 flex flex-col items-center justify-center p-8 text-[#1a1a1a] relative overflow-hidden"
                >
                  {/* Layered gold frames */}
                  <div className="absolute inset-3 border border-[#d4af37]/40" />
                  <div className="absolute inset-[14px] border-t border-b border-[#d4af37]/20" />

                  {/* Corner ornaments */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#b08d26]/60" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#b08d26]/60" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#b08d26]/60" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#b08d26]/60" />

                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.4, duration: 0.8 }}
                    className="font-script text-3xl md:text-4xl text-[#b08d26] relative"
                  >
                    You are invited
                  </motion.p>
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 2.8, duration: 0.7, ease: "easeOut" }}
                    className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent my-3 origin-center"
                  />
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3.0, duration: 0.6 }}
                    className="font-serif italic tracking-widest text-stone-500 text-[10px] uppercase"
                  >
                    To the Wedding of
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.2, duration: 0.7 }}
                    className="font-script text-4xl md:text-5xl text-[#b08d26] mt-1"
                  >
                    {WEDDING.coupleOrder[0]} &amp; {WEDDING.coupleOrder[1]}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3.5, duration: 0.6 }}
                    className="mt-4 w-full h-[1px] bg-stone-200"
                  />
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3.7, duration: 0.6 }}
                    className="mt-3 font-serif text-[11px] tracking-[0.3em] opacity-80 uppercase"
                  >
                    {WEDDING.dateLabel ?? "June 2026"}
                  </motion.p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ENVELOPE BODY */}
          <div className="absolute inset-0 z-20 rounded-sm bg-gradient-to-br from-[#1f1a14] via-[#1a1510] to-[#15110b] shadow-[0_40px_80px_rgba(0,0,0,0.8)] border border-[#d4af37]/25 overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background: `
                  linear-gradient(to top right, transparent 49.6%, rgba(212,175,55,0.18) 50%, transparent 50.4%),
                  linear-gradient(to top left, transparent 49.6%, rgba(212,175,55,0.18) 50%, transparent 50.4%)
                `,
              }}
            />
            {/* Subtle inner glow when opened */}
            <motion.div
              className="absolute inset-x-0 bottom-0 h-2/3"
              initial={{ opacity: 0 }}
              animate={{ opacity: opened ? 1 : 0 }}
              transition={{ delay: 1.2, duration: 1 }}
              style={{
                background:
                  "radial-gradient(ellipse at 50% 100%, rgba(255,220,140,0.45) 0%, transparent 70%)",
              }}
            />
            <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.7)]" />
          </div>

          {/* TOP FLAP — smoother easing */}
          <motion.div
            className="absolute left-0 right-0 top-0 z-30 origin-top"
            style={{ height: `${FLAP_PCT}%`, transformStyle: "preserve-3d" }}
            animate={{ rotateX: opened ? -172 : 0 }}
            transition={{
              duration: 1.4,
              ease: [0.65, 0, 0.35, 1],
              delay: 0.4,
            }}
          >
            <div
              className="w-full h-full bg-gradient-to-b from-[#262019] to-[#1a1510]"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                backfaceVisibility: "hidden",
                borderTop: "1px solid rgba(212,175,55,0.3)",
                boxShadow: "inset 0 0 40px rgba(0,0,0,0.6)",
              }}
            />
          </motion.div>

          {/* GOLD WAX SEAL — gentle lift instead of spin */}
          <AnimatePresence>
            {!opened ? (
              <motion.div
                initial={{ x: "-50%", y: "-50%", scale: 0, opacity: 0 }}
                animate={{ x: "-50%", y: "-50%", scale: 1, opacity: 1 }}
                exit={{
                  opacity: 0,
                  scale: 1.15,
                  y: "-65%",
                  transition: { duration: 0.5, ease: "easeOut" },
                }}
                transition={{ duration: 0.8, ease: "backOut" }}
                className="absolute left-1/2 z-40"
                style={{ top: `${SEAL_TOP_PCT}%` }}
              >
                <motion.div
                  animate={{
                    boxShadow: [
                      "inset 1px 1px 3px rgba(255,255,255,0.5), inset -4px -4px 10px #7a5210, 0 12px 25px rgba(0,0,0,0.6), 0 0 20px rgba(212,175,55,0.4)",
                      "inset 1px 1px 3px rgba(255,255,255,0.5), inset -4px -4px 10px #7a5210, 0 12px 25px rgba(0,0,0,0.6), 0 0 38px rgba(212,175,55,0.75)",
                      "inset 1px 1px 3px rgba(255,255,255,0.5), inset -4px -4px 10px #7a5210, 0 12px 25px rgba(0,0,0,0.6), 0 0 20px rgba(212,175,55,0.4)",
                    ],
                  }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                  className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center"
                  style={{
                    background:
                      "radial-gradient(circle at 35% 35%, #f1d592 0%, #d4af37 45%, #996515 100%)",
                    borderRadius: "54% 46% 51% 49% / 48% 52% 47% 53%",
                  }}
                >
                  <div className="w-[78%] h-[78%] rounded-full border border-[#7a5210]/40 flex items-center justify-center">
                    <span
                      className="font-serif font-bold text-2xl md:text-3xl text-[#4a3208]"
                      style={{ textShadow: "1px 1px 0px rgba(255,255,255,0.2)" }}
                    >
                      {WEDDING.monogram ?? "D&J"}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* ELEGANT RISING SPARKLES — replaces chaotic burst */}
          <AnimatePresence>
            {opened &&
              risingSparkles.map((s) => (
                <motion.div
                  key={`sparkle-${s.id}`}
                  className="absolute rounded-full z-[6] pointer-events-none"
                  style={{
                    width: s.size,
                    height: s.size,
                    left: s.left,
                    top: "60%",
                    background:
                      "radial-gradient(circle, #fff4c4 0%, #d4af37 60%, transparent 100%)",
                    boxShadow: "0 0 8px #d4af37, 0 0 16px rgba(212,175,55,0.6)",
                  }}
                  initial={{ opacity: 0, y: 0, scale: 0.5 }}
                  animate={{
                    y: [0, -260, -380],
                    x: [0, s.drift, s.drift * 1.4],
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.3, 0.6],
                  }}
                  transition={{
                    duration: s.duration,
                    delay: s.delay,
                    ease: "easeOut",
                  }}
                />
              ))}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* ============ 4. FOOTER HINT ============ */}
      <AnimatePresence>
        {!opened && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            className="mt-16 text-[10px] tracking-[0.5em] text-[#d4af37] uppercase"
          >
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              Tap the seal to open
            </motion.span>
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  );
}
