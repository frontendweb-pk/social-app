import NextAuth from "next-auth";
import { credentials } from "./lib/auth/credentials";
import { config } from "./lib/auth/config";

/**
 * next authentication configuration
 */
export const { auth, signIn, signOut, handlers, unstable_update } = NextAuth({
  ...config,
  providers: [credentials],
});
