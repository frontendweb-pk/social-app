import { NextRequest } from "next/server";
import { connectDb } from "./lib/db";

export async function middleware(req: NextRequest) {
  console.log("Hi, i am middleware");
}
