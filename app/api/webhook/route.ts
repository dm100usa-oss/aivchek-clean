import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import ReportPDF_Owner, { ReportPDFProps } from "@/components/pdf/ReportPDF_Owner";
import { sendReportEmail } from "@/lib/email";

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
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const customerEmail = session.customer_details?.email;
    const url = session.metadata?.url || "";
    const score = Number(session.metadata?.score || 0);
    const date = new Date().toISOString().split("T")[0];
    const mode = session.metadata?.mode || "quick";

    // results приходят как JSON в metadata
    let results: ReportPDFProps["results"] = [];
    try {
      if (session.metadata?.results) {
        results = JSON.parse(session.metadata.results) as ReportPDFProps["results"];
      }
    } catch (e) {
      results = [];
    }

    if (!customerEmail) {
      return NextResponse.json({ received: true });
    }

    if (mode === "pro") {
      const ownerBuffer = await renderToBuffer(
        React.createElement(ReportPDF_Owner, {
          url,
          score,
          date,
          results,
        } as ReportPDFProps)
      );

      await sendReportEmail({
        to: customerEmail,
        url,
        mode,
        ownerBuffer,
      });
    }
  }

  return NextResponse.json({ received: true });
}
