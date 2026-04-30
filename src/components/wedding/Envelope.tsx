import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WEDDING } from "@/lib/wedding-config";

export default function Envelope({ onOpen }: { onOpen: () => void }) {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    // Callback triggers after the animation sequence finishes
    setTimeout(onOpen, 3200);
  };

  const FLAP_PCT = 55;
  const SEAL_TOP_PCT = FLAP_PCT;

  // Generate ambient glitter for the background
  const ambientGlitter = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${(i * 7.7) % 100}%`,
    top: `${(i * 13.3 + 5) % 100}%`,
    size: i % 5 === 0 ? 3 : 1.5,
    duration: 7 + (i % 5),
    delay: i * 0.2,
  }));

  // Generate burst particles
  const burstGlitter = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${20 + Math.random() * 60}%`,
    duration: 2 + Math.random() * 1.5,
    drift: (Math.random() - 0.5) * 180,
  }));

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-[#121212] grain">
      
      {/* 1. BACKGROUND EFFECTS (Slow & Elegant) */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: "linear-gradient(115deg, transparent 40%, #d4af37 50%, transparent 60%)",
            backgroundSize: "300% 300%",
          }}
          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
          transition={{ duration: 18, ease: "linear", repeat: Infinity }}
        />
        
        {ambientGlitter.map((p) => (
          <motion.div
            key={`ambient-${p.id}`}
            className="absolute rounded-full bg-[#d4af37]/40"
            style={{ width: p.size, height: p.size, left: p.left, top: p.top }}
            animate={{ y: [0, -40, 0], opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity }}
          />
        ))}
      </div>

      {/* 2. HEADER TEXT */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="relative z-10 mb-10"
      >
        <p className="text-[10px] tracking-[0.5em] text-[#d4af37] uppercase mb-2">Together with their families</p>
        <h1 className="font-script text-6xl md:text-8xl text-white">
          {WEDDING.coupleOrder[0]} <span className="text-[#d4af37]">&amp;</span> {WEDDING.coupleOrder[1]}
        </h1>
      </motion.div>

      {/* 3. ENVELOPE INTERACTION */}
      <div className="relative z-10 w-full flex items-center justify-center">
        <motion.button
          type="button"
          onClick={handleOpen}
          whileHover={!opened ? { scale: 1.02 } : {}}
          className="relative w-full max-w-sm md:max-w-md aspect-[3/2] outline-none"
          style={{ perspective: "2000px" }}
        >
          {/* THE INVITATION: Pops up, then settles midway */}
          <AnimatePresence>
            {opened && (
              <motion.div
                initial={{ y: 60, opacity: 0, scale: 0.9 }}
                animate={{ 
                  y: [60, -280, -100], // Shoots up high, then drops to center-ish
                  opacity: 1, 
                  scale: [0.9, 1.05, 1] 
                }}
                transition={{ 
                  delay: 0.9, 
                  duration: 2, 
                  times: [0, 0.4, 1], 
                  ease: "easeOut" 
                }}
                className="absolute inset-0 flex items-center justify-center z-10"
              >
                <div className="w-[92%] aspect-[3/2.5] bg-[#fffdfa] rounded shadow-2xl border border-[#d4af37]/20 flex flex-col items-center justify-center p-6 text-[#1a1a1a]">
                  <p className="font-script text-3xl text-[#b08d26]">You are invited</p>
                  <div className="w-12 h-[1px] bg-[#d4af37]/40 my-3" />
                  <p className="font-serif italic text-lg uppercase tracking-widest text-stone-500 text-[10px]">To the Wedding of</p>
                  <p className="font-script text-4xl text-[#b08d26] mt-1">
                    {WEDDING.coupleOrder[0]} &amp; {WEDDING.coupleOrder[1]}
                  </p>
                  <p className="mt-4 font-serif text-[11px] tracking-[0.2em] opacity-70">JUNE 13, 2026</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* THE ENVELOPE BODY (Solid Opaque) */}
          <div className="absolute inset-0 z-20 rounded-sm bg-[#222222] shadow-[0_30px_60px_rgba(0,0,0,0.7)] border border-white/5 overflow-hidden">
            {/* Solid Fold Seams */}
            <div className="absolute inset-0" style={{
              background: `
                linear-gradient(to top right, #222222 49.6%, rgba(255,255,255,0.04) 50%, #222222 50.4%),
                linear-gradient(to top left, #222222 49.6%, rgba(255,255,255,0.04) 50%, #222222 50.4%)
              `
            }} />
            <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]" />
          </div>

          {/* THE TOP FLAP */}
          <motion.div
            className="absolute left-0 right-0 top-0 z-30 origin-top"
            style={{ height: `${FLAP_PCT}%`, transformStyle: "preserve-3d" }}
            animate={{ rotateX: opened ? -170 : 0 }}
            transition={{ duration: 1.1, ease: "easeInOut", delay: 0.3 }}
          >
            <div 
              className="w-full h-full bg-[#2a2a2a] shadow-xl" 
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)", backfaceVisibility: "hidden" }} 
            />
          </motion.div>

          {/* THE GOLD WAX SEAL (Elegant D&J) */}
          <AnimatePresence>
            {!opened && (
              <motion.div
                initial={{ x: "-50%", y: "-50%", scale: 0 }}
                animate={{ x: "-50%", y: "-50%", scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.4 } }}
                className="absolute left-1/2 z-40"
                style={{ top: `${SEAL_TOP_PCT}%` }}
              >
                <div 
                  className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center transition-transform hover:scale-105"
                  style={{
                    background: "radial-gradient(circle at 35% 35%, #f1d592 0%, #d4af37 40%, #996515 100%)",
                    borderRadius: "53% 47% 52% 48% / 47% 53% 48% 52%", // Hand-pressed organic shape
                    boxShadow: "inset 1px 1px 3px rgba(255,255,255,0.5), inset -3px -3px 8px #7a5210, 0 10px 20px rgba(0,0,0,0.6)",
                  }}
                >
                  <div className="w-[78%] h-[78%] rounded-full border border-[#7a5210]/40 flex items-center justify-center">
                    <span 
                      className="font-serif font-bold text-2xl md:text-3xl text-[#4a3208]"
                      style={{ textShadow: "1px 1px 0px rgba(255,255,255,0.2), -0.5px -0.5px 0px rgba(0,0,0,0.3)" }}
                    >
                      D&J
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* BURST GLITTER PARTICLES (Triggers with pop) */}
          <AnimatePresence>
            {opened && burstGlitter.map((p) => (
              <motion.div
                key={`burst-${p.id}`}
                className="absolute rounded-full z-50 bg-[#d4af37]"
                style={{ width: 2.5, height: 2.5, left: p.left, top: "50%" }}
                initial={{ opacity: 1, scale: 1 }}
                animate={{ y: [0, -250, 400], x: [0, p.drift], opacity: [1, 1, 0] }}
                transition={{ duration: p.duration, ease: "easeOut", delay: 0.9 }}
              />
            ))}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* FOOTER INSTRUCTION */}
      {!opened && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 2 }}
          className="mt-16 text-[10px] tracking-[0.4em] text-[#d4af37] uppercase animate-pulse"
        >
          Tap the seal to open invitation
        </motion.p>
      )}
    </section>
  );
}
