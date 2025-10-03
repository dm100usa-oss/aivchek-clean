import { NextResponse } from "next/server";
import Stripe from "stripe";

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

    // временно без PDF — просто ответ для проверки деплоя
    return NextResponse.json({
      message: "Webhook received successfully",
      url: rawUrl,
      mode,
    });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
