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

  return (
    <section className="section-dark relative min-h-screen w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 overflow-hidden grain">
      
      {/* ✨ GOLD SHIMMER BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        
        {/* Base gold gradient texture */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            background:
              "linear-gradient(120deg, #1a1a1a 30%, #3a2a00 45%, #d4af37 50%, #3a2a00 55%, #1a1a1a 70%)",
          }}
        />

        {/* Moving shimmer */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, transparent 40%, rgba(212,175,55,0.25) 50%, transparent 60%)",
            backgroundSize: "200% 200%",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%"],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Soft radial glow (your original, enhanced) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, color-mix(in oklab, var(--gold) 12%, transparent) 0%, transparent 60%)",
          }}
        />
      </div>

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

      {/* Envelope */}
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
          {/* Invitation card */}
          <AnimatePresence>
            {opened && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  initial={{ y: 40, opacity: 0, scale: 0.96 }}
                  animate={{ y: "-60%", opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.7,
                    duration: 1.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="w-[88%] aspect-[3/2.4] z-10 rounded-md bg-warm-white border border-gold/30 shadow-soft flex flex-col items-center justify-center px-6 text-center"
                  style={{ color: "var(--charcoal)" }}
                >
                  <p className="font-script text-2xl md:text-3xl text-gold">
                    You are invited
                  </p>
                  <div className="w-12 h-px bg-gold/50 my-2" />
                  <p className="font-serif text-base md:text-xl">
                    to the wedding of
                  </p>
                  <p className="font-script text-3xl md:text-4xl text-gold mt-1">
                    {WEDDING.coupleOrder[0]} &amp;{" "}
                    {WEDDING.coupleOrder[1]}
                  </p>
                  <p className="text-[10px] md:text-xs tracking-[0.3em] mt-3 uppercase opacity-70">
                    June 13, 2026 — 1:30 PM
                  </p>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Envelope body */}
          <div className="absolute inset-0 z-20 rounded-sm border border-white/10 shadow-soft pointer-events-none overflow-hidden bg-[var(--charcoal-2)]">
            <div className="absolute inset-0 bg-[linear-gradient(to_top_right,transparent_49.7%,rgba(255,255,255,0.05)_49.85%,rgba(255,255,255,0.05)_50.15%,transparent_50.3%),linear-gradient(to_top_left,transparent_49.7%,rgba(255,255,255,0.05)_49.85%,rgba(255,255,255,0.05)_50.15%,transparent_50.3%)]" />
            <div className="absolute left-0 right-0 bottom-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent" />
            <div className="absolute top-3 left-0 right-0 text-center">
              <p className="text-[9px] sm:text-[10px] tracking-[0.5em] text-gold/80 uppercase">
                Wedding Invitation
              </p>
            </div>
          </div>

          {/* Flap */}
          <motion.div
            className="absolute left-0 right-0 top-0 z-30 origin-top pointer-events-none"
            style={{ height: `${FLAP_PCT}%`, transformStyle: "preserve-3d" }}
            animate={{ rotateX: opened ? -178 : 0 }}
            transition={{
              duration: 1.2,
              ease: [0.7, 0, 0.3, 1],
              delay: opened ? 0.2 : 0,
            }}
          >
            <div className="w-full h-full bg-gradient-to-b from-[#6b6b6b] to-[#444] clip-triangle shadow-inner" />
          </motion.div>

          {/* Wax seal */}
          <AnimatePresence>
            {!opened && (
              <motion.div
                initial={{ x: "-50%", y: "-50%", scale: 0, opacity: 0 }}
                animate={{ x: "-50%", y: "-50%", scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="absolute left-1/2 z-40"
                style={{ top: `${SEAL_TOP_PCT}%` }}
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-200 via-yellow-500 to-yellow-800 shadow-xl flex items-center justify-center">
                  <span className="font-script text-3xl text-black">
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
          transition={{ delay: 1.2 }}
          className="relative z-10 mt-10 text-xs tracking-widest text-muted-soft uppercase animate-pulse"
        >
          Tap the envelope to open
        </motion.p>
      )}
    </section>
  );
}
