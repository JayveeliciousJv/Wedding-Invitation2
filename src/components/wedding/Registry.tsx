import { motion } from "framer-motion";
import { Gift, Camera, ChevronRight } from "lucide-react";
import { WEDDING } from "@/lib/wedding-config";

export function Registry() {
  return (
    <section id="registry" className="section-dark py-20 md:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8">
        <Block
          icon={<Gift size={26} className="text-gold" />}
          eyebrow="Wedding Registry"
          title="A Gift of Love"
          body={WEDDING.registry}
          href="#rsvp"
          cta="Confirm Your Presence"
        />
        <Block
          icon={<Camera size={26} className="text-gold" />}
          eyebrow="Unplugged Ceremony"
          title="Be Fully Present"
          body={WEDDING.unplugged}
          href="#venue"
          cta="See Venue Details"
        />
      </div>
    </section>
  );
}

function Block({
  icon,
  eyebrow,
  title,
  body,
  href,
  cta,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  cta: string;
}) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -4 }}
      className="group block rounded-2xl p-8 md:p-10 text-center border border-gold/30 shadow-soft hover-glow transition-all duration-300 cursor-pointer hover:border-gold"
      style={{ backgroundColor: "hsl(var(--charcoal-2))" }}
    >
      <div
        className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-5 border border-gold/30"
        style={{ backgroundColor: "hsl(var(--gold) / 0.12)" }}
      >
        {icon}
      </div>
      <p className="text-[10px] tracking-[0.4em] uppercase text-gold">{eyebrow}</p>
      <h3 className="font-serif text-2xl md:text-3xl text-white mt-2">{title}</h3>
      <div className="h-px w-10 bg-gold/60 mx-auto my-4" />
      <p className="text-secondary-soft leading-relaxed font-serif italic">{body}</p>

      <span className="inline-flex items-center gap-2 mt-6 text-[10px] tracking-[0.35em] uppercase text-gold transition-all duration-300 group-hover:gap-3">
        {cta}
        <ChevronRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </motion.a>
  );
}
