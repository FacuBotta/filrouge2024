'use server';

import { signIn } from '@/lib/auth/authConfig';
import { emailSchema } from '@/lib/zodSchemas';
import { z } from 'zod';
import selectUserByMail from '../userServerActions/selectUserByMail';

export async function emailSignInServerAction(email: string) {
  try {
    emailSchema.parse({ email });
    const user = await selectUserByMail(email);
    if (user) {
      return { ok: false, message: 'Cet email est déjà associé à un compte' };
    }
    await signIn('nodemailer', {
      email,
      callbackUrl: '/dashboard',
      redirect: false,
    });
    return { ok: true };
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      const field = firstError.path[0];
      if (field === 'email') {
        return { ok: false, message: firstError.message };
      }
    } else {
      console.error(error); // dev purpose
    }
    return {
      ok: false,
      message: 'Une erreur est survenue veuillez verifier votre e-mail',
    };
  }
}
