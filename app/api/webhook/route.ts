// app/api/webhook/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import { sendReportEmail } from "@/lib/email";
import ReportPDF_Owner from "@/components/pdf/ReportPDF_Owner";
import ReportPDF_Developer from "@/components/pdf/ReportPDF_Developer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
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
      const email = session.customer_details?.email || "no-email@example.com";
      const url = session.metadata?.url || "example.com";
      const mode = session.metadata?.mode || "quick";

      const currentDate = new Date().toISOString().split("T")[0];

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

        const ownerBuffer = await renderToBuffer(ownerElement as any);
        const developerBuffer = await renderToBuffer(developerElement as any);

        await sendReportEmail({
          to: email,
          url,
          mode,
          ownerBuffer,
          developerBuffer,
        });

        console.log("Pro email sent:", email);
      } else {
        console.log("Quick check completed. No email sent.");
      }
    }

    return new NextResponse("Webhook processed", { status: 200 });
  } catch (err) {
    console.error("Webhook error:", err);
    return new NextResponse("Webhook error", { status: 400 });
  }
}
