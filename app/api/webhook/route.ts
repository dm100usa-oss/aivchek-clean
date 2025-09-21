// app/api/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { sendReportEmail } from "../../../lib/email"; 
import { generatePDFBuffer } from "../../../lib/pdf"; // создадим позже

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return NextResponse.json({ received: true }, { status: 200 });
  }

  const raw = await req.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(raw, sig, webhookSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed.", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const url = session.metadata?.url || "";
      const mode = session.metadata?.mode || "";
      const email = session.customer_email || session.metadata?.email || "";

      console.log("✅ Checkout completed:", { id: session.id, url, mode, email });

      if (email) {
        // 1. Генерация PDF
        const pdfBuffer = await generatePDFBuffer(url, mode);

        // 2. Отправка письма
        await sendReportEmail(
          email,
          "AI Website Visibility Report",
          "Hello,\nAttached is your full AI Website Visibility Report in PDF format.",
          pdfBuffer
        );
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    console.error("Webhook handler failed:", err);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
