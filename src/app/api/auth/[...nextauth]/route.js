import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Hardcoded admin credentials
const ADMIN_CREDENTIALS = {
    email: 'admin@example.com',
    password: 'adminpassword', // In real production, you'd want to keep this in environment variables or securely
};

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            async authorize(credentials) {
                // Check if the entered email and password match the hardcoded admin credentials
                if (
                    credentials.email === ADMIN_CREDENTIALS.email &&
                    credentials.password === ADMIN_CREDENTIALS.password
                ) {
                    // Return an admin user object when login is successful
                    return {
                        id: 1,
                        name: 'Admin',
                        email: ADMIN_CREDENTIALS.email,
                        role: 'admin',
                    };
                } else {
                    // Throw an error if credentials don't match
                    throw new Error("Invalid credentials");
                }
            }
        })
    ],
    pages: {
        error: "/dashboard/login", // Custom error page
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token?.id) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET, // Make sure you set this in your environment variables
    session: {
        strategy: 'jwt', // Using JWT for session strategy
    }
});

export { handler as GET, handler as POST };
