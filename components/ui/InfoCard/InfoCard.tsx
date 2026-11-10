export default function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/6 bg-white/2.5 p-4">
      <p className="text-[9px] uppercase tracking-[0.18em] text-foreground-muted">
        {label}
      </p>

      <p className="mt-2 text-sm leading-5 text-white/80">
        {value}
      </p>
    </div>
  );
}