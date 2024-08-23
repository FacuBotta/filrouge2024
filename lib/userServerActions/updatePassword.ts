"use server";
import prisma from "@/lib/prisma";
import bcrypt from 'bcrypt';
import { redirect } from "next/navigation";

export const updatePassword = async (formData: FormData) => {
  const id = formData.get("id") as string;
  const password = formData.get("password") as string;


  async function hashPassword(password: string) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }
  
  try {
    const hashedPassword = await hashPassword(password);
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: hashedPassword,
      },
    });
    redirect('/dashboard');
  } catch (error) {
    console.error(error);
    throw error;
  }
}