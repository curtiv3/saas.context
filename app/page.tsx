import Link from "next/link";

const pricing = [
  {
    name: "Starter",
    price: "€29",
    description: "Perfekt für kleine Teams, die RAG testen.",
    features: ["1 Workspace", "2 Workflows", "E-Mail Support"]
  },
  {
    name: "Pro",
    price: "€99",
    description: "Für Teams, die produktiv skalieren.",
    features: [
      "Unbegrenzte Workflows",
      "Priorisierter Support",
      "Automatische Retrieval-Pipelines"
    ]
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-lg font-bold">
              CF
            </div>
            <span className="text-lg font-semibold">ContextFlow</span>
          </div>
          <div className="hidden items-center gap-8 text-sm font-medium text-slate-200 md:flex">
            <a className="hover:text-white" href="#pricing">Pricing</a>
            <a className="hover:text-white" href="#features">Features</a>
            <Link className="rounded-full border border-slate-700 px-4 py-2 hover:border-slate-500" href="/api/auth/signin">
              Google Login
            </Link>
            <Link className="rounded-full border border-slate-700 px-4 py-2 hover:border-slate-500" href="/dashboard">
              Dashboard
            </Link>
          </div>
          <Link className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 md:hidden" href="/dashboard">
            Start
          </Link>
        </nav>
      </header>

      <main>
        <section className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-20 lg:flex-row lg:items-center">
          <div className="flex-1 space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">RAG SaaS MVP</p>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              Kontextualisiere deine AI-Workflows in Minuten.
            </h1>
            <p className="text-lg text-slate-300">
              ContextFlow verbindet Retrieval, Workflow-Automation und Usage Tracking in einer einzigen Plattform.
              Verbinde deine Datenquellen, teste Prompts und bringe Teams schneller in die Produktion.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700" href="/dashboard">
                Jetzt starten
              </Link>
              <Link className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 hover:border-slate-500" href="/api/auth/signin">
                Google Login
              </Link>
              <a className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 hover:border-slate-500" href="#pricing">
                Preise ansehen
              </a>
            </div>
          </div>
          <div className="flex-1 rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
            <div className="space-y-6">
              <div className="rounded-2xl bg-slate-950 p-6">
                <p className="text-sm text-slate-400">Letzter Workflow-Run</p>
                <p className="mt-2 text-2xl font-semibold text-white">"Customer Insight Extractor"</p>
                <p className="mt-3 text-sm text-emerald-400">Erfolg · 98% Relevanz</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { label: "Workflows", value: "12 aktiv" },
                  { label: "Team-Mitglieder", value: "7" },
                  { label: "Monatliche Tokens", value: "1.3M" },
                  { label: "Integrationen", value: "8" }
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                    <p className="text-xs uppercase text-slate-500">{stat.label}</p>
                    <p className="mt-2 text-lg font-semibold text-white">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "RAG Engine",
                text: "Simuliere Retrieval, speichere Kontext und optimiere Antworten automatisch."
              },
              {
                title: "Workflow Builder",
                text: "Erstelle, teste und deploye neue Workflows direkt im Dashboard."
              },
              {
                title: "Billing Ready",
                text: "Stripe-Integration inklusive Checkout und Webhooks für Pro-Pläne."
              }
            ].map((card) => (
              <div key={card.title} className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
                <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-sm text-slate-300">{card.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-brand-600">Pricing</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Transparent & skalierbar</h2>
            </div>
            <span className="text-sm text-slate-400">Jeder Plan enthält den RAG-Kern.</span>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {pricing.map((plan) => (
              <div key={plan.name} className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                  <span className="text-2xl font-semibold text-white">{plan.price}</span>
                </div>
                <p className="mt-3 text-sm text-slate-300">{plan.description}</p>
                <ul className="mt-6 space-y-2 text-sm text-slate-200">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  className="mt-8 inline-flex w-full items-center justify-center rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-white hover:border-slate-500"
                  href="/dashboard"
                >
                  {plan.name === "Pro" ? "Pro aktivieren" : "Starter testen"}
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-slate-400">© 2024 ContextFlow. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-slate-400">
            <a className="hover:text-white" href="#features">Features</a>
            <a className="hover:text-white" href="#pricing">Pricing</a>
            <Link className="hover:text-white" href="/dashboard">Dashboard</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
