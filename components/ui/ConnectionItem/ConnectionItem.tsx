export default function ConnectionItem({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/8 bg-white/3">
        <Icon className="h-4 w-4" aria-hidden={true} />
      </div>

      <div>
        <p className="text-sm font-medium">{title}</p>

        <p className="mt-1 text-xs leading-5 text-foreground-muted">{text}</p>
      </div>
    </div>
  );
}
