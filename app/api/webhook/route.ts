// app/api/webhook/route.ts
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { analyze } from "@/lib/analyze";
import { sendReportEmail } from "@/lib/email";
import { generateReports } from "@/lib/pdf";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const url = session.metadata?.url || "";
    const mode = (session.metadata?.mode as "quick" | "pro") || "quick";
    const to = session.customer_details?.email || "";

    if (url && to) {
      try {
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
          attachments: [
            { filename: "Owner_Report.pdf", content: ownerBuffer },
            { filename: "Developer_Report.pdf", content: developerBuffer },
          ],
        });

        console.log("Webhook: reports generated and sent.");
      } catch (err) {
        console.error("Webhook processing error:", err);
      }
    }
  }

  return NextResponse.json({ received: true });
}
