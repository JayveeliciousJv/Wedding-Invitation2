import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, X, ChevronRight } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { WEDDING } from "@/lib/wedding-config";

export function Entourage() {
  const [open, setOpen] = useState(false);
  const e = WEDDING.entourage;

  return (
    <section id="entourage" className="section-light py-20 md:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <SectionTitle eyebrow="With Us" title="Wedding Party" />
        <p className="text-muted-foreground max-w-xl mx-auto -mt-4 mb-10">
          A heartfelt thank you to those standing beside us on our special day.
        </p>

        {/* Clickable preview card — clearly inviting a tap */}
        <motion.button
          type="button"
          onClick={() => setOpen(true)}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.98 }}
          className="group relative w-full max-w-md mx-auto rounded-2xl bg-warm-white border border-gold/40 shadow-soft p-7 sm:p-8 text-left cursor-pointer transition-all duration-300 hover:border-gold hover:shadow-glow-gold pulse-gold"
          aria-label="Open the full wedding party list"
        >
          <div className="flex items-center gap-4">
            <span
              className="w-12 h-12 rounded-full flex items-center justify-center border border-gold/50 text-gold shrink-0"
              style={{ backgroundColor: "hsl(var(--gold) / 0.12)" }}
            >
              <Users size={20} />
            </span>
            <div className="flex-1">
              <p className="text-[10px] tracking-[0.35em] uppercase text-gold">
                Our Beloved Entourage
              </p>
              <h3 className="font-serif text-xl mt-1">View Wedding Party</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Parents · Sponsors · Bridal Party · Bearers
              </p>
            </div>
            <ChevronRight
              size={22}
              className="text-gold transition-transform duration-300 group-hover:translate-x-1"
            />
          </div>
          <span className="block mt-5 text-center text-[10px] tracking-[0.4em] uppercase text-gold/80">
            Tap to view ↓
          </span>
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 backdrop-blur-sm"
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
              className="relative w-full max-w-lg sm:max-w-xl rounded-2xl bg-warm-white border border-gold/30 shadow-soft max-h-[88vh] flex flex-col"
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

              <div className="overflow-y-auto px-6 py-8 space-y-10 text-center">
                {/* Invocation */}
                <p className="font-serif italic text-sm md:text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
                  {e.invocation}
                </p>

                {/* Parents */}
                <Group title="Our Parents">
                  <SubGroup label="Parents of the Groom" names={e.parents.groom} />
                  <SubGroup label="Parents of the Bride" names={e.parents.bride} />
                </Group>

                {/* Principal Sponsors */}
                <Group title={e.principalSponsorsHeading}>
                  <SubGroup names={e.principalSponsors} />
                </Group>

                {/* Wedding Party */}
                <Group title={e.weddingPartyHeading}>
                  <SubGroup label="Best Man" names={[e.bestMan]} />
                  <SubGroup label="Maid of Honor" names={[e.maidOfHonor]} />
                  <SubGroup label="Matron of Honor" names={[e.matronOfHonor]} />
                </Group>

                {/* Bridal Entourage */}
                <Group title={e.bridalEntourageHeading}>
                  <SubGroup label="Groomsmen" names={e.groomsmen} />
                  <SubGroup label="Bridesmaids" names={e.bridesmaids} />
                  <SubGroup label="Little Groomsmen" names={e.littleGroomsmen} />
                  <SubGroup label="Little Bridesmaids" names={e.littleBridesmaids} />
                </Group>

                {/* Secondary Sponsors */}
                <Group title={e.secondarySponsorsHeading}>
                  <SubGroup
                    label={`Candle — ${e.secondarySponsors.candle.intent}`}
                    names={e.secondarySponsors.candle.names}
                  />
                  <SubGroup
                    label={`Veil — ${e.secondarySponsors.veil.intent}`}
                    names={e.secondarySponsors.veil.names}
                  />
                  <SubGroup
                    label={`Cord — ${e.secondarySponsors.cord.intent}`}
                    names={e.secondarySponsors.cord.names}
                  />
                </Group>

                {/* Bearers */}
                <Group title={e.bearersHeading}>
                  <SubGroup label="Bible Bearer" names={[e.bibleBearer]} />
                  <SubGroup label="Coin Bearer" names={[e.coinBearer]} />
                  <SubGroup label="Ring Bearer" names={[e.ringBearer]} />
                </Group>

                {/* Flower Girls */}
                <Group title={e.flowerGirlsHeading}>
                  <SubGroup label="Flower Girls" names={e.flowerGirls} />
                </Group>

                {/* Offertory */}
                <Group title={e.offertoryHeading}>
                  {e.offertory.map((o) => (
                    <SubGroup key={o.gift} label={o.gift} names={[o.name]} />
                  ))}
                </Group>

                {/* Officiant */}
                <Group title="To be solemnized by">
                  <p className="font-serif text-base md:text-lg text-foreground">
                    {WEDDING.officiant}
                  </p>
                </Group>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] tracking-[0.4em] uppercase text-gold">{title}</p>
      <div className="h-px w-10 bg-gold/50 mx-auto my-3" />
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function SubGroup({ label, names }: { label?: string; names: string[] }) {
  return (
    <div>
      {label && (
        <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
          {label}
        </p>
      )}
      {names.map((n, i) => (
        <p key={i} className="font-serif text-base md:text-lg text-foreground">
          {n}
        </p>
      ))}
    </div>
  );
}
