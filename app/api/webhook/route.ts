// app/api/webhook/route.ts

import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { analyze } from "@/lib/analyze";
import { generateReports } from "@/lib/pdf";
import { sendReportEmail } from "@/lib/email";
import { PDFData } from "@/lib/types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const sig = headers().get("stripe-signature") as string;

    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;
      const url = session.metadata.url as string;
      const mode = session.metadata.mode as "quick" | "pro";
      const to = session.metadata.to as string;

      const analysis = await analyze(url, mode);

      const pdfData: PDFData = {
        url,
        date: new Date().toISOString().split("T")[0],
        score: analysis.score,
        interpretation: analysis.interpretation,
        checks: analysis.items,
      };

      const { ownerBuffer, developerBuffer } = await generateReports(pdfData);

      await sendReportEmail({
        to,
        url,
        mode,
        ownerBuffer,
        developerBuffer,
      });
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("Webhook Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
