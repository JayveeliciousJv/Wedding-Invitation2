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
    <section className="section-dark relative min-h-screen w-full flex flex-col items-center justify-center text-center px-4 overflow-hidden grain">

      {/* soft gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in oklab, var(--gold) 10%, transparent) 0%, transparent 65%)",
        }}
      />

      {/* shimmer (slow elegant) */}
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

      {/* shimmer 2 */}
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

      {/* glitter burst */}
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
                initial={{ y: 0, opacity: p.opacity, scale: 1 }}
                animate={{
                  y: [0, -140, 320],
                  x: [0, p.drift, p.drift * 1.2],
                  opacity: [p.opacity, p.opacity, 0],
                  scale: [1, 1.1, 0.3],
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

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 mb-10 max-w-xl"
      >
        <p className="text-[10px] tracking-[0.4em] text-gold uppercase mb-4">
          Together with their families
        </p>
        <h1 className="font-script text-5xl text-white">
          {WEDDING.coupleOrder[0]} <span className="text-gold">&</span>{" "}
          {WEDDING.coupleOrder[1]}
        </h1>
      </motion.div>

      {/* ENVELOPE */}
      <div className="relative z-10 w-full flex justify-center">
        <motion.button
          onClick={handleOpen}
          className="relative w-full max-w-md aspect-[3/2] rounded-sm"
          style={{ perspective: 1600 }}
        >

          {/* INNER LETTER */}
          <AnimatePresence>
            {opened && (
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: "-60%", opacity: 1 }}
                transition={{ duration: 1.2 }}
                className="absolute inset-0 flex items-center justify-center z-10"
              >
                <div className="w-[85%] h-[70%] bg-white rounded-md shadow-xl border border-gold/30 flex flex-col items-center justify-center text-center">
                  <p className="font-script text-2xl text-gold">You are invited</p>
                  <p className="text-sm mt-2">to the wedding of</p>
                  <p className="font-script text-3xl text-gold mt-1">
                    {WEDDING.coupleOrder[0]} & {WEDDING.coupleOrder[1]}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ENVELOPE BODY (RESTORED REAL FORM) */}
          <div
            className="absolute inset-0 z-20 overflow-hidden rounded-sm border border-white/10"
            style={{
              backgroundColor: "var(--charcoal-2)",
              boxShadow:
                "inset 0 0 50px rgba(0,0,0,0.6), 0 25px 50px rgba(0,0,0,0.5)",
            }}
          >
            {/* diagonal folds (IMPORTANT RESTORE) */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top right, transparent 49.7%, rgba(255,255,255,0.05) 50%, transparent 50.3%), linear-gradient(to top left, transparent 49.7%, rgba(255,255,255,0.05) 50%, transparent 50.3%)",
              }}
            />

            {/* bottom shading */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* FLAP (RESTORED VISUAL FORM) */}
          <motion.div
            className="absolute top-0 left-0 right-0 z-30 origin-top"
            style={{ height: `${FLAP_PCT}%` }}
            animate={{ rotateX: opened ? -178 : 0 }}
            transition={{ duration: 1.2 }}
          >
            <div
              className="w-full h-full"
              style={{
                background:
                  "linear-gradient(to bottom, #3a3a3a, #1f1f1f)",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "inset 0 -10px 20px rgba(0,0,0,0.5)",
              }}
            />
          </motion.div>

          {/* WAX SEAL (RESTORED VISIBILITY) */}
          {!opened && (
            <motion.div
              className="absolute left-1/2 z-40"
              style={{ top: `${SEAL_TOP_PCT}%`, transform: "translate(-50%, -50%)" }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  background:
                    "radial-gradient(circle, #ffd98a, #b8860b, #5c3a00)",
                  boxShadow: "0 0 20px rgba(255,215,0,0.5)",
                }}
              >
                <span className="text-xl font-script text-black">
                  {WEDDING.monogram}
                </span>
              </div>
            </motion.div>
          )}

        </motion.button>
      </div>
    </section>
  );
}
