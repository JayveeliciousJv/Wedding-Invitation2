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

  // Generate glitter particles once
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
    <section className="section-dark relative min-h-screen w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 overflow-hidden grain">

      {/* Original radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in oklab, var(--gold) 12%, transparent) 0%, transparent 60%)",
        }}
      />

      {/* Shimmer layer 1 */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(115deg, transparent 0%, transparent 40%, rgba(212,175,55,0.15) 50%, transparent 60%, transparent 100%)",
          backgroundSize: "300% 300%",
        }}
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
      />

      {/* Shimmer layer 2 */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(250deg, transparent 0%, transparent 35%, rgba(212,175,55,0.08) 50%, transparent 65%, transparent 100%)",
          backgroundSize: "300% 300%",
        }}
        animate={{ backgroundPosition: ["100% 100%", "0% 0%", "100% 100%"] }}
        transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
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

      {/* Gold glitter burst — only after envelope opens */}
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
          {WEDDING.coupleOrder[0]}{" "}
          <span className="text-gold">&amp;</span>{" "}
          {WEDDING.coupleOrder[1]}
        </h1>
        <p className="mt-3 text-sm md:text-base text-secondary-soft tracking-wide">
          You are invited to celebrate with us
        </p>
      </motion.div>

      {/* Envelope wrapper */}
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
          {/* Paper invitation — slides up on open */}
          <AnimatePresence>
            {opened && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  initial={{ y: 40, opacity: 0, scale: 0.96 }}
                  animate={{ y: "-60%", opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="w-[88%] aspect-[3/2.4] z-10 rounded-md bg-warm-white border border-gold/30 shadow-soft flex flex-col items-center justify-center px-6 text-center"
                  style={{ color: "var(--charcoal)" }}
                >
                  <p className="font-script text-2xl md:text-3xl text-gold">You are invited</p>
                  <div className="w-12 h-px bg-gold/50 my-2" />
                  <p className="font-serif text-base md:text-xl">to the wedding of</p>
                  <p className="font-script text-3xl md:text-4xl text-gold mt-1">
                    {WEDDING.coupleOrder[0]} &amp; {WEDDING.coupleOrder[1]}
                  </p>
                  <p className="text-[10px] md:text-xs tracking-[0.3em] mt-3 uppercase opacity-70">
                    June 13, 2026 — 1:30 PM
                  </p>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Envelope body */}
          <div
            className="absolute inset-0 z-20 rounded-sm border border-white/10 shadow-soft pointer-events-none overflow-hidden"
            style={{
              backgroundColor: "var(--charcoal-2)",
              boxShadow:
                "inset 0 0 40px rgba(0,0,0,0.45), 0 20px 40px -20px rgba(0,0,0,0.6)",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top right, transparent 49.7%, rgba(255,255,255,0.05) 49.85%, rgba(255,255,255,0.05) 50.15%, transparent 50.3%), linear-gradient(to top left, transparent 49.7%, rgba(255,255,255,0.05) 49.85%, rgba(255,255,255,0.05) 50.15%, transparent 50.3%)",
              }}
            />
            <div
              className="absolute left-0 right-0 bottom-0 h-1/2"
              style={{
                background: "linear-gradient(to top, rgba(0,0,0,0.18), transparent)",
              }}
            />
            <div className="absolute top-3 left-0 right-0 text-center">
              <p className="text-[9px] sm:text-[10px] tracking-[0.5em] text-gold/80 uppercase">
                Wedding Invitation
              </p>
            </div>
          </div>

          {/* Triangular top flap */}
          <motion.div
            className="absolute left-0 right-0 top-0 z-30 origin-top pointer-events-none"
            style={{
              height: `${FLAP_PCT}%`,
              transformStyle: "preserve-3d",
            }}
            initial={false}
            animate={{ rotateX: opened ? -178 : 0 }}
            transition={{
              duration: 1.2,
              ease: [0.7, 0, 0.3, 1],
              delay: opened ? 0.2 : 0,
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background:
                  "linear-gradient(to bottom, oklch(0.50 0.001 60), oklch(0.40 0.001 60))",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                backfaceVisibility: "hidden",
                boxShadow: "inset 0 -12px 25px -10px rgba(0,0,0,0.55)",
                borderTop: "1px solid rgba(255,255,255,0.08)",
              }}
            />
          </motion.div>

          {/* Wax seal */}
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
                    boxShadow: [
                      "0 0 28px hsl(var(--gold) / 0.55)",
                      "inset 0 3px 6px rgba(255,240,180,0.55)",
                      "inset 0 -5px 10px rgba(60,40,5,0.55)",
                      "0 6px 14px rgba(0,0,0,0.45)",
                    ].join(", "),
                    border: "1.5px solid hsl(43 69% 25%)",
                  }}
                >
                  <div
                    className="absolute inset-[10%] rounded-full pointer-events-none"
                    style={{
                      border: "1px solid rgba(255,235,170,0.45)",
                      boxShadow: "inset 0 0 8px rgba(0,0,0,0.25)",
                    }}
                  />
                  <div
                    className="absolute top-[10%] left-[18%] w-[35%] h-[22%] rounded-full pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, rgba(255,255,255,0.55), transparent 70%)",
                      filter: "blur(1px)",
                    }}
                  />
                  <span
                    className="relative grid place-items-center font-script text-2xl sm:text-3xl md:text-4xl leading-none w-full h-full text-center"
                    style={{
                      color: "hsl(43 76% 13%)",
                      textShadow:
                        "0 1px 0 rgba(255,235,170,0.6), 0 -1px 1px rgba(0,0,0,0.4)",
                    }}
                  >
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
          transition={{ delay: 1.2, duration: 0.8 }}
          className="relative z-10 mt-10 text-[10px] sm:text-xs tracking-[0.3em] text-muted-soft uppercase animate-pulse"
        >
          Tap the envelope to open
        </motion.p>
      )}
    </section>
  );
}
