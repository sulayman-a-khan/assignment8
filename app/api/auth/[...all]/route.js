import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const handler = toNextJsHandler(auth);

// Helper to fix hyphenated URLs from older client versions
const rewriteUrl = (req) => {
  const url = new URL(req.url);
  const p = url.pathname;
  
  // Standardize social login paths
  if (p.includes("/social/google")) {
    // If it's anything like /api/auth/.../social/google, make it the standard signin
    url.pathname = "/api/auth/signin/social/google";
    return new Request(url, req);
  }

  // General hyphen fix
  if (p.includes("sign-in")) {
    url.pathname = p.replace("sign-in", "signin");
    return new Request(url, req);
  }
  if (p.includes("sign-up")) {
    url.pathname = p.replace("sign-up", "signup");
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
