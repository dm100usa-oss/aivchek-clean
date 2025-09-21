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

      const email = session.customer_email || session.metadata?.email || "";
      const url = session.metadata?.url || "";
      const mode = session.metadata?.mode || "";

      if (email) {
        const subject = "AI Website Visibility Report";
        const text = `Hello,
Attached is your full AI Website Visibility Report in PDF format.
It includes a short summary for the site owner and a detailed checklist for the developer.
If for any reason you are not currently in contact with a developer, our team can help quickly improve your website’s visibility in AI tools.
Contact: support@aisignalpro.com
Best regards,
AI Signal Pro Team`;

        await sendReportEmail(email, subject, text);
      }

      console.log("✅ Email sent after payment:", { email, url, mode });
    }
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    console.error("Webhook handler failed:", err);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
