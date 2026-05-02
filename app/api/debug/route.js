import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? "PRESENT (Ends with: " + process.env.GOOGLE_CLIENT_ID.slice(-10) + ")" : "MISSING",
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? "PRESENT" : "MISSING",
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || "NOT SET",
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV || "NOT SET",
  });
}
