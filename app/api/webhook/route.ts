import { NextResponse } from "next/server";
import Stripe from "stripe";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import { sendReportEmail } from "@/lib/email";
import ReportPDF_Owner from "@/components/pdf/ReportPDF_Owner";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url, mode, score, results } = body;
    const date = new Date().toISOString();

    if (!url) {
      return NextResponse.json({ error: "Missing URL" }, { status: 400 });
    }

    if (mode === "pro") {
      const ownerBuffer = await renderToBuffer(
        React.createElement(ReportPDF_Owner, {
          url,
          score,
          date,
          results,
        })
      );

      await sendReportEmail({
        to: "user@example.com",
        url,
        mode,
        pdfBuffer: ownerBuffer,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
