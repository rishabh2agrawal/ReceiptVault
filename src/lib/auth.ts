// Google Cloud Console setup:
// 1. Go to console.cloud.google.com → Create project "ReceiptVault Web"
// 2. APIs & Services → OAuth Consent Screen → External
// 3. Credentials → Create OAuth 2.0 Client → Web Application
// 4. Authorized redirect URIs: http://localhost:3000/api/auth/callback/google
//    (production: https://yourdomain.com/api/auth/callback/google)
// 5. Copy Client ID and Secret to .env.local
// 6. NEXTAUTH_SECRET: run `openssl rand -base64 32`

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId:     process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/login',
    error:  '/login',
  },
  callbacks: {
    session: async ({ session, token }: any) => {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
