import { WEDDING } from "@/lib/wedding-config";

export function Footer() {
  return (
    <footer className="section-dark py-16 px-4 text-center relative overflow-hidden border-t border-white/5">
      <div className="divider-gold w-32 mx-auto mb-8" />
      <p className="font-script text-5xl text-gold">
        {WEDDING.coupleOrder[0]} &amp; {WEDDING.coupleOrder[1]}
      </p>
      <p className="text-xs tracking-[0.4em] uppercase mt-3 text-secondary-soft">
        {WEDDING.dateLabel}
      </p>
      <p className="text-xs italic font-serif mt-6 text-secondary-soft max-w-md mx-auto">
        “{WEDDING.quote}”
      </p>
      <p className="text-[10px] tracking-[0.3em] uppercase mt-2 text-gold/70">
        — {WEDDING.quoteRef}
      </p>
    </footer>
  );
}
