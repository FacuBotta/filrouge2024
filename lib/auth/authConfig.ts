import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import Google from "next-auth/providers/google"
import Nodemailer from "next-auth/providers/nodemailer"
import Credentials from "next-auth/providers/credentials"

const prisma = new PrismaClient()

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true, // This is required for NextAuth to work properly in localHost
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24 * 7, // 7 days
  },
  pages: {
    signIn: "/app/login", // ver si no causa problemas por la ruta paralela...
    // TODO: add a page for the error page
    // error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id
        }
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string
        }
      }
    },
    // TODO: handle the case where the user already exists
    /* async signIn({ account, profile }) {
      if (account?.provider === "google") {
        const userMail = profile?.email;
        const userExists = await selectUserByMail(userMail as string);
        if (!userExists) {
          throw new Error("Il n'y a pas de compte pour ce mail, veuillez créer un compte pour continuer");
        }
      }
      return true;
    }, */
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      // evita crear multiples usuarios con el mismo email por usar diferentes metodos de login (google, email)
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
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
      async authorize(credentials : Partial<Record<string, unknown>>) {
        if (!credentials) {
          return null;
        }
        return {
          id: credentials.id as string,
          name: credentials.name as string || null,
          email: credentials.email as string,
          image: credentials.image as string || null,
        }
      },
    }),
  ],
})