import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Mock admin credentials for simplicity
const ADMIN_CREDENTIALS = {
  email: 'admin@example.com',
  password: 'adminpassword', // In a real project, store this securely (e.g., hashed in a database)
};

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Enter your email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        // Simple check for admin credentials
        if (credentials?.email === ADMIN_CREDENTIALS.email && credentials?.password === ADMIN_CREDENTIALS.password) {
          // Return a user object including an ID and role
          return { id: '1', name: 'Admin', email: ADMIN_CREDENTIALS.email, role: 'admin' };
        }
        return null; // Return null if the credentials are invalid
      },
    }),
  ],
  callbacks: {
    // Control what information is sent to the client in the session object
    async session({ session, token }) {
      // Attach user id and role to the session (for easy access in the frontend)
      if (token?.id) session.user.id = token.id;
      if (token?.role) session.user.role = token.role; // Add role to session
      return session;
    },
    // Add additional information to the JWT token, such as user ID and role
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role; // Include the role in the JWT token
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure you have this secret set in your environment variables
  session: {
    strategy: 'jwt', // Ensure session strategy is JWT for scalability
  },
  pages: {
    signIn: '/auth/signin', // Optional custom sign-in page
  },
});
