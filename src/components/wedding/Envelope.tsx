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

  return (
    <section className="section-dark relative min-h-screen w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 overflow-hidden grain">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in oklab, var(--gold) 12%, transparent) 0%, transparent 60%)",
        }}
      />

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
          {WEDDING.coupleOrder[0]} <span className="text-gold">&amp;</span> {WEDDING.coupleOrder[1]}
        </h1>
        <p className="mt-3 text-sm md:text-base text-secondary-soft tracking-wide">
          You are invited to celebrate with us
        </p>
      </motion.div>

      {/* Envelope wrapper — keeps perfect centering on all sizes */}
      <div className="relative z-10 flex items-center justify-center w-full">
        <div
          className="relative w-[300px] h-[200px] sm:w-[400px] sm:h-[266px] md:w-[480px] md:h-[320px]"
          style={{ perspective: "1600px" }}
        >
          {/* Paper invitation — slides upward from inside the envelope */}
          <AnimatePresence>
            {opened && (
              <motion.div
                initial={{ y: "10%", opacity: 0, scale: 0.96 }}
                animate={{ y: "-72%", opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[88%] h-[125%] z-10 rounded-md bg-warm-white border border-gold/30 shadow-soft flex flex-col items-center justify-center px-6 text-center"
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
            )}
          </AnimatePresence>

          {/* Envelope body (rectangular base) */}
          <div
            className="absolute inset-0 z-20 rounded-sm border border-white/10 shadow-soft pointer-events-none overflow-hidden"
            style={{
              backgroundColor: "var(--charcoal-2)",
              boxShadow:
                "inset 0 0 40px rgba(0,0,0,0.45), 0 20px 40px -20px rgba(0,0,0,0.6)",
            }}
          >
            {/* Subtle V fold lines from bottom corners to center-top (where flap meets) */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top right, transparent 49.7%, rgba(255,255,255,0.05) 49.85%, rgba(255,255,255,0.05) 50.15%, transparent 50.3%), linear-gradient(to top left, transparent 49.7%, rgba(255,255,255,0.05) 49.85%, rgba(255,255,255,0.05) 50.15%, transparent 50.3%)",
              }}
            />
            {/* Bottom shadow */}
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

          {/* Triangular top flap — rotates open from top edge */}
          <motion.div
            className="absolute left-0 right-0 top-0 z-30 origin-top pointer-events-none"
            style={{ height: "55%", transformStyle: "preserve-3d" }}
            initial={false}
            animate={{ rotateX: opened ? -178 : 0 }}
            transition={{ duration: 1.2, ease: [0.7, 0, 0.3, 1], delay: opened ? 0.2 : 0 }}
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

          {/* Emblem — perfectly centered horizontally, vertically at flap closure (where flap meets body = 55% from top) */}
          <AnimatePresence>
            {!opened && (
              <motion.button
                onClick={handleOpen}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 z-40 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center cursor-pointer"
                style={{
                  background:
                    "radial-gradient(circle at 35% 30%, oklch(0.82 0.13 82), var(--gold) 60%, var(--gold-hover))",
                  boxShadow:
                    "0 0 28px color-mix(in oklab, var(--gold) 55%, transparent), inset 0 2px 6px rgba(255,255,255,0.4), inset 0 -4px 8px rgba(0,0,0,0.3)",
                  border: "1px solid color-mix(in oklab, var(--gold) 70%, black)",
                }}
                aria-label="Open invitation"
              >
                <span className="font-script text-xl sm:text-2xl md:text-3xl text-white drop-shadow-md">
                  {WEDDING.monogram}
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {!opened && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="relative z-10 mt-10 text-[10px] sm:text-xs tracking-[0.3em] text-muted-soft uppercase animate-pulse"
        >
          Tap to open
        </motion.p>
      )}
    </section>
  );
}
