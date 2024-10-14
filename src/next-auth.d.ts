import type { DefaultSession } from "next-auth"; // Import the types explicitly for augmentation

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      role?: string; // Your custom role field
      name?: string | null;
      email?: string | null;
      image?: string | null;
    } & DefaultSession["user"]; // Include default user fields
  }
}
