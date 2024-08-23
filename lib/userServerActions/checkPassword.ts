"use server";

import bcrypt from 'bcrypt';

export const checkPassword = async (inputPassword: string, hashedPassword: string) => {
  const match = await bcrypt.compare(inputPassword, hashedPassword);
  return match;
}