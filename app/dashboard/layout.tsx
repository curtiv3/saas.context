import Link from "next/link";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 flex-col border-r border-slate-800 bg-slate-900/40 p-6 md:flex">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-sm font-bold">
              CF
            </div>
            <span className="text-lg font-semibold">ContextFlow</span>
          </div>
          <nav className="mt-10 flex flex-1 flex-col gap-4 text-sm">
            <Link className="rounded-lg bg-slate-800 px-3 py-2 text-white" href="/dashboard">
              Übersicht
            </Link>
            <Link className="rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800" href="/dashboard/workflows">
              Workflows
            </Link>
            <Link className="rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800" href="/">
              Landingpage
            </Link>
          </nav>
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 text-xs text-slate-300">
            <p className="font-semibold text-white">Pro Plan</p>
            <p className="mt-2">Verknüpfe Stripe, um Upgrades zu aktivieren.</p>
          </div>
        </aside>
        <div className="flex flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
            <div>
              <h1 className="text-lg font-semibold">Dashboard</h1>
              <p className="text-sm text-slate-400">Behalte deine AI-Runs im Blick.</p>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-300">
              <span className="rounded-full bg-slate-800 px-3 py-1">Signed in</span>
            </div>
          </header>
          <main className="flex-1 bg-slate-950 px-6 py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
