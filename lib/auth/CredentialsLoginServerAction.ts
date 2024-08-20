"use server";

import { checkPassword } from "../userServerActions/checkPassword";
import selectUserByMail from "../userServerActions/selectUserByMail";
import { signIn } from "./authConfig";

export const handleCredentialsSignIn = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const user = await selectUserByMail(email);
  if (!user) {
    return {ok: false, message: 'Cet email n\'est pas associé à un compte'};
  }
  const matchPassword = await checkPassword(password, user.password as string);
  if (!matchPassword) {
    return {ok: false, message: 'Mot de passe incorrect'};
  }
  const credentials = {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
  };

  const response = await signIn('credentials', credentials);
  return response;
}