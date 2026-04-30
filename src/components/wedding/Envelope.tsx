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

  // MORE elegant glitter particles (increased density)
  const glitterParticles = Array.from({ length: 90 }, (_, i) => ({
    id: i,
    left: `${5 + Math.random() * 90}%`,
    size: Math.random() > 0.6 ? 4 : Math.random() > 0.3 ? 3 : 2,
    duration: 2.2 + Math.random() * 1.8,
    delay: Math.random() * 1.2,
    drift: (Math.random() - 0.5) * 70,
    opacity: 0.5 + Math.random() * 0.4,
  }));

  return (
    <section className="section-dark relative min-h-screen w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 overflow-hidden grain">

      {/* Soft radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in oklab, var(--gold) 10%, transparent) 0%, transparent 65%)",
        }}
      />

      {/* Shimmer layer 1 (SLOWED + smoother) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(115deg, transparent 0%, transparent 42%, rgba(212,175,55,0.12) 50%, transparent 58%, transparent 100%)",
          backgroundSize: "300% 300%",
        }}
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
      />

      {/* Shimmer layer 2 (SLOWED MORE for depth) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(250deg, transparent 0%, transparent 38%, rgba(212,175,55,0.07) 50%, transparent 62%, transparent 100%)",
          backgroundSize: "300% 300%",
        }}
        animate={{ backgroundPosition: ["100% 100%", "0% 0%", "100% 100%"] }}
        transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
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
              duration: 6 + (i % 5),
              delay: i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Gold glitter burst (enhanced density + softer motion) */}
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
                  boxShadow:
                    p.id % 2 === 0
                      ? "0 0 6px 1px rgba(255,215,0,0.4)"
                      : "none",
                }}
                initial={{ y: 0, x: 0, opacity: p.opacity, scale: 1 }}
                animate={{
                  y: [0, -140 - Math.random() * 100, 320],
                  x: [0, p.drift, p.drift * 1.2],
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

      {/* (rest of your code stays EXACTLY the same below this point) */}
