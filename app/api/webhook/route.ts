// app/api/webhook/route.ts
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { renderToBuffer } from "@react-pdf/renderer";
import ReportPDF_Owner, { ReportPDFProps } from "@/components/pdf/ReportPDF_Owner";
import { sendReportEmail } from "@/lib/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get("stripe-signature") as string;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const customerEmail = session.customer_details?.email;
    const url = session.metadata?.url || "";
    const score = Number(session.metadata?.score || 0);
    const date = new Date().toISOString().split("T")[0];
    const mode = session.metadata?.mode || "quick";

    // Пример фиктивных данных для results
    const results: ReportPDFProps["results"] = [
      { name: "robots.txt", desc: "Check if robots.txt is accessible", status: "Good" },
      { name: "sitemap.xml", desc: "Verify sitemap exists and valid", status: "Moderate" },
      { name: "Meta tags", desc: "Ensure meta tags are properly configured", status: "Poor" },
    ];

    if (!customerEmail) {
      return NextResponse.json({ received: true });
    }

    if (mode === "quick") {
      return NextResponse.json({ received: true });
    }

    if (mode === "pro") {
      const ownerBuffer = await renderToBuffer(
        <ReportPDF_Owner url={url} score={score} date={date} results={results} />
      );

      await sendReportEmail({
        to: customerEmail,
        url,
        mode,
        ownerBuffer,
      });
    }
  }

  return NextResponse.json({ received: true });
}
