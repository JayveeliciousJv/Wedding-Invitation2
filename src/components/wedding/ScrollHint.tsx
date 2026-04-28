import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function ScrollHint() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Subtle nudge: scroll down 16px then back up after a short delay
    const t1 = setTimeout(() => {
      window.scrollTo({ top: 18, behavior: "smooth" });
    }, 1400);
    const t2 = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 2200);

    const onScroll = () => {
      if (window.scrollY > 60) setVisible(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.6 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-gold/80">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="text-gold"
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
