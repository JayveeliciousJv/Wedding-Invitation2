import { SectionTitle } from "./SectionTitle";
import { WEDDING } from "@/lib/wedding-config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  return (
    <section id="faq" className="section-light py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <SectionTitle eyebrow="Good to Know" title="Frequently Asked" />
        <Accordion type="single" collapsible className="w-full space-y-3">
          {WEDDING.faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="rounded-2xl bg-warm-white border border-border shadow-soft px-5 md:px-6 transition-all duration-300 hover:border-gold/50"
            >
              <AccordionTrigger className="font-serif text-base md:text-lg text-left hover:no-underline py-5">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
