
import {

  Circle,

} from "lucide-react";

export default function EvolutionItem({
  number,
  title,
  text,
  side,
  last = false,
}: {
  number: string;
  title: string;
  text: string;
  side: "left" | "right";
  last?: boolean;
}) {
  return (
    <div className="relative grid min-h-45 grid-cols-[42px_1fr] sm:grid-cols-2">
      <div
        className={`col-start-1 pl-12 sm:col-auto ${
          side === "right"
            ? "sm:col-start-2 sm:pl-20"
            : "sm:pr-20 sm:text-right"
        }`}
      >
        <span className="text-xs tracking-[0.3em] text-foreground-muted">
          {number}
        </span>

        <h3 className="mt-3 font-display text-2xl">
          {title}
        </h3>

        <p className="mt-4 text-sm leading-7 text-foreground-secondary">
          {text}
        </p>
      </div>

      {!last && (
        <div className="absolute left-3.25 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-background sm:left-1/2 sm:-translate-x-1/2">
          <Circle
            size={7}
            fill="currentColor"
            className="text-white/50"
          />
        </div>
      )}
    </div>
  );
}