'use server';
import { signIn } from '@/lib/auth/authConfig';
import selectUserByMail from '../userServerActions/selectUserByMail';
import { loginSchema } from '@/lib/zodSchemas';
import { z } from 'zod';
export async function handleEmailSignIn(email: string) {
  try {
    loginSchema.parse({ email });
    const user = await selectUserByMail(email);
    if (user) {
      return { ok: false, message: 'Cet email est déjà associé à un compte' };
    }
    await signIn('nodemailer', { email, callbackUrl: '/dashboard' });
    return { ok: true }; // Asegúrate de que esto se devuelva si todo está bien
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      console.log(error);
      const firstError = error.errors[0]; // Toma el primer error
      const field = firstError.path[0];
      if (field === 'email') {
        return { ok: false, message: firstError.message }; // Devuelve el mensaje de error correcto
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
