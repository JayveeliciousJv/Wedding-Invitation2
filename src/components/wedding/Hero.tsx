import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { WEDDING } from "@/lib/wedding-config";
import { Countdown } from "./Countdown";

export function Hero() {
  return (
    <section
      id="home"
      className="section-dark relative min-h-screen flex items-center justify-center text-center pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden vignette"
    >
      <img
        src={heroImg}
        alt="Floral wedding ceremony aisle with candlelight"
        width={1920}
        height={1280}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(20,20,20,0.62)" }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1 }}
        className="relative z-10 max-w-3xl mx-auto text-white flex flex-col items-center"
      >
        <p className="text-[10px] sm:text-xs tracking-[0.5em] uppercase text-gold mb-5">
          We're getting married
        </p>
        <h1 className="font-script text-6xl sm:text-7xl md:text-8xl leading-[0.95]">
          {WEDDING.coupleOrder[0]}
          <span className="block text-gold text-3xl sm:text-5xl md:text-6xl my-1 sm:my-2">&amp;</span>
          {WEDDING.coupleOrder[1]}
        </h1>

        <div className="mt-6 flex items-center justify-center gap-3 sm:gap-4 text-[10px] sm:text-xs tracking-[0.3em] uppercase text-secondary-soft">
          <span className="h-px w-10 sm:w-16 bg-gold/70" />
          <span>{WEDDING.dateLabel}</span>
          <span className="h-px w-10 sm:w-16 bg-gold/70" />
        </div>
        <p className="mt-2 text-[10px] sm:text-xs tracking-[0.3em] uppercase text-secondary-soft/80">
          Philippine Time
        </p>

        <p className="mt-6 italic font-serif text-base sm:text-lg text-secondary-soft max-w-md leading-relaxed">
          “{WEDDING.quote}”
        </p>
        <p className="mt-2 text-[10px] sm:text-xs tracking-[0.3em] uppercase text-gold/80">
          — {WEDDING.quoteRef}
        </p>

        <a
          href="#rsvp"
          className="inline-block mt-9 px-10 py-4 bg-gold rounded-full font-medium tracking-[0.25em] text-xs uppercase shadow-soft transition-all duration-300 hover:bg-gold-hover hover-glow"
          style={{ color: "#1a1a1a" }}
        >
          RSVP Now
        </a>

        <div className="mt-12">
          <Countdown date={WEDDING.date} />
        </div>
      </motion.div>

      {/* Subtle scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.2, duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-secondary-soft"
        aria-hidden
      >
        <span className="text-[9px] tracking-[0.4em] uppercase">Scroll</span>
        <ChevronDown size={18} className="text-gold/80" />
      </motion.div>
    </section>
  );
}
