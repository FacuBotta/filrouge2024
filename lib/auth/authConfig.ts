import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import Google from 'next-auth/providers/google';
import Nodemailer from 'next-auth/providers/nodemailer';
import Credentials from 'next-auth/providers/credentials';

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true, // This is required for NextAuth to work properly in localHost
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24 * 7, // 7 days
  },
  pages: {
    signIn: '/app/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
        },
      };
    },
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      // prevents creating multiple users with the same email when using different login methods (google, email)
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    Nodemailer({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: parseInt(process.env.EMAIL_SERVER_PORT!, 10),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    Credentials({
      name: 'Credentials',
      async authorize(credentials: Partial<Record<string, unknown>>) {
        if (!credentials) {
          return null;
        }
        return {
          id: credentials.id as string,
          name: (credentials.name as string) || null,
          email: credentials.email as string,
          image: (credentials.image as string) || null,
        };
      },
    }),
  ],
});
/* 
http://localhost:3000/api/auth/callback/nodemailer?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Flogin&token=99c1c2c206dc1bc459cc046b341da838afd75bdda03d6074b87cb43822cb71b6&email=facundo.botta.dev%40gmail.com
*/
