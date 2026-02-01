"use client";

import { useEffect, useMemo, useState } from "react";

interface Workflow {
  id: string;
  name: string;
  description: string;
  prompt: string;
  status: string;
}

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [prompt, setPrompt] = useState("");
  const [selected, setSelected] = useState<Workflow | null>(null);
  const [testInput, setTestInput] = useState("");
  const [testOutput, setTestOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(() => name.trim() && prompt.trim(), [name, prompt]);

  const loadWorkflows = async () => {
    const response = await fetch("/api/workflows");
    const data = await response.json();
    setWorkflows(data.workflows ?? []);
  };

  useEffect(() => {
    loadWorkflows();
  }, []);

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    const response = await fetch("/api/workflows", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, prompt })
    });

    if (response.ok) {
      setName("");
      setDescription("");
      setPrompt("");
      await loadWorkflows();
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    await fetch(`/api/workflows/${id}`, { method: "DELETE" });
    await loadWorkflows();
    setLoading(false);
  };

  const handleSelect = (workflow: Workflow) => {
    setSelected(workflow);
    setTestOutput(null);
  };

  const handleUpdate = async () => {
    if (!selected) return;
    setLoading(true);
    await fetch(`/api/workflows/${selected.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: selected.name,
        description: selected.description,
        prompt: selected.prompt,
        status: selected.status
      })
    });
    await loadWorkflows();
    setLoading(false);
  };

  const handleTest = async () => {
    if (!selected) return;
    setLoading(true);
    const response = await fetch("/api/ai/process", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: testInput, workflowId: selected.id })
    });
    const data = await response.json();
    setTestOutput(data.answer ?? "Keine Antwort");
    setLoading(false);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="text-xl font-semibold text-white">Workflows verwalten</h2>
        <p className="mt-2 text-sm text-slate-300">Erstelle neue Prozesse und passe sie live an.</p>
        <form className="mt-6 space-y-4" onSubmit={handleCreate}>
          <input
            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-sm text-white"
            placeholder="Workflow-Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-sm text-white"
            placeholder="Kurzbeschreibung"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <textarea
            className="min-h-[120px] w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-sm text-white"
            placeholder="Prompt"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
          />
          <button
            type="submit"
            disabled={!canSubmit || loading}
            className="w-full rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-700"
          >
            Workflow speichern
          </button>
        </form>
        <div className="mt-8 space-y-3">
          {workflows.map((workflow) => (
            <button
              key={workflow.id}
              onClick={() => handleSelect(workflow)}
              className={`w-full rounded-2xl border px-4 py-3 text-left text-sm transition ${
                selected?.id === workflow.id
                  ? "border-brand-600 bg-brand-600/10"
                  : "border-slate-800 bg-slate-950 hover:border-slate-600"
              }`}
            >
              <p className="font-semibold text-white">{workflow.name}</p>
              <p className="mt-1 text-xs text-slate-400">{workflow.description || "Keine Beschreibung"}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="text-xl font-semibold text-white">Workflow Studio</h2>
        <p className="mt-2 text-sm text-slate-300">Teste Retrieval und bearbeite Details.</p>

        {selected ? (
          <div className="mt-6 space-y-4">
            <input
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-sm text-white"
              value={selected.name}
              onChange={(event) => setSelected({ ...selected, name: event.target.value })}
            />
            <input
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-sm text-white"
              value={selected.description}
              onChange={(event) => setSelected({ ...selected, description: event.target.value })}
            />
            <textarea
              className="min-h-[140px] w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-sm text-white"
              value={selected.prompt}
              onChange={(event) => setSelected({ ...selected, prompt: event.target.value })}
            />
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleUpdate}
                disabled={loading}
                className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600 disabled:bg-slate-700"
              >
                Update speichern
              </button>
              <button
                type="button"
                onClick={() => handleDelete(selected.id)}
                disabled={loading}
                className="rounded-full border border-red-500 px-4 py-2 text-sm font-semibold text-red-200 hover:bg-red-500/10 disabled:border-slate-700 disabled:text-slate-500"
              >
                Löschen
              </button>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-xs uppercase text-slate-500">RAG Test</p>
              <textarea
                className="mt-3 min-h-[100px] w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-sm text-white"
                placeholder="Teste deinen Prompt mit Sample Input"
                value={testInput}
                onChange={(event) => setTestInput(event.target.value)}
              />
              <button
                type="button"
                onClick={handleTest}
                disabled={loading}
                className="mt-3 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:bg-slate-700"
              >
                Test starten
              </button>
              {testOutput && (
                <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-4 text-sm text-slate-200">
                  {testOutput}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-700 p-8 text-center text-sm text-slate-400">
            Wähle links einen Workflow aus oder erstelle einen neuen.
          </div>
        )}
      </section>
    </div>
  );
}
