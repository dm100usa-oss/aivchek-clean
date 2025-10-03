// app/api/webhook/route.ts
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { analyze } from "@/lib/analyze";
import { PDFData } from "@/lib/types";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import ReportPDF_Owner from "@/components/pdf/ReportPDF_Owner";
import ReportPDF_Developer from "@/components/pdf/ReportPDF_Developer";
import { sendReportEmail } from "@/lib/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
  }

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

    const url = session.metadata?.url as string;
    const mode = session.metadata?.mode as "quick" | "pro";
    const to = session.metadata?.to as string;

    if (!url || !mode || !to) {
      return NextResponse.json({ error: "Missing metadata in session" }, { status: 400 });
    }

    // Run analysis
    const analysis = await analyze(url, mode);

    const pdfData: PDFData = {
      url,
      date: new Date().toISOString().split("T")[0],
      score: analysis.score,
      interpretation: analysis.interpretation,
      items: analysis.items,
    };

    // Generate PDFs
    const ownerBuffer = await renderToBuffer(
      React.createElement(ReportPDF_Owner, pdfData)
    );

    const developerBuffer = await renderToBuffer(
      React.createElement(ReportPDF_Developer, pdfData)
    );

    // Send email
    await sendReportEmail({
      to,
      url,
      mode,
      pdfBuffers: [
        { name: "Owner_Report.pdf", buffer: ownerBuffer },
        { name: "Developer_Report.pdf", buffer: developerBuffer },
      ],
    });
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
