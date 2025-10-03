import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { sendReportEmail } from "@/lib/email";
import { generateReports } from "@/lib/pdf";
import { analyze } from "@/lib/analyze";
import { Mode } from "@/lib/types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET as string);
  } catch (err: any) {
    console.error("Webhook signature error:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const url = session.metadata?.url as string;
    const mode = session.metadata?.mode as Mode;
    const to = session.customer_details?.email as string;

    try {
      const analysis = await analyze(url, mode);
      const date = new Date().toISOString().split("T")[0];

      const { ownerBuffer, developerBuffer } = await generateReports(url, date, analysis);

      await sendReportEmail({ to, url, mode, ownerBuffer, developerBuffer });
    } catch (err) {
      console.error("Webhook processing failed:", err);
    }
  }

  return NextResponse.json({ received: true });
}
