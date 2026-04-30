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

      {/* Ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in oklab, var(--gold) 10%, transparent) 0%, transparent 65%)",
        }}
      />

      {/* ✨ SLOWER, more elegant shimmer layer 1 */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(115deg, transparent 0%, transparent 42%, rgba(212,175,55,0.10) 50%, transparent 58%, transparent 100%)",
          backgroundSize: "350% 350%",
          opacity: 0.7,
        }}
        animate={{
          backgroundPosition: ["0% 0%", "60% 60%", "0% 0%"],
        }}
        transition={{
          duration: 14,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      {/* ✨ SLOWER shimmer layer 2 (subtle counter drift) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(250deg, transparent 0%, transparent 40%, rgba(212,175,55,0.06) 50%, transparent 60%, transparent 100%)",
          backgroundSize: "350% 350%",
          opacity: 0.5,
        }}
        animate={{
          backgroundPosition: ["60% 60%", "0% 0%", "60% 60%"],
        }}
        transition={{
          duration: 20,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      {/* Floating ambient dots (unchanged) */}
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

      {/* Everything else unchanged below */}
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

      {/* The rest of your original component stays exactly the same */}
    </section>
  );
}
