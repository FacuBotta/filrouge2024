'use server';

import { signIn } from '@/lib/auth/authConfig';
import selectUserByMail from '../userServerActions/selectUserByMail';
import { loginSchema } from '@/lib/zodSchemas';
import { z } from 'zod';

export async function emailSignInServerAction(email: string) {
  try {
    loginSchema.parse({ email });
    const user = await selectUserByMail(email);
    if (user) {
      return { ok: false, message: 'Cet email est déjà associé à un compte' };
    }
    await signIn('nodemailer', { email, callbackUrl: '/dashboard' });
    return { ok: true };
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      const field = firstError.path[0];
      if (field === 'email') {
        return { ok: false, message: firstError.message };
      }
    } else {
      console.error(error);
    }
    return {
      ok: false,
      message: 'Une erreur est survenue veuillez verifier votre e-mail',
    };
  }
}
