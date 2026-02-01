import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Webhook secret missing" }, { status: 400 });
  }

  const body = await request.text();
  const signature = headers().get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as { customer: string; customer_email?: string; subscription?: string };

    if (session.customer_email) {
      await prisma.subscription.create({
        data: {
          user: { connect: { email: session.customer_email } },
          stripeCustomerId: session.customer,
          stripeSubscriptionId: session.subscription ?? null,
          status: "active",
          plan: "pro"
        }
      });
    }
  }

  if (event.type === "customer.subscription.updated") {
    const subscription = event.data.object as {
      id: string;
      status: string;
      current_period_end?: number;
    };

    await prisma.subscription.updateMany({
      where: { stripeSubscriptionId: subscription.id },
      data: {
        status: subscription.status,
        currentPeriodEnd: subscription.current_period_end
          ? new Date(subscription.current_period_end * 1000)
          : null
      }
    });
  }

  return NextResponse.json({ received: true });
}
