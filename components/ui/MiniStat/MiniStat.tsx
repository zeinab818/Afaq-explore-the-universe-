export default function MiniStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/2 p-3">
      <p className="text-[8px] uppercase tracking-[0.15em] text-foreground-muted">
        {label}
      </p>

      <p className="mt-1 truncate text-xs text-white/70">
        {value}
      </p>
    </div>
  );
}
