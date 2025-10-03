import { NextResponse } from "next/server";
import Stripe from "stripe";
import { sendReportEmail } from "@/lib/email";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import ReportPDF from "@/components/pdf/ReportPDF";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export async function POST(req: Request) {
  try {
    const sig = req.headers.get("stripe-signature") as string;
    const body = await req.text();

    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;
      const email = session.customer_details.email;
      const url = session.metadata.url || "https://example.com";
      const mode = session.metadata.mode || "quick";

      const pdfBuffer = await renderToBuffer(
        React.createElement(ReportPDF, {
          url,
          score: 75,
          date: new Date().toISOString(),
          results: [],
        })
      );

      await sendReportEmail({
        to: email,
        url,
        mode,
        pdfBuffer,
      });
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
