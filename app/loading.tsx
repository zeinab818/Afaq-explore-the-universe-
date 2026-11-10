export default function Loading() {
  return (
    <main className="min-h-screen w-full animate-pulse bg-background text-foreground">
      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        
        {/* Ambient Glow */}
        <div className="absolute h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />

        {/* Planet */}
        <div className="relative flex flex-col items-center gap-10">
          <div className="h-72 w-72 rounded-full bg-muted/40 blur-[1px]" />

          {/* Planet Name */}
          <div className="h-10 w-48 rounded-full bg-muted/40" />

          {/* Description */}
          <div className="flex w-full max-w-xl flex-col items-center gap-3">
            <div className="h-4 w-full rounded-full bg-muted/30" />
            <div className="h-4 w-5/6 rounded-full bg-muted/30" />
            <div className="h-4 w-2/3 rounded-full bg-muted/30" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto grid max-w-6xl gap-4 px-6 pb-20 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-32 rounded-2xl border border-border/50 bg-card/30 p-5"
          >
            <div className="mb-4 h-4 w-20 rounded-full bg-muted/30" />
            <div className="h-8 w-28 rounded-full bg-muted/40" />
          </div>
        ))}
      </section>
    </main>
  );
}