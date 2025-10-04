import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { generateReports } from "@/lib/pdf";
import { sendReportEmail } from "@/lib/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const sig = headers().get("stripe-signature") as string;

    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;
      const url = session.metadata.url;
      const mode = session.metadata.mode;
      const to = session.customer_details?.email;

      if (url && mode && to) {
        const analysis = { score: 75, checks: [] }; // заглушка
        const date = new Date().toISOString().split("T")[0];

        const { ownerBuffer, developerBuffer } = await generateReports(url, date, analysis);

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
