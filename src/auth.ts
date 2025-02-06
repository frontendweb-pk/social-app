import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { AuthenticationError } from "./lib/errors";



// declare module "next-auth" {}
// declare module "next-auth/jwt" {
//     interface JWT {

//     }
// }

/**
 * next authentication configuration
 */
export const { auth, signIn, signOut, handlers, unstable_update } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials;
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            }
          );

          if (!response.ok) {
            throw new AuthenticationError("Invalid credentials");
          }

          const data = await response.json();
          return data;
        } catch (error) {
          return error;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
        if(user){
            token.
        }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user = token;
      }
      return session;
    },
  },
});
