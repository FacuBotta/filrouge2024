'use server';

import { emailSchema } from '@/lib/zod/zodSchemas';
import bcrypt from 'bcrypt';
import selectUserByMail from './selectUserByMail';

/**
 * Verifies the user's password by comparing it with the stored hash.
 *
 * @param {Object} params - The parameters for password verification.
 * @param {string} params.inputPassword - The password entered by the user.
 * @param {string} [params.hashedPassword] - The stored hashed password (optional).
 * @param {string} [params.email] - The user's email address (optional).
 * @returns {Promise<boolean>} Returns `true` if the password matches, otherwise `false`.
 * @throws {Error} If an error occurs during password verification.
 *
 * @note At least one of `hashedPassword` or `email` must be provided.
 */
export const checkPassword = async ({
  inputPassword,
  hashedPassword,
  email,
}: {
  inputPassword: string;
  hashedPassword?: string;
  email?: string;
}): Promise<boolean> => {
  try {
    if (hashedPassword) {
      const match = await bcrypt.compare(inputPassword, hashedPassword);
      return match;
    } else if (!hashedPassword && email) {
      emailSchema.parse({ email });

      const user = await selectUserByMail(email);
      if (!user?.password) {
        return false;
      }
      const hashedPassword = user.password;
      const match = await bcrypt.compare(inputPassword, hashedPassword);
      return match;
    }
    return false;
  } catch (error) {
    console.error('Error al verificar la contraseña:', error);
    return false;
  }
};
