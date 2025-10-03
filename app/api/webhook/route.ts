// app/api/webhook/route.ts
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { sendReportEmail } from "@/lib/email";
import { generateReports } from "@/lib/pdf";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
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
    console.error("Webhook signature verification failed:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const customerEmail = session.customer_details?.email;
    const url = session.metadata?.url || "";
    const mode = session.metadata?.mode || "quick";

    if (!customerEmail || !url) {
      return NextResponse.json({ received: true });
    }

    // Only for Pro mode we send PDF reports
    if (mode === "pro") {
      try {
        const { ownerBuffer, developerBuffer } = await generateReports(url, mode);

        await sendReportEmail({
          to: customerEmail,
          url,
          mode,
          ownerBuffer,
          developerBuffer,
        });
      } catch (err) {
        console.error("Report generation or email send failed:", err);
      }
    }
  }

  return NextResponse.json({ received: true });
}
