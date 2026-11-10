
export default function Hotspot({
  className,
  title,
}: {
  className: string;
  title: string;
}) {
  return (
    <div className={`absolute ${className} group`}>
      <div className="relative flex h-8 w-8 items-center justify-center">
        <span className="absolute h-8 w-8 animate-ping rounded-full bg-white/20" />

        <span className="relative h-3 w-3 rounded-full border border-white bg-white/70" />
      </div>

      <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-black/80 px-3 py-2 text-[10px] uppercase tracking-wider opacity-0 backdrop-blur-md transition group-hover:opacity-100">
        {title}
      </div>
    </div>
  );
}
