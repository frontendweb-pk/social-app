import { MongooseError } from "mongoose";
import { CustomError } from "../errors/custom-error";
import { DatabaseConnectionError } from "../errors";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { zodValidationFormat } from "@/utils/zod-validation-format";

// Error handler
export function errorHandler(error: CustomError | ZodError) {
  if (error instanceof ZodError)
    return Response.json(
      { error: zodValidationFormat(error) },
      { status: 422 }
    );
  if (error instanceof MongooseError) {
    error = new DatabaseConnectionError(error.message);
  }
  return NextResponse.json(
    { error: error.renderError() },
    { status: error.statusCode }
  );
}
