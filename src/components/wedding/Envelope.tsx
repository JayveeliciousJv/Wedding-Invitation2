import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WEDDING } from "@/lib/wedding-config";

export default function Envelope({ onOpen }: { onOpen: () => void }) {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    // Timing adjusted to match the "Pop and Settle" animation
    setTimeout(onOpen, 2800);
  };

  const FLAP_PCT = 55;
  const SEAL_TOP_PCT = FLAP_PCT;

  // Background Ambient Glitter (Subtle Twinkle)
  const ambientGlitter = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    left: `${(i * 7.7) % 100}%`,
    top: `${(i * 11.3 + 5) % 100}%`,
    size: i % 4 === 0 ? 3 : 1.5,
    duration: 6 + (i % 6),
    delay: i * 0.2,
  }));

  // Burst Glitter (When opened)
  const burstGlitter = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${15 + Math.random() * 70}%`,
    duration: 2 + Math.random() * 1.5,
    drift: (Math.random() - 0.5) * 150,
  }));

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-[#1a1a1a] grain">
      
      {/* 1. ELEGANT AMBIENT BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Slow Shimmer Glare 1 */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: "linear-gradient(115deg, transparent 40%, rgba(212,175,55,0.2) 50%, transparent 60%)",
            backgroundSize: "300% 300%",
          }}
          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
          transition={{ duration: 15, ease: "linear", repeat: Infinity }}
        />
        
        {/* Floating Ambient Dots */}
        {ambientGlitter.map((p) => (
          <motion.div
            key={`ambient-${p.id}`}
            className="absolute rounded-full bg-gold/60"
            style={{ width: p.size, height: p.size, left: p.left, top: p.top, boxShadow: "0 0 5px rgba(212,175,55,0.5)" }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2], scale: [1, 1.3, 1] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* 2. HEADING */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="relative z-10 mb-12 max-w-xl"
      >
        <p className="text-[10px] tracking-[0.4em] text-gold uppercase mb-3">Together with their families</p>
        <h1 className="font-script text-5xl sm:text-7xl text-white">
          {WEDDING.coupleOrder[0]} <span className="text-gold">&amp;</span> {WEDDING.coupleOrder[1]}
        </h1>
      </motion.div>

      {/* 3. ENVELOPE WRAPPER */}
      <div className="relative z-10 w-full flex items-center justify-center">
        <motion.button
          type="button"
          onClick={handleOpen}
          whileHover={!opened ? { scale: 1.02 } : undefined}
          className="relative w-full max-w-sm md:max-w-md aspect-[3/2] cursor-pointer outline-none"
          style={{ perspective: "1500px" }}
        >
          {/* INVITATION PAPER: Pop Up -> Top -> Settle Midway */}
          <AnimatePresence>
            {opened && (
              <motion.div
                initial={{ y: 50, opacity: 0, scale: 0.9 }}
                animate={{ 
                  y: [50, -250, -80], // Bottom -> Shoots to Top -> Settles midway
                  opacity: 1, 
                  scale: [0.9, 1.05, 1] 
                }}
                transition={{ 
                  delay: 0.8, 
                  duration: 1.8, 
                  times: [0, 0.4, 1], // Timing of the keyframes above
                  ease: "easeOut" 
                }}
                className="absolute inset-0 flex items-center justify-center z-10"
              >
                <div className="w-[90%] aspect-[3/2.4] rounded-md bg-[#fdfcf8] border border-gold/30 shadow-2xl flex flex-col items-center justify-center px-8 text-[#2a2a2a]">
                  <p className="font-script text-3xl text-gold">You are invited</p>
                  <div className="w-16 h-px bg-gold/40 my-3" />
                  <p className="font-serif text-lg italic">to the wedding of</p>
                  <p className="font-script text-4xl text-gold mt-2">
                    {WEDDING.coupleOrder[0]} &amp; {WEDDING.coupleOrder[1]}
                  </p>
                  <p className="text-[10px] tracking-[0.2em] mt-4 uppercase opacity-60">Save the Date — 2026</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* SOLID ENVELOPE BODY */}
          <div className="absolute inset-0 z-20 rounded-sm overflow-hidden bg-[#2a2a2a] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5">
            {/* Visual Fold Lines (Solid, not transparent) */}
            <div className="absolute inset-0" style={{
              background: `
                linear-gradient(to top right, #2a2a2a 49.5%, rgba(255,255,255,0.05) 50%, #2a2a2a 50.5%),
                linear-gradient(to top left, #2a2a2a 49.5%, rgba(255,255,255,0.05) 50%, #2a2a2a 50.5%)
              `
            }} />
            <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)]" />
          </div>

          {/* TOP FLAP */}
          <motion.div
            className="absolute left-0 right-0 top-0 z-30 origin-top"
            style={{ height: `${FLAP_PCT}%`, transformStyle: "preserve-3d" }}
            animate={{ rotateX: opened ? -170 : 0 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
          >
            <div 
              className="w-full h-full bg-[#333] shadow-lg" 
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)", backfaceVisibility: "hidden" }} 
            />
          </motion.div>

          {/* THE WAX SEAL */}
          <AnimatePresence>
            {!opened && (
              <motion.div
                initial={{ x: "-50%", y: "-50%", scale: 0 }}
                animate={{ x: "-50%", y: "-50%", scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
                className="absolute left-1/2 z-40"
                style={{ top: `${SEAL_TOP_PCT}%` }}
              >
                <div 
                  className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center"
                  style={{
                    background: "radial-gradient(circle at 30% 30%, #f1d592, #d4af37, #996515)",
                    borderRadius: "52% 48% 51% 49% / 49% 53% 47% 51%", // Organic shape
                    boxShadow: "inset 2px 2px 5px rgba(255,255,255,0.4), inset -5px -5px 10px #7a5210, 0 8px 20px rgba(0,0,0,0.6)",
                  }}
                >
                  <div className="w-[75%] h-[75%] rounded-full border border-[#7a5210]/30 flex items-center justify-center shadow-[inset_0_0_8px_rgba(0,0,0,0.3)]">
                    <span className="font-serif font-bold text-2xl md:text-3xl text-[#4a3208]" style={{ textShadow: "1px 1px 0px rgba(255,255,255,0.2)" }}>
                      D&J
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* BURST GLITTER ON OPEN */}
          <AnimatePresence>
            {opened && burstGlitter.map((p) => (
              <motion.div
                key={`burst-${p.id}`}
                className="absolute rounded-full z-50 bg-gold"
                style={{ width: 3, height: 3, left: p.left, top: "50%" }}
                initial={{ opacity: 1, scale: 1 }}
                animate={{ y: [0, -200, 300], x: [0, p.drift], opacity: [1, 1, 0], scale: [1, 1.5, 0] }}
                transition={{ duration: p.duration, ease: "easeOut", delay: 0.8 }}
              />
            ))}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* FOOTER HINT */}
      {!opened && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 2 }}
          className="mt-12 text-[10px] tracking-[0.4em] text-gold uppercase animate-pulse"
        >
          Tap the seal to open
        </motion.p>
      )}
    </section>
  );
}
