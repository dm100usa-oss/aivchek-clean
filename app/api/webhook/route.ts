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
    const to = body?.email ?? "your-email@example.com"; // можно заменить на email покупателя

    if (!rawUrl) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    if (!/^https?:\/\/[\w.-]+\.[a-z]{2,}/i.test(rawUrl)) {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    // формируем данные для PDF
    const pdfData: PDFData = {
      url: rawUrl,
      date: new Date().toISOString().slice(0, 10),
      score: 75, // временно тестовое значение
      interpretation: "Moderate",
      checks: [
        { key: "robots_txt", name: "Robots.txt", passed: true, description: "OK" },
        { key: "sitemap_xml", name: "Sitemap.xml", passed: false, description: "Missing" },
      ],
    };

    const ownerElement = React.createElement(ReportPDF_Owner, pdfData);
    const developerElement = React.createElement(ReportPDF_Developer, pdfData);

    const ownerBuffer = await renderToBuffer(ownerElement as React.ReactElement);
    const developerBuffer = await renderToBuffer(developerElement as React.ReactElement);

    // отправляем email
    await sendReportEmail({
      to,
      url: rawUrl,
      mode,
      ownerBuffer,
      developerBuffer,
    });

    return NextResponse.json({
      message: "Report generated and email sent",
      url: rawUrl,
      mode,
    });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
