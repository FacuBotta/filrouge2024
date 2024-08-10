"use server";
import { signIn } from "@/lib/auth/authConfig";
import selectUserByMail from "../userServerActions/selectUserByMail";

export async function handleEmailSignIn(email: string) {
  try {
    const user = await selectUserByMail(email);
    if (user) {
      return { error: { message: "Cet email est deja utilisé", value: true } };
    }
    await signIn("nodemailer", { email, callbackUrl: "/dashboard" });
  } catch (error) {
    throw error;
  }
}