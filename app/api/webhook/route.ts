// app/api/webhook/route.ts
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { sendReportEmail } from "@/lib/email";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import ReportPDF from "@/components/pdf/ReportPDF";

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
        // Results with strict status types
        const results: { name: string; desc: string; status: "Good" | "Moderate" | "Poor" }[] = [
          { name: "robots.txt", desc: "Controls whether AI can access your site.", status: "Good" },
          { name: "sitemap.xml", desc: "Provides AI with page structure for indexing.", status: "Moderate" },
          { name: "Meta tags", desc: "Ensures correct indexing and previews.", status: "Poor" },
          { name: "Schema.org", desc: "Structured data for AI to understand content.", status: "Good" },
          { name: "Open Graph tags", desc: "Controls previews on social and AI snippets.", status: "Moderate" },
          { name: "Canonical links", desc: "Prevents duplicate indexing issues.", status: "Good" },
          { name: "Alt text", desc: "AI uses alt text for image context.", status: "Moderate" },
          { name: "Heading structure", desc: "Defines logical content hierarchy.", status: "Good" },
          { name: "Content depth", desc: "Rich, unique text improves AI understanding.", status: "Poor" },
          { name: "Internal linking", desc: "Supports AI navigation of your site.", status: "Moderate" },
          { name: "Mobile optimization", desc: "AI prioritizes mobile-friendly sites.", status: "Good" },
          { name: "Page speed", desc: "Faster sites are prioritized by AI.", status: "Moderate" },
          { name: "Security (HTTPS)", desc: "Secure sites are required for visibility.", status: "Good" },
          { name: "AI-specific tags", desc: "Meta directives for AI crawlers.", status: "Poor" },
          { name: "Backlinks", desc: "External links influence AI trust.", status: "Moderate" },
        ];

        const element = React.createElement(ReportPDF, {
          url,
          mode,
          score: 75,
          date: new Date().toISOString().slice(0, 10),
          results,
        });

        const pdfBuffer = await renderToBuffer(
          element as unknown as React.ReactElement
        );

        await sendReportEmail({ to: email, url, mode, pdfBuffer });
        console.log("Email sent with PDF:", { email, url, mode });
      } catch (err) {
        console.error("PDF generation failed:", err);
      }
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
