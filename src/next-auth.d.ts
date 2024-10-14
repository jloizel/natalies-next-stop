import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      /** The user's role. */
      role?: string; // Add your custom role here
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
