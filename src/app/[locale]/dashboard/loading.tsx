export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar skeleton */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16 glass" />

      <div className="flex">
        {/* Sidebar skeleton */}
        <aside className="hidden lg:block w-64 min-h-screen glass border-r border-border/50 pt-20 px-4">
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-10 rounded-xl bg-surface2 animate-pulse" />
            ))}
          </div>
        </aside>

        <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          {/* Welcome skeleton */}
          <div className="mb-8">
            <div className="h-8 w-64 bg-surface2 rounded-lg animate-pulse mb-2" />
            <div className="h-4 w-48 bg-surface2 rounded animate-pulse" />
          </div>

          {/* Stats skeleton */}
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="glass rounded-2xl p-6 border border-border/50">
                <div className="h-4 w-24 bg-surface2 rounded animate-pulse mb-3" />
                <div className="h-8 w-16 bg-surface2 rounded animate-pulse" />
              </div>
            ))}
          </div>

          {/* CTA skeleton */}
          <div className="rounded-2xl p-8 bg-surface/30 border border-border/50 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-surface2 animate-pulse" />
              <div>
                <div className="h-6 w-40 bg-surface2 rounded animate-pulse mb-2" />
                <div className="h-4 w-56 bg-surface2 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
