import type { NextAuthConfig } from "next-auth";

/**
 * next authentication configuration
 */
export const config: Omit<NextAuthConfig, "providers"> = {
  // A database is optional, but required to persist accounts in a database
  // database: process.env.DATABASE_URL,
  // The secret should be set to a reasonably long random string
  secret: process.env.AUTH_SECRET,
  // A full list of options can be found at https://next-auth.js.org/configuration/options
  // Optional SQL or MongoDB database to persist users
  // database: process.env.DATABASE_URL,
  // Optional max age for access tokens
  // accessToken: {
  //   maxAge: 30 * 24 * 60 * 60, // 30 days
  // },
  // Optional max age for refresh tokens
  // refreshToken: {
  //   maxAge: 30 * 24 * 60 * 60, // 30 days
  // },
  // Optional setting to specify pages to be displayed for sign in,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      console.log("jwt", this, token, user);
      if (user) {
        token.user = user;
        token.exp = Date.now() + user.expireIn!; // 60 seconds
      }
      return token;
    },
    async session({ session, token }) {
      console.log("session", this, session, token);
      if (session.user) {
        session.user = token.user;
      }
      console.log("RUNNING SESSION CALLBACK", token, session.expires);
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "signout",
    error: "/",
    verifyRequest: "/verify-request",
    newUser: "/register",
  },
};
