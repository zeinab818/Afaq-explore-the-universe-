import type { ComponentType } from "react";

export default function AnatomyItem({
  number,
  title,
  text,
  icon: Icon,
}: {
  number: string;
  title: string;
  text: string;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <div className="group rounded-3xl border border-white/6 bg-white/2.5 p-5 transition duration-300 hover:border-white/13">
      <div className="flex w-full items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/8 bg-white/3">
          <Icon className="h-4 w-4 text-white/70" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <span className="text-[9px] tracking-[0.2em] text-foreground-muted">
              {number}
            </span>

            <h3 className="font-display text-lg">{title}</h3>
          </div>

          <p className="mt-2 text-xs leading-6 text-foreground-secondary">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
