// app/api/webhook/route.ts
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { sendReportEmail } from "@/lib/email";
import { generateReports } from "@/lib/pdf";
import { PDFData } from "@/lib/types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

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
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const url = session.metadata?.url || "";
    const mode = (session.metadata?.mode as "quick" | "pro") || "quick";
    const to = session.customer_details?.email || "";

    if (url && to) {
      const pdfData: PDFData = {
        url,
        date: new Date().toISOString().split("T")[0],
        mode,
      };

      const { ownerBuffer, developerBuffer } = await generateReports(pdfData);

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
}
