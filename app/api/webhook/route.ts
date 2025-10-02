// app/api/webhook/route.ts
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { sendReportEmail } from "@/lib/email";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import ReportPDF_Owner from "@/components/pdf/ReportPDF_Owner";
import ReportPDF_Developer from "@/components/pdf/ReportPDF_Developer";

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
        // example results for testing
        const results: { name: string; desc: string; status: "Good" | "Moderate" | "Poor" }[] = [
          { name: "robots.txt", desc: "Controls whether AI can access your site.", status: "Good" },
          { name: "sitemap.xml", desc: "Provides AI with page structure for indexing.", status: "Moderate" },
          { name: "Meta tags", desc: "Ensures correct indexing and previews.", status: "Poor" },
        ];

        const date = new Date().toISOString().slice(0, 10);

        // generate Owner PDF
        const ownerElement = React.createElement(ReportPDF_Owner, {
          url,
          mode,
          score: 75,
          date,
          results,
        });
        const ownerBuffer = await renderToBuffer(ownerElement as React.ReactElement);

        // generate Developer PDF
        const developerElement = React.createElement(ReportPDF_Developer, {
          url,
          mode,
          score: 75,
          date,
          results,
        });
        const developerBuffer = await renderToBuffer(developerElement as React.ReactElement);

        // send both attachments
        await sendReportEmail({
          to: email,
          url,
          mode,
          ownerBuffer,
          developerBuffer,
        });

        console.log("Email sent with Owner + Developer PDF:", { email, url, mode });
      } catch (err) {
        console.error("PDF generation failed:", err);
      }
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
