export default function PlanetStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="bg-background/60 p-6 backdrop-blur-xl transition-colors duration-300 hover:bg-white/4">
      <p className="text-xs uppercase tracking-[0.18em] text-foreground-muted">
        {label}
      </p>

      <p className="mt-3 wrap-break-word font-display text-xl font-medium md:text-2xl">
        {value}
      </p>
    </div>
  );
}