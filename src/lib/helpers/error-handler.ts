import { NextResponse } from "next/server";
import { CustomError } from "../errors";

export function errorHandler(error: Error) {
  if (error instanceof CustomError) {
    return NextResponse.json(error.serializeErrors(), {
      status: error.statusCode,
    });
  }
  return NextResponse.json(
    {
      error: true,
      message: error.message,
    },
    { status: 500 }
  );
}
