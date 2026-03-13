export default function StudioLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 z-50 h-16 glass" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        {/* Header skeleton */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-surface2 animate-pulse" />
          <div>
            <div className="h-7 w-48 bg-surface2 rounded animate-pulse mb-1" />
            <div className="h-4 w-32 bg-surface2 rounded animate-pulse" />
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_350px] gap-6">
          {/* Canvas skeleton */}
          <div className="space-y-4">
            <div className="w-full aspect-video rounded-2xl bg-surface2 animate-pulse" />
            <div className="h-16 rounded-2xl bg-surface2/50 animate-pulse" />
            <div className="h-20 rounded-xl bg-surface2/50 animate-pulse" />
          </div>

          {/* Sidebar skeleton */}
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="glass rounded-2xl p-4 border border-border/50">
                <div className="h-5 w-32 bg-surface2 rounded animate-pulse mb-4" />
                <div className="grid grid-cols-2 gap-3">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div key={j} className="aspect-square rounded-xl bg-surface2 animate-pulse" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
