export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="space-y-2">
      <p className="font-tech text-[10px] uppercase tracking-[0.28em] text-secondary/60">{eyebrow}</p>
      <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface tracking-tight">{title}</h2>
      {subtitle && <p className="text-secondary/80 max-w-2xl">{subtitle}</p>}
    </div>
  );
}
