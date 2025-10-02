// app/api/webhook/route.ts
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import ReportPDF from "@/components/pdf/ReportPDF";
import ReportPDFDev from "@/components/pdf/ReportPDFDev";
import { sendReportEmail } from "@/lib/email";

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
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email || "";
    const mode = session.metadata?.mode || "quick";
    const url = session.metadata?.url || "unknown";

    try {
      if (mode === "pro") {
        const ownerElement = React.createElement(ReportPDF, { url, mode });
        const developerElement = React.createElement(ReportPDFDev, { url, mode });

        const ownerBuffer = await renderToBuffer(ownerElement as React.ReactElement);
        const developerBuffer = await renderToBuffer(developerElement as React.ReactElement);

        await sendReportEmail({
          to: email,
          url,
          mode,
          ownerBuffer,
          developerBuffer,
        });

        console.log("Pro email sent with PDFs:", { email, url, mode });
      } else {
        console.log("Quick check: no email, only on-screen report");
      }
    } catch (err) {
      console.error("PDF generation or email sending failed:", err);
    }
  }

  return new NextResponse("Webhook received", { status: 200 });
}
