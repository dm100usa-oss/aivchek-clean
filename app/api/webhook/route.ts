import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import Stripe from "stripe";
import { sendReportEmail } from "@/lib/email";
import { PDFData } from "@/lib/types";
import ReportPDF_Owner from "@/components/pdf/ReportPDF_Owner";
import ReportPDF_Developer from "@/components/pdf/ReportPDF_Developer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const rawUrl = (body?.url as string | undefined)?.trim();
    const mode = (body?.mode as "quick" | "pro" | undefined) ?? "quick";

    if (!rawUrl) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    if (!/^https?:\/\/[\w.-]+\.[a-z]{2,}/i.test(rawUrl)) {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

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

    if (mode === "pro") {
      const ownerElement = React.createElement(ReportPDF_Owner, testData);
      const developerElement = React.createElement(ReportPDF_Developer, testData);

      const ownerBuffer = await renderToBuffer(ownerElement as React.ReactElement);
      const developerBuffer = await renderToBuffer(developerElement as React.ReactElement);

      await sendReportEmail({
        to: "dm100usa@gmail.com",
        url: rawUrl,
        mode,
        ownerBuffer,
        developerBuffer,
      });
    }

    return NextResponse.json({
      message: "Webhook handled successfully",
      url: rawUrl,
      mode,
    });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
