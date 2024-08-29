"use server";
import { signIn } from "@/lib/auth/authConfig";

export async function handleGoogleSignIn() {
  try {
    await signIn("google", { redirectTo: "/dashboard" });
  } catch (error) {
    throw error;
  }
}