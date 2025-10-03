// app/api/webhook/route.ts
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { sendReportEmail } from "@/lib/email";
import { generateReports } from "@/lib/pdf";
import { analyze } from "@/lib/analyze";
import type { Mode } from "@/lib/types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed.", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const url = session.metadata?.url as string;
      const email = session.customer_details?.email as string;
      const mode = (session.metadata?.mode as Mode) || "quick";

      const analysis = await analyze(url, mode);
      const date = new Date().toISOString().split("T")[0];

      const { ownerBuffer, developerBuffer } = await generateReports(
        url,
        date,
        analysis
      );

      // send both PDFs in one email
      await sendReportEmail({
        to: email,
        url,
        mode,
        ownerBuffer,
        developerBuffer,
      });
    } catch (error) {
      console.error("Error processing checkout.session.completed:", error);
      return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
