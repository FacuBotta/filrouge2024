'use server';

import { checkPassword } from '../userServerActions/checkPassword';
import selectUserByMail from '../userServerActions/selectUserByMail';
import { signIn } from '../../lib/auth/authConfig';

export const handleCredentialsSignIn = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  try {
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
      name: (user.name as string) || null,
      email: user.email as string,
      image: (user.image as string) || null,
    };

    const response = await signIn('credentials', credentials);
    return response;
  } catch (error) {
    console.error('error in handleCredentialsSignIn', error);
    return {
      ok: false,
      message: 'Une erreur est survenue, veuillez réessayer',
    };
  }
};
