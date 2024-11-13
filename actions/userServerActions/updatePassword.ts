'use server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { passwordSchema } from '@/lib/zodSchemas';
import { z } from 'zod';
import { auth } from '@/lib/auth/authConfig';

export const updatePassword = async (formData: FormData) => {
  const session = await auth();
  if (!session) {
    return {
      ok: false,
      message: 'Vous devez être connecté pour modifier votre mot de passe',
    };
  }
  const id = formData.get('id') as string;
  const password = formData.get('password') as string;

  async function hashPassword(password: string) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  try {
    passwordSchema.parse({ password });
    const hashedPassword = await hashPassword(password);
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        password: hashedPassword,
      },
    });
    return { ok: true, message: 'Mot de passe modifié' };
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      const field = firstError.path[0];
      if (field === 'password') {
        return { ok: false, message: firstError.message };
      }
    } else {
      console.error(error); // dev purpose
      return { ok: false, message: 'Une erreur est survenue' };
    }
  }
};
