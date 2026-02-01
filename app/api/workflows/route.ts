import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const workflows = await prisma.aIWorkflow.findMany({
    where: { user: { email: session.user.email } },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json({ workflows });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, description, prompt } = body as {
    name?: string;
    description?: string;
    prompt?: string;
  };

  if (!name || !prompt) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const workflow = await prisma.aIWorkflow.create({
    data: {
      name,
      description: description ?? "",
      prompt,
      status: "active",
      user: { connect: { email: session.user.email } }
    }
  });

  return NextResponse.json({ workflow });
}
