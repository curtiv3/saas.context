import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, description, prompt, status } = body as {
    name?: string;
    description?: string;
    prompt?: string;
    status?: string;
  };

  const workflow = await prisma.aIWorkflow.update({
    where: { id: params.id },
    data: {
      name,
      description,
      prompt,
      status
    }
  });

  return NextResponse.json({ workflow });
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.aIWorkflow.delete({
    where: { id: params.id }
  });

  return NextResponse.json({ success: true });
}
