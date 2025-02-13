'use server';

import { emailSchema } from '@/lib/zodSchemas';
import { signIn } from '../../lib/auth/authConfig';
import { checkPassword } from '../userServerActions/checkPassword';
import selectUserByMail from '../userServerActions/selectUserByMail';

export const CredentialsLoginServerAction = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  try {
    emailSchema.parse({ email });
    const user = await selectUserByMail(email);
    if (!user) {
      return {
        ok: false,
        typeError: 'email',
        message: "Cet email n'est pas associé à un compte",
      };
    }
    const matchPassword = await checkPassword(
      password,
      user.password as string
    );
    if (!matchPassword) {
      return {
        ok: false,
        typeError: 'password',
        message: 'Mot de passe incorrect',
      };
    }
    const credentials = {
      id: user.id as string,
      role: user.role as string,
      hasPassword: (user.hasPassword as boolean) || null,
      email: user.email as string,
    };

    await signIn('credentials', credentials);
    /* await signIn('credentials', {
      ...credentials,
      callbackUrl: '/profile',
      redirect: false,
    }); */
    return { ok: true, message: 'Connexion réussie' };
  } catch (error: unknown) {
    console.error('error in handleCredentialsSignIn', error);
    return {
      ok: false,
      message: 'Une erreur est survenue, veuillez réessayer',
    };
  }
};
