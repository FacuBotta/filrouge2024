"use server";

import { signOut } from "./authConfig";

export async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    console.log(error);
    throw error;
  }
}