// app/api/pdf/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "PDF endpoint works" });
}
