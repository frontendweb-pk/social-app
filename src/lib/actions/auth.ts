"use server";

import { signIn } from "@/auth";
import { z } from "zod";
import { User } from "../models";
import { AuthError } from "next-auth";
import { ValidationError } from "sequelize";
import { sleep } from "../helpers";

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

  await sleep(3000);

  try {
    await signIn("credentials", {
      ...parsed.data,

      redirectTo: "/user/dashboard",
    });

    // Success handling
    return { message: "Login successful", status: "success" };
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

/**
 * Signup logic
 * @param formState Form state
 * @param formData Form data
 * @returns Signup response
 * @throws Error
 * @throws ValidationError
 */
const signupSchema = z.object({
  first_name: z.string().nonempty("First name is required"),
  last_name: z.string().nonempty("Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  mobile: z.string().min(10, "Mobile number must be at least 10 characters"),
  role_id: z.number().int().default(2),
});

export async function signup(formState: FormState<User>, formData: FormData) {
  // Signup logic
  try {
    const body = Object.fromEntries(formData) as {
      first_name: string;
      last_name: string;
      email: string;
      password: string;
      mobile: string;
    };

    // Validate request body
    const parsed = signupSchema.safeParse(body);
    if (!parsed.success) {
      return {
        status: "error",
        errors: parsed.error.flatten().fieldErrors,
        message: "Validation error",
      };
    }

    // check if user exists
    const user = await User.findOne({
      where: { email: parsed.data.email },
    });

    if (user) {
      return {
        status: "error",
        message: "User already exists",
      };
    }

    await User.create(parsed.data);
    return {
      status: "success",
      message: "User created successfully",
    };
  } catch (error) {
    let errorMessage = "Something went wrong";

    if (error instanceof ValidationError) {
      errorMessage = error.errors[0].message;
    }

    return {
      status: "error",
      message: errorMessage,
    };
  }
}
