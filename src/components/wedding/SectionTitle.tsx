export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
}) {
  return (
    <div className="text-center mb-12 md:mb-16">
      {eyebrow && (
        <p className="text-xs tracking-[0.4em] uppercase text-gold mb-3">{eyebrow}</p>
      )}
      <h2 className={`font-script text-5xl md:text-6xl ${dark ? "text-white" : ""}`}>
        {title}
      </h2>
      <div className="flex items-center justify-center gap-3 mt-4">
        <span className="h-px w-10 bg-gold/60" />
        <span className="w-1.5 h-1.5 rounded-full bg-gold" />
        <span className="h-px w-10 bg-gold/60" />
      </div>
      {subtitle && (
        <p className={`mt-4 max-w-xl mx-auto ${dark ? "text-secondary-soft" : "text-muted-foreground"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
