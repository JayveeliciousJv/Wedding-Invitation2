import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, X } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { WEDDING } from "@/lib/wedding-config";

export function Entourage() {
  const [open, setOpen] = useState(false);
  const e = WEDDING.entourage;

  const groups: { title: string; items: { label?: string; names: string[] }[] }[] = [
    {
      title: "Parents",
      items: [
        { label: "Parents of the Bride", names: e.parents.bride },
        { label: "Parents of the Groom", names: e.parents.groom },
      ],
    },
    { title: "Principal Sponsors", items: [{ names: e.principalSponsors }] },
    {
      title: "Secondary Sponsors",
      items: [
        { label: "Candle", names: e.secondarySponsors.candle },
        { label: "Veil", names: e.secondarySponsors.veil },
        { label: "Cord", names: e.secondarySponsors.cord },
      ],
    },
    {
      title: "Wedding Party",
      items: [
        { label: "Best Man", names: [e.bestMan] },
        { label: "Maid of Honor", names: [e.maidOfHonor] },
        { label: "Groomsmen", names: e.groomsmen },
        { label: "Bridesmaids", names: e.bridesmaids },
      ],
    },
    {
      title: "Bearers",
      items: [
        { label: "Ring Bearer", names: [e.ringBearer] },
        { label: "Bible Bearer", names: [e.bibleBearer] },
        { label: "Coin Bearer", names: [e.coinBearer] },
        { label: "Flower Girls", names: e.flowerGirls },
      ],
    },
  ];

  return (
    <section id="entourage" className="section-light py-20 md:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <SectionTitle eyebrow="With Us" title="Wedding Party" />
        <p className="text-muted-foreground max-w-xl mx-auto -mt-4 mb-8">
          A heartfelt thank you to those standing beside us on our special day.
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 px-8 py-4 border border-gold rounded-full font-medium tracking-[0.25em] text-xs uppercase text-gold hover:bg-gold hover:text-[#1a1a1a] hover-glow transition-all duration-300"
        >
          <Users size={16} /> View Wedding Party
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] backdrop-blur-sm"
              style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              role="dialog"
              aria-modal="true"
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-[min(560px,calc(100%-2rem))] z-[61] rounded-2xl bg-warm-white border border-gold/30 shadow-soft max-h-[85vh] flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <p className="font-script text-3xl text-gold">
                  {WEDDING.coupleOrder[0]} &amp; {WEDDING.coupleOrder[1]}
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="p-2 text-muted-foreground hover:text-gold transition-colors"
                >
                  <X size={22} />
                </button>
              </div>
              <div className="overflow-y-auto px-6 py-6 space-y-8 text-center">
                {groups.map((g) => (
                  <div key={g.title}>
                    <p className="text-[10px] tracking-[0.4em] uppercase text-gold">{g.title}</p>
                    <div className="h-px w-10 bg-gold/50 mx-auto my-3" />
                    <div className="space-y-3">
                      {g.items.map((it, idx) => (
                        <div key={idx}>
                          {it.label && (
                            <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                              {it.label}
                            </p>
                          )}
                          {it.names.map((n, ni) => (
                            <p key={ni} className="font-serif text-base md:text-lg text-foreground">
                              {n}
                            </p>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
