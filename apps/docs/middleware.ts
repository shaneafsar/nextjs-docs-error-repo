import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import redirects from "redirects";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const foundRedirect = redirects.find((r) => r.source === url.pathname);

  if (foundRedirect && foundRedirect.destination.startsWith("http")) {
    url.href = foundRedirect.destination;
    return NextResponse.redirect(url, 308);
  }

  if (foundRedirect) {
    url.pathname = foundRedirect.destination;
    return foundRedirect.permanent
      ? NextResponse.redirect(url, 308)
      : NextResponse.redirect(url, 307);
  }

  return NextResponse.next();
}
