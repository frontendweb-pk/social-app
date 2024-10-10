import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json(
    {
      api: {
        version: "1.0.0",
      },
    },
    { status: 200 }
  );
}
