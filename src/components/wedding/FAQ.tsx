import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { WEDDING } from "@/lib/wedding-config";

export function FAQ() {
  return (
    <section id="faq" className="section-light py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <SectionTitle eyebrow="Good to Know" title="Frequently Asked" />

        {/* Always-visible cards (no accordion) */}
        <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
          {WEDDING.faqs.map((f, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl bg-warm-white border border-border shadow-soft p-6 md:p-7 transition-all duration-300 hover:border-gold/60 hover-glow"
            >
              <div className="flex items-start gap-3">
                <span
                  className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center border border-gold/40 text-gold"
                  style={{ backgroundColor: "hsl(var(--gold) / 0.10)" }}
                  aria-hidden
                >
                  <HelpCircle size={16} />
                </span>
                <div className="flex-1">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2">
                    Question {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-serif text-base md:text-lg leading-snug text-foreground">
                    {f.q}
                  </h3>
                  <div className="h-px w-8 bg-gold/50 my-3" />
                  <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                    {f.a}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
