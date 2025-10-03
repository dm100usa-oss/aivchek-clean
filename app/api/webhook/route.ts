// /app/api/webhook/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import ReportPDF_Owner from "@/components/pdf/ReportPDF_Owner";
import ReportPDF_Developer from "@/components/pdf/ReportPDF_Developer";
import { sendReportEmail } from "@/lib/email";
import { PDFData } from "@/lib/types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const rawUrl = (body?.url as string | undefined)?.trim();
    const mode = (body?.mode as "quick" | "pro" | undefined) ?? "quick";
    const email = (body?.email as string | undefined)?.trim();

    if (!rawUrl) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    if (!/^https?:\/\/[\w.-]+\.[a-z]{2,}/i.test(rawUrl)) {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // fake analyze results for now
    const testData: PDFData = {
      url: rawUrl,
      date: new Date().toISOString().slice(0, 10),
      score: 75,
      interpretation: "Moderate",
      checks: [
        { key: "robots_txt", name: "Robots.txt", passed: true, description: "OK" },
        { key: "sitemap_xml", name: "Sitemap.xml", passed: false, description: "Missing" },
      ],
    };

    // generate PDFs
    const ownerElement = React.createElement(ReportPDF_Owner, testData);
    const developerElement = React.createElement(ReportPDF_Developer, testData);

    const ownerBuffer = await renderToBuffer(ownerElement as React.ReactElement);
    const developerBuffer = await renderToBuffer(developerElement as React.ReactElement);

    // send email
    await sendReportEmail({
      to: email,
      url: rawUrl,
      mode,
      ownerBuffer,
      developerBuffer,
    });

    return NextResponse.json({
      message: "Webhook processed, PDFs sent",
      url: rawUrl,
      mode,
      email,
    });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
