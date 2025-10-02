// app/api/webhook/route.ts
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { sendReportEmail } from "@/lib/email";
import { renderToBuffer } from "@react-pdf/renderer";
import ReportPDF_Owner from "@/components/pdf/ReportPDF_Owner";
import ReportPDF_Developer from "@/components/pdf/ReportPDF_Developer";
import React from "react";

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
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email || "";
    const url = (session.metadata?.url as string) || "";
    const mode = (session.metadata?.mode as string) || "";

    try {
      if (mode === "pro") {
        const currentDate = new Date().toISOString().split("T")[0];

        const ownerElement = React.createElement(ReportPDF_Owner, {
          url,
          score: 75,
          date: currentDate,
        });
        const developerElement = React.createElement(ReportPDF_Developer, {
          url,
          score: 75,
          date: currentDate,
        });

        const ownerBuffer = await renderToBuffer(ownerElement);
        const developerBuffer = await renderToBuffer(developerElement);

        await sendReportEmail({
          to: email,
          url,
          mode,
          ownerBuffer,
          developerBuffer,
        });

        console.log("Email sent with PDFs:", { email, url, mode });
      } else {
        console.log("Quick mode: no PDF, only on-screen result.");
      }
    } catch (err) {
      console.error("PDF generation or email failed:", err);
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
