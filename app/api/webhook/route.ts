// app/api/webhook/route.ts
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { renderToBuffer } from "@react-pdf/renderer";
import ReportPDF_Owner from "@/components/pdf/ReportPDF_Owner";
import ReportPDF_Developer from "@/components/pdf/ReportPDF_Developer";
import { sendReportEmail } from "@/lib/email";
import { analyze } from "@/lib/analyze";

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
    const mode = session.metadata?.mode || "quick";
    const date = new Date().toISOString().split("T")[0];

    if (!customerEmail) {
      return NextResponse.json({ received: true });
    }

    if (mode === "quick") {
      return NextResponse.json({ received: true });
    }

    if (mode === "pro") {
      const result = await analyze(url, mode);

      const results = result.items.map((i) => ({
        name: i.name,
        desc: i.description,
        status: i.status as "Good" | "Moderate" | "Poor",
      }));

      const ownerBuffer = await renderToBuffer(
        <ReportPDF_Owner
          url={url}
          score={result.score}
          date={date}
          results={results}
        />
      );

      const developerBuffer = await renderToBuffer(
        <ReportPDF_Developer
          url={url}
          score={result.score}
          date={date}
          results={results}
        />
      );

      await sendReportEmail({
        to: customerEmail,
        url,
        mode,
        ownerBuffer,
        developerBuffer,
      });
    }
  }

  return NextResponse.json({ received: true });
}
