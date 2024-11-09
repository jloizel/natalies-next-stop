import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const ADMIN_CREDENTIALS = {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
};

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            async authorize(credentials) {
                if (
                    credentials.email === ADMIN_CREDENTIALS.email &&
                    credentials.password === ADMIN_CREDENTIALS.password
                ) {
                    return {
                        id: 1,
                        name: 'Admin',
                        email: ADMIN_CREDENTIALS.email,
                        role: 'admin',
                    };
                } else {
                    throw new Error("Invalid credentials");
                }
            }
        })
    ],
    pages: {
        error: "/dashboard/signin", 
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
    secret: process.env.NEXTAUTH_SECRET, 
    session: {
        strategy: 'jwt', 
    }
});

export { handler as GET, handler as POST };
