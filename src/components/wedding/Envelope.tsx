import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WEDDING } from "@/lib/wedding-config";

// Using Named Export to match your Index.tsx import { Envelope }
export function Envelope({ onOpen }: { onOpen: () => void }) {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    // Callback triggers after the pop-and-settle animation
    setTimeout(onOpen, 3200);
  };

  const FLAP_PCT = 55;
  const SEAL_TOP_PCT = FLAP_PCT;

  // Generate ambient glitter for the background
  const ambientGlitter = Array.from({ length: 45 }, (_, i) => ({
    id: i,
    left: `${(i * 7.7) % 100}%`,
    top: `${(i * 13.3 + 5) % 100}%`,
    size: i % 5 === 0 ? 3 : 1.5,
    duration: 8 + (i % 5),
    delay: i * 0.2,
  }));

  // Generate burst particles for the pop effect
  const burstGlitter = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${20 + Math.random() * 60}%`,
    duration: 2 + Math.random() * 1.5,
    drift: (Math.random() - 0.5) * 200,
  }));

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-[#121212] grain">
      
      {/* 1. ELEGANT BACKGROUND EFFECTS */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Very slow shimmer glare */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: "linear-gradient(115deg, transparent 40%, #d4af37 50%, transparent 60%)",
            backgroundSize: "300% 300%",
          }}
          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        />
        
        {/* Dense Ambient Glitter */}
        {ambientGlitter.map((p) => (
          <motion.div
            key={`ambient-${p.id}`}
            className="absolute rounded-full bg-[#d4af37]/50 shadow-[0_0_5px_#d4af37]"
            style={{ width: p.size, height: p.size, left: p.left, top: p.top }}
            animate={{ 
              y: [0, -60, 0], 
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.4, 1]
            }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* 2. HEADER TEXT */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="relative z-10 mb-12"
      >
        <p className="text-[10px] tracking-[0.5em] text-[#d4af37] uppercase mb-2">Together with their families</p>
        <h1 className="font-script text-6xl md:text-8xl text-white">
          {WEDDING.coupleOrder[0]} <span className="text-[#d4af37]">&amp;</span> {WEDDING.coupleOrder[1]}
        </h1>
      </motion.div>

      {/* 3. ENVELOPE ASSEMBLY */}
      <div className="relative z-10 w-full flex items-center justify-center">
        <motion.button
          type="button"
          onClick={handleOpen}
          whileHover={!opened ? { scale: 1.02 } : {}}
          className="relative w-full max-w-sm md:max-w-md aspect-[3/2] outline-none"
          style={{ perspective: "2000px" }}
        >
          {/* INVITATION: Pop-up -> Shoot to Top -> Settle Midway */}
          <AnimatePresence>
            {opened && (
              <motion.div
                initial={{ y: 60, opacity: 0, scale: 0.9 }}
                animate={{ 
                  y: [60, -300, -110], // Burst out, high past the flap, settle in view
                  opacity: 1, 
                  scale: [0.9, 1.08, 1] 
                }}
                transition={{ 
                  delay: 0.9, 
                  duration: 2.2, 
                  times: [0, 0.45, 1], 
                  ease: "easeOut" 
                }}
                className="absolute inset-0 flex items-center justify-center z-10"
              >
                <div className="w-[94%] aspect-[3/2.5] bg-[#fffdfa] rounded shadow-2xl border border-[#d4af37]/30 flex flex-col items-center justify-center p-8 text-[#1a1a1a]">
                  <p className="font-script text-3xl text-[#b08d26]">You are invited</p>
                  <div className="w-16 h-[1px] bg-[#d4af37]/40 my-3" />
                  <p className="font-serif italic text-lg tracking-widest text-stone-500 text-[10px] uppercase">To the Wedding of</p>
                  <p className="font-script text-4xl text-[#b08d26] mt-1">
                    {WEDDING.coupleOrder[0]} &amp; {WEDDING.coupleOrder[1]}
                  </p>
                  <div className="mt-4 w-full h-[1px] bg-stone-100" />
                  <p className="mt-3 font-serif text-[11px] tracking-[0.3em] opacity-80 uppercase">June 2026</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ENVELOPE BODY (Solid & Opaque) */}
          <div className="absolute inset-0 z-20 rounded-sm bg-[#222222] shadow-[0_40px_80px_rgba(0,0,0,0.8)] border border-white/5 overflow-hidden">
            {/* Solid Seams */}
            <div className="absolute inset-0" style={{
              background: `
                linear-gradient(to top right, #222222 49.7%, rgba(255,255,255,0.06) 50%, #222222 50.3%),
                linear-gradient(to top left, #222222 49.7%, rgba(255,255,255,0.06) 50%, #222222 50.3%)
              `
            }} />
            {/* Depth Vignette */}
            <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.6)]" />
          </div>

          {/* TOP FLAP */}
          <motion.div
            className="absolute left-0 right-0 top-0 z-30 origin-top"
            style={{ height: `${FLAP_PCT}%`, transformStyle: "preserve-3d" }}
            animate={{ rotateX: opened ? -170 : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
          >
            <div 
              className="w-full h-full bg-[#2a2a2a] shadow-2xl" 
              style={{ 
                clipPath: "polygon(0 0, 100% 0, 50% 100%)", 
                backfaceVisibility: "hidden",
                borderTop: "1px solid rgba(255,255,255,0.05)"
              }} 
            />
          </motion.div>

          {/* THE GOLD WAX SEAL (Elegant D&J) */}
          <AnimatePresence>
            {!opened && (
              <motion.div
                initial={{ x: "-50%", y: "-50%", scale: 0, rotate: -15 }}
                animate={{ x: "-50%", y: "-50%", scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.7, rotate: 10, transition: { duration: 0.4 } }}
                className="absolute left-1/2 z-40"
                style={{ top: `${SEAL_TOP_PCT}%` }}
              >
                <div 
                  className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center"
                  style={{
                    background: "radial-gradient(circle at 35% 35%, #f1d592 0%, #d4af37 45%, #996515 100%)",
                    borderRadius: "54% 46% 51% 49% / 48% 52% 47% 53%", // Organic irregular shape
                    boxShadow: "inset 1px 1px 3px rgba(255,255,255,0.5), inset -4px -4px 10px #7a5210, 0 12px 25px rgba(0,0,0,0.6)",
                  }}
                >
                  <div className="w-[78%] h-[78%] rounded-full border border-[#7a5210]/40 flex items-center justify-center">
                    <span 
                      className="font-serif font-bold text-2xl md:text-3xl text-[#4a3208]"
                      style={{ textShadow: "1px 1px 0px rgba(255,255,255,0.2)" }}
                    >
                      D&J
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* BURST GLITTER (Syncs with invitation pop) */}
          <AnimatePresence>
            {opened && burstGlitter.map((p) => (
              <motion.div
                key={`burst-${p.id}`}
                className="absolute rounded-full z-50 bg-[#d4af37]"
                style={{ width: 2.5, height: 2.5, left: p.left, top: "50%", boxShadow: "0 0 4px #ffd700" }}
                initial={{ opacity: 1, scale: 1 }}
                animate={{ 
                  y: [0, -280, 450], 
                  x: [0, p.drift], 
                  opacity: [1, 1, 0],
                  scale: [1, 1.5, 0]
                }}
                transition={{ duration: p.duration, ease: "easeOut", delay: 1.0 }}
              />
            ))}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* 4. FOOTER HINT */}
      {!opened && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 2.2 }}
          className="mt-16 text-[10px] tracking-[0.5em] text-[#d4af37] uppercase animate-pulse"
        >
          Tap the seal to open
        </motion.p>
      )}
    </section>
  );
}
