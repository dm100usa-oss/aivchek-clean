import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { analyze } from "@/lib/analyze";
import { generateReports } from "@/lib/pdf";
import { sendReportEmail } from "@/lib/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get("stripe-signature") as string;

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const url = (session.metadata?.url as string) || "";
      const mode = (session.metadata?.mode as "quick" | "pro") || "quick";
      const to = (session.customer_email as string) || "";

      if (url && to) {
        const analysis = await analyze(url, mode);
        const date = new Date().toISOString().split("T")[0];

        const { ownerBuffer, developerBuffer } = await generateReports(
          url,
          date,
          analysis
        );

        await sendReportEmail({
          to,
          url,
          mode,
          ownerBuffer,
          developerBuffer,
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 400 });
  }
}
