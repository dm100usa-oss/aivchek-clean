import { NextResponse } from "next/server";
import Stripe from "stripe";
import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";

import ReportPDF_Developer from "@/components/pdf/ReportPDF_Developer";
import ReportPDF_Owner from "@/components/pdf/ReportPDF_Owner";
import { sendReportEmail } from "@/lib/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, url, mode } = body;

    const currentDate = new Date().toISOString().split("T")[0];

    // Owner PDF
    const ownerElement = React.createElement(ReportPDF_Owner, {
      url,
      score: 75,
      date: currentDate,
    });
    const ownerBuffer = await renderToBuffer(ownerElement as React.ReactElement);

    // Developer PDF (только если mode = "pro")
    let developerBuffer: Buffer | undefined;
    if (mode === "pro") {
      const developerElement = React.createElement(ReportPDF_Developer, {
        url,
        score: 75,
        date: currentDate,
      });
      developerBuffer = await renderToBuffer(
        developerElement as React.ReactElement
      );
    }

    await sendReportEmail({
      to: email,
      url,
      mode,
      pdfBuffer: ownerBuffer,
      developerBuffer,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
