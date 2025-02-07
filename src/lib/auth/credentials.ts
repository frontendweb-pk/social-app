import Credentials, {
  CredentialsConfig,
} from "next-auth/providers/credentials";
import { CredentialsSignin } from "next-auth";

class InvalidCredentialsError extends CredentialsSignin {
  code = "InvalidCredentials";
  constructor(message = "Invalid credentials") {
    super(message);
  }
}

export const credentials: CredentialsConfig = Credentials({
  credentials: {
    email: { label: "Email", type: "email", placeholder: "your@example.com" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    if (!credentials?.email || !credentials?.password) {
      throw new InvalidCredentialsError("Email and password are required");
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      if (!response.ok) {
        const errorMessage =
          response.status === 401
            ? "Invalid credentials"
            : "Authentication failed. Please try again later.";
        throw new InvalidCredentialsError(errorMessage);
      }

      return await response.json();
    } catch (error) {
      throw new InvalidCredentialsError(
        (error as Error).message || "An error occurred"
      );
    }
  },
});
