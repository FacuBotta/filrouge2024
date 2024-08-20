"use server";
import { signIn } from "@/lib/auth/authConfig";
import selectUserByMail from "../userServerActions/selectUserByMail";

export async function handleEmailSignIn(email: string) {
  try {
    const user = await selectUserByMail(email);
    if (user) {
      return { ok: false, message: 'Cet email est déjà associé à un compte' };
    }
    await signIn("nodemailer", { email, callbackUrl: "/dashboard" });
  } catch (error) {
    throw error;
  }
}