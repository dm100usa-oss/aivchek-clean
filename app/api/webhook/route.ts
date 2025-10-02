import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import { sendReportEmail } from "@/lib/email";
import ReportPDF_Developer from "@/components/pdf/ReportPDF_Developer";
import ReportPDF_Owner from "@/components/pdf/ReportPDF_Owner";

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
    console.error("Error verifying webhook:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const url = session.metadata?.url || "unknown";
    const mode = session.metadata?.mode || "quick";
    const email = session.customer_details?.email;

    const currentDate = new Date().toISOString().split("T")[0];

    if (email) {
      try {
        if (mode === "pro") {
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
            pdfBuffer: ownerBuffer,
            filename: "AI_Signal_Report_Owner.pdf",
          });

          await sendReportEmail({
            to: email,
            url,
            mode,
            pdfBuffer: developerBuffer,
            filename: "AI_Signal_Report_Developer.pdf",
          });
        } else {
          const ownerElement = React.createElement(ReportPDF_Owner, {
            url,
            score: 75,
            date: currentDate,
          });

          const ownerBuffer = await renderToBuffer(ownerElement);

          await sendReportEmail({
            to: email,
            url,
            mode,
            pdfBuffer: ownerBuffer,
            filename: "AI_Signal_Report.pdf",
          });
        }

        console.log("Report(s) sent to", email);
      } catch (err) {
        console.error("Failed to generate/send report:", err);
      }
    }
  }

  return NextResponse.json({ received: true });
}
