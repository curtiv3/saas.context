import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const mockKnowledgeBase = [
  {
    id: "kb-1",
    topic: "Onboarding",
    content: "ContextFlow nutzt RAG, um kontextbezogene Antworten aus deinen Daten zu erstellen."
  },
  {
    id: "kb-2",
    topic: "Billing",
    content: "Pro-Pläne werden über Stripe Checkout aktiviert und sind sofort verfügbar."
  },
  {
    id: "kb-3",
    topic: "Workflows",
    content: "Workflows bestehen aus Prompt, Retrieval Query und Output-Tracking."
  }
];

export async function POST(request: Request) {
  const body = await request.json();
  const { input, workflowId } = body as { input?: string; workflowId?: string };

  if (!input) {
    return NextResponse.json({ error: "Input required" }, { status: 400 });
  }

  const workflow = workflowId
    ? await prisma.aIWorkflow.findUnique({ where: { id: workflowId } })
    : null;

  const retrieval = mockKnowledgeBase.find((entry) =>
    input.toLowerCase().includes(entry.topic.toLowerCase())
  );

  const systemPrompt = `Du bist der ContextFlow AI Agent. Verwende die Retrieval-Daten, wenn vorhanden.`;
  const userPrompt = `User Input: ${input}

Retrieval Context: ${retrieval?.content ?? "Kein Kontext gefunden."}

Workflow Prompt: ${workflow?.prompt ?? "Kein Workflow."}`;

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({
      answer: `Mock-Antwort (kein API-Key gesetzt). Kontext: ${retrieval?.content ?? "n/a"}`
    });
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.2
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json({ error: errorText }, { status: response.status });
  }

  const data = await response.json();
  const answer = data.choices?.[0]?.message?.content ?? "Keine Antwort.";

  return NextResponse.json({ answer });
}
