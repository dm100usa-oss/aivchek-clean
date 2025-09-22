// app/api/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { sendReportEmail } from "../../../lib/email";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2023-10-16",
  });

  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !webhookSecret) {
    return NextResponse.json({ received: true }, { status: 400 });
  }

  let rawBody: string;
  try {
    rawBody = await req.text();
  } catch (err) {
    console.error("Failed to read raw body", err);
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: any) {
    console.error("Stripe signature verification failed", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    try {
      const session = event.data.object as Stripe.Checkout.Session;

      const email = session.customer_email || session.metadata?.email || "";
      const url = session.metadata?.url || "";
      const mode = session.metadata?.mode || "";

      if (email) {
        const subject = "AI Website Visibility Report";
        const text = `Hello,
Here is your report.
URL: ${url}
Mode: ${mode}`;

        await sendReportEmail(email, subject, text);
      }

      console.log("Email sent after payment", { email, url, mode });
    } catch (err) {
      console.error("Error in processing event", err);
      return NextResponse.json({ error: "Webhook handler processing error" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

export async function GET() {
  return NextResponse.json({ status: "Webhook endpoint ready" }, { status: 200 });
}
