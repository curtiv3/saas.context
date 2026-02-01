import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
        <h2 className="text-2xl font-semibold text-white">Willkommen zurück{session?.user?.name ? `, ${session.user.name}` : ""}.</h2>
        <p className="mt-2 text-sm text-slate-300">
          Hier siehst du den Status deiner AI Workflows und den aktuellen Verbrauch.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { label: "Verbrauchte Tokens", value: "284k" },
            { label: "Aktive Workflows", value: "6" },
            { label: "Letzte Antwort", value: "vor 2 Min." }
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs uppercase text-slate-500">{stat.label}</p>
              <p className="mt-2 text-lg font-semibold text-white">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">Workflow Control Center</h3>
            <p className="mt-2 text-sm text-slate-300">
              Erstelle neue Workflows, teste Retrieval und analysiere Output.
            </p>
          </div>
          <Link className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700" href="/dashboard/workflows">
            Workflows öffnen
          </Link>
        </div>
      </section>
    </div>
  );
}
