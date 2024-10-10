import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api")) {
    console.log("Hi, i am middleware api");
  }
  console.log("Hi, i am middleware");
  return NextResponse.next();
}
export const config = {
  matcher: ["/api/:path*"],
};
