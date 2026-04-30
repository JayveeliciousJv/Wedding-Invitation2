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
    <section className="section-dark relative min-h-screen w-full flex flex-col items-center justify-center text-center px-4 overflow-hidden">

      {/* ✨ PREMIUM GOLD SWEEP BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, rgba(212,175,55,0.06), transparent 40%),
              radial-gradient(circle at 80% 70%, rgba(212,175,55,0.05), transparent 50%),
              #1a1a1a
            `
          }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(
                120deg,
                transparent 20%,
                rgba(212,175,55,0.08) 40%,
                rgba(212,175,55,0.18) 50%,
                rgba(212,175,55,0.08) 60%,
                transparent 80%
              )
            `,
            backgroundSize: "200% 200%",
          }}
          animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 mb-10 max-w-xl"
      >
        <p className="text-xs tracking-[0.4em] text-gold uppercase mb-4">
          Together with their families
        </p>

        <h1 className="font-script text-6xl text-white">
          {WEDDING.coupleOrder[0]} <span className="text-gold">&amp;</span>{" "}
          {WEDDING.coupleOrder[1]}
        </h1>

        <p className="mt-3 text-sm text-secondary-soft tracking-wide">
          You are invited to celebrate with us
        </p>
      </motion.div>

      {/* Envelope */}
      <div className="relative z-10 w-full flex justify-center">
        <motion.button
          onClick={handleOpen}
          className="relative w-full max-w-md aspect-[3/2]"
          style={{ perspective: "1600px" }}
        >

          {/* Invitation card */}
          <AnimatePresence>
            {opened && (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: "-60%", opacity: 1 }}
                  transition={{ delay: 0.7, duration: 1.2 }}
                  className="w-[88%] aspect-[3/2.4] bg-white rounded-md shadow-xl flex flex-col items-center justify-center"
                >
                  <p className="font-script text-3xl text-gold">
                    You are invited
                  </p>
                  <p className="mt-2 text-lg">to the wedding of</p>
                  <p className="font-script text-4xl text-gold mt-2">
                    {WEDDING.coupleOrder[0]} &amp; {WEDDING.coupleOrder[1]}
                  </p>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Envelope body */}
          <div className="absolute inset-0 bg-[#2a2a2a] rounded-sm shadow-2xl" />

          {/* Flap */}
          <motion.div
            className="absolute top-0 left-0 right-0 origin-top"
            style={{
              height: `${FLAP_PCT}%`,
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              background:
                "linear-gradient(to bottom, #444, #222)"
            }}
            animate={{ rotateX: opened ? -178 : 0 }}
            transition={{ duration: 1.2 }}
          />

          {/* 🔴 REALISTIC WAX SEAL */}
          <AnimatePresence>
            {!opened && (
              <motion.div
                className="absolute left-1/2 z-40"
                style={{ top: `${SEAL_TOP_PCT}%` }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
              >
                <motion.div
                  className="relative w-24 h-24 flex items-center justify-center"
                  style={{
                    transform: "translate(-50%, -50%)",
                    clipPath:
                      "polygon(50% 0%, 90% 12%, 100% 50%, 88% 90%, 50% 100%, 12% 88%, 0% 50%, 10% 12%)",
                    background: `
                      radial-gradient(circle at 30% 25%, rgba(255,255,255,0.7), transparent 35%),
                      radial-gradient(circle at 70% 75%, rgba(0,0,0,0.4), transparent 60%),
                      radial-gradient(circle, #f5e6a6, #d4af37, #7a5a00)
                    `,
                    boxShadow:
                      "0 10px 20px rgba(0,0,0,0.5), inset 0 3px 6px rgba(255,255,255,0.4), inset 0 -5px 10px rgba(0,0,0,0.6)",
                  }}
                  animate={{
                    boxShadow: [
                      "0 0 18px rgba(212,175,55,0.4)",
                      "0 0 28px rgba(212,175,55,0.7)",
                      "0 0 18px rgba(212,175,55,0.4)"
                    ],
                    rotate: [0, 1, -1, 0]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* Monogram */}
                  <span
                    className="text-4xl font-script"
                    style={{
                      color: "#3a2b00",
                      textShadow:
                        "0 2px 2px rgba(255,255,255,0.5), 0 -2px 3px rgba(0,0,0,0.7)"
                    }}
                  >
                    {WEDDING.monogram}
                  </span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.button>
      </div>

      {!opened && (
        <p className="mt-10 text-xs tracking-[0.3em] text-muted-soft uppercase animate-pulse">
          Tap the envelope to open
        </p>
      )}
    </section>
  );
}
