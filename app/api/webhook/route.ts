// app/api/webhook/route.ts
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { sendReportEmail } from "@/lib/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export const runtime = "nodejs";

export async function POST(req: Request) {
  const sig = headers().get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: "Missing signature or secret" }, { status: 400 });
  }

  const rawBody = await req.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: any) {
    console.error("Invalid signature", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    console.log("Payment received:", session.id);

    const email = session.customer_details?.email || session.metadata?.email;
    const url = session.metadata?.url || "";
    const mode = session.metadata?.mode || "";

    if (email) {
      const subject = "AI Website Visibility Report";
      const text = `Hello,

Attached is your full AI Website Visibility Report in PDF format.
It includes a short summary for the site owner and a detailed checklist for the developer.

If for any reason you are not currently in contact with a developer, our team can help quickly improve your website’s visibility in AI tools.

Contact: support@aisignalmax.com

Best regards,
AI Signal Max Team`;

      await sendReportEmail(email, subject, text);
      console.log("Email sent:", { email, url, mode });
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
