// app/api/pay/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { analyze } from "../../../lib/analyze";
import { sendReportEmail } from "../../../lib/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

function getBaseUrl(req: NextRequest) {
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "";
  const proto = req.headers.get("x-forwarded-proto") || "https";
  return `${proto}://${host}`;
}

export async function POST(req: NextRequest) {
  try {
    const { mode, url, email } = await req.json();

    if (mode !== "quick" && mode !== "pro") {
      return NextResponse.json({ error: "Bad mode" }, { status: 400 });
    }

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "Missing url" }, { status: 400 });
    }

    const priceId =
      mode === "quick"
        ? process.env.STRIPE_PRICE_QUICK
        : process.env.STRIPE_PRICE_FULL;

    if (!priceId) {
      return NextResponse.json({ error: "Price ID not configured" }, { status: 500 });
    }

    const base = getBaseUrl(req);

    const { score } = await analyze(url, mode);

    const successUrl = `${base}/success/${mode}?url=${encodeURIComponent(
      url
    )}&status=ok&paid=1&score=${score}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: `${base}/`,
      customer_email: mode === "pro" && email ? email : undefined,
      metadata: { url, mode, email: email || "" },
    });

    if (mode === "pro" && email) {
      await sendReportEmail(
        email,
        "AI Signal Pro – Your Report is Ready",
        `Your website analysis for ${url} is complete. Score: ${score}%.`
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Stripe error" }, { status: 500 });
  }
}
