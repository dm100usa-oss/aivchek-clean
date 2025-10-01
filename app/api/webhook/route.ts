// app/api/webhook/route.ts
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { sendReportEmail } from "@/lib/email";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import ReportPDFTest from "@/components/pdf/ReportPDFTest";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export const runtime = "nodejs";

export async function POST(req: Request) {
  const sig = headers().get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return NextResponse.json(
      { error: "Missing signature or secret" },
      { status: 400 }
    );
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
      try {
        // Generate PDF buffer without JSX
        const pdfBuffer = await renderToBuffer(
          React.createElement(ReportPDFTest, { url, mode })
        );

        // Send email with PDF attached
        await sendReportEmail({ to: email, url, mode, pdfBuffer });
        console.log("Email with PDF sent:", { email, url, mode });
      } catch (err) {
        console.error("Failed to generate or send PDF:", err);
      }
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
