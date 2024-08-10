"use server";
import prisma from "@/lib/prisma";

export const updatePassword = async (formData: FormData) => {
  const id = formData.get("id") as string;
  const password = formData.get("password") as string;
  try {
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: password,
      },
    });
    return {ok: true, message: 'Mot de passe modifié avec succès'};
  } catch (error) {
    console.error(error);
    throw error;
  }
}