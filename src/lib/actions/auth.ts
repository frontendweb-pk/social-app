"use server";

import { signIn } from "@/auth";
import { z } from "zod";
import { User } from "../models";
import { AuthError } from "next-auth";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function login(formState: FormState<User>, formData: FormData) {
  const body = Object.fromEntries(formData) as {
    email: string;
    password: string;
  };

  // Validate request body
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return {
      status: "error",
      errors: parsed.error.flatten().fieldErrors,
      message: "Validation error",
    };
  }

  try {
    await signIn("credentials", {
      ...parsed.data,
      redirect: false,
      redirectTo: "/user/dashboard",
    });

    // Success handling
    return {
      message: "Login successful",
      status: "success",
    };
  } catch (error) {
    let errorMessage = "Something went wrong";

    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        errorMessage = "Invalid credentials";
      }
    }

    return {
      status: "error",
      message: errorMessage,
    };
  }
}
