import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import ReportPDFDev from "@/components/pdf/ReportPDFDev";
import ReportPDF_Owner from "@/components/pdf/ReportPDF_Owner";
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
      const email = session.customer_details?.email || "";
      const url = session.metadata?.url || "";
      const mode = session.metadata?.mode || "";

      if (mode === "pro") {
        // Owner PDF
        const ownerElement = React.createElement(ReportPDF_Owner, { url, mode });
        const ownerBuffer = await renderToBuffer(ownerElement);

        // Developer PDF
        const devElement = React.createElement(ReportPDFDev, { url, mode });
        const developerBuffer = await renderToBuffer(devElement);

        await sendReportEmail({ to: email, url, mode, ownerBuffer, developerBuffer });
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 400 });
  }
}
