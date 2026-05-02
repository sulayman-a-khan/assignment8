import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const handler = toNextJsHandler(auth);

// Helper to fix hyphenated URLs from older client versions
const rewriteUrl = (req) => {
  const url = new URL(req.url);
  if (url.pathname.includes("sign-in")) {
    url.pathname = url.pathname.replace("sign-in", "signin");
    return new Request(url, req);
  }
  if (url.pathname.includes("sign-up")) {
    url.pathname = url.pathname.replace("sign-up", "signup");
    return new Request(url, req);
  }
  return req;
};

export const GET = async (req) => {
  return handler.GET(rewriteUrl(req));
};

export const POST = async (req) => {
  return handler.POST(rewriteUrl(req));
};
