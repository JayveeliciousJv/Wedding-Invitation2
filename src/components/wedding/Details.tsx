import { motion } from "framer-motion";
import { CalendarHeart, Shirt, Palette } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { WEDDING } from "@/lib/wedding-config";

export function Details() {
  return (
    <section id="details" className="section-dark py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative">
        <SectionTitle eyebrow="The Celebration" title="Wedding Details" dark />
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {/* Date & Time */}
          <Card icon={<CalendarHeart size={26} className="text-gold" />} title="Date & Time">
            <p className="text-gold font-medium tracking-wide">{WEDDING.dateLabel}</p>
            <p className="mt-2 text-secondary-soft">Philippine Time</p>
          </Card>

          {/* Attire */}
          <Card icon={<Shirt size={26} className="text-gold" />} title={WEDDING.attire.title}>
            <p className="text-gold font-medium tracking-wide">{WEDDING.attire.detail}</p>
            <p className="mt-2 text-sm text-secondary-soft leading-relaxed">{WEDDING.attire.note}</p>
          </Card>

          {/* Motif */}
          <Card icon={<Palette size={26} className="text-gold" />} title="Motif">
            <p className="text-gold font-medium tracking-wide">Charcoal & Neutrals</p>
            <div className="flex justify-center gap-3 mt-4">
              {WEDDING.motif.map((c) => (
                <div key={c} className="flex flex-col items-center gap-1.5">
                  <span
                    className="w-8 h-8 rounded-full ring-1 ring-white/20"
                    style={{ backgroundColor: c }}
                    aria-label={c}
                  />
                  <span className="text-[9px] tracking-[0.15em] text-secondary-soft/80">{c}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Privacy note */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-14 max-w-2xl mx-auto text-center px-6 py-7 rounded-2xl border border-gold/30"
          style={{ backgroundColor: "color-mix(in oklab, var(--gold) 6%, transparent)" }}
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-3">A Quiet Celebration</p>
          <p className="font-serif italic text-base md:text-lg text-secondary-soft leading-relaxed">
            {WEDDING.privacy}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function Card({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl p-8 md:p-10 text-center border border-white/10 shadow-soft transition-all duration-300 hover-glow"
      style={{ backgroundColor: "var(--charcoal-2)" }}
    >
      <div
        className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-5 border border-gold/30"
        style={{ backgroundColor: "color-mix(in oklab, var(--gold) 12%, transparent)" }}
      >
        {icon}
      </div>
      <h3 className="font-serif text-2xl text-white">{title}</h3>
      <div className="h-px w-10 bg-gold/60 mx-auto my-4" />
      {children}
    </motion.div>
  );
}
