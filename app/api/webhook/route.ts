import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { sendReportEmail } from "@/lib/email";
import { generateReports } from "@/lib/pdf";
import { PDFData } from "@/lib/types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET as string);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const url = session.metadata?.url || "";
    const mode = session.metadata?.mode || "quick";
    const to = session.customer_email || "";

    const date = new Date().toISOString().split("T")[0];

    // мок анализа
    const analysis: PDFData = {
      url,
      date,
      score: 75,
      checks: [
        { name: "Title tag", status: "Passed" },
        { name: "Meta description", status: "Failed" },
      ],
    };

    // генерируем Owner + Developer PDF
    const { ownerBuffer, developerBuffer } = await generateReports(analysis);

    // отправляем письмо с Owner PDF
    await sendReportEmail({
      to,
      url,
      mode,
      pdfBuffer: ownerBuffer,
    });
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
