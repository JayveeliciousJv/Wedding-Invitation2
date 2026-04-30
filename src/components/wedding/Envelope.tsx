{/* Shimmer layer 1 */}
<motion.div
  className="absolute inset-0 pointer-events-none"
  style={{
    background:
      "linear-gradient(115deg, transparent 0%, transparent 40%, rgba(212,175,55,0.15) 50%, transparent 60%, transparent 100%)",
    backgroundSize: "300% 300%",
  }}
  animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
  transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
/>

{/* Shimmer layer 2 */}
<motion.div
  className="absolute inset-0 pointer-events-none"
  style={{
    background:
      "linear-gradient(250deg, transparent 0%, transparent 35%, rgba(212,175,55,0.08) 50%, transparent 65%, transparent 100%)",
    backgroundSize: "300% 300%",
  }}
  animate={{ backgroundPosition: ["100% 100%", "0% 0%", "100% 100%"] }}
  transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
/>
