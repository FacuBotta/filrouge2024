"use server";

import { signOut } from "../../lib/auth/authConfig";

export async function handleSignOut() {
  try {
    await signOut({ redirectTo:'/' });
  } catch (error) {
    console.log(error);
    throw error;
  }
}