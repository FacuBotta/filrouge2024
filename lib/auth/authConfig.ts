import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import Nodemailer from 'next-auth/providers/nodemailer';
import { createTransport } from 'nodemailer';
import { html, text } from '../emailTemplate';

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true, // This is required for NextAuth to work properly in localHost
  adapter: PrismaAdapter(prisma) as Adapter,
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24 * 7, // 7 days
  },
  pages: {
    signIn: '/profile',
    error: '/login/error',
  },
  callbacks: {
    jwt: async ({ token, trigger, session, user }) => {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.hasPassword = user.hasPassword;
      }
      if (trigger === 'update' && session?.hasPassword !== undefined) {
        token.hasPassword = session.hasPassword;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          id: token.id as string,
          role: token.role as string,
          email: token.email as string,
          hasPassword: token.hasPassword as boolean,
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
      sendVerificationRequest: async (params) => {
        const { identifier, url, provider } = params;
        const transport = createTransport(provider.server);
        const result = await transport.sendMail({
          to: identifier,
          from: provider.from,
          subject: `Bienvenue sur EventHub !`,
          text: text({ url }), // This is the text version of the email
          html: html({ url }), // This is the HTML version of the email
        });
        const failed = result.rejected.concat(result.pending).filter(Boolean);
        if (failed.length) {
          throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`);
        }
      },
    }),
    Credentials({
      name: 'Credentials',
      async authorize(credentials: Partial<Record<string, unknown>>) {
        if (!credentials) {
          return null;
        }
        return {
          id: credentials.id as string,
          role: credentials.role as string,
          hasPassword: credentials.hasPassword === 'true',
          email: credentials.email as string,
        };
      },
    }),
  ],
});
