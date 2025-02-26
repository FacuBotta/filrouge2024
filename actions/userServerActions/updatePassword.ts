'use server';

import { auth } from '@/lib/auth/authConfig';
import { handleError } from '@/lib/zod/handleError';
import { passwordSchema } from '@/lib/zod/zodSchemas';
import { updateUserService } from '@/services/userServices';
import { getFormDataStringValue } from '@/utils/getFormDataValue';
import bcrypt from 'bcrypt';

/**
 * Updates or create the user's password.
 *
 * @param {FormData} formData - The FormData object containing the user ID and new password.
 * @returns {Promise<{ ok: boolean, message?: string }>}
 */
export const updatePassword = async (formData: FormData) => {
  const session = await auth();

  const id = getFormDataStringValue(formData, 'id');
  const password = getFormDataStringValue(formData, 'password');

  if (!session || session.user.id !== id) {
    return {
      ok: false,
      message: 'You must be logged in to change your password',
    };
  }

  async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  try {
    // Validate the password using Zod schema
    passwordSchema.parse({ password });

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Update the user's password
    await updateUserService({
      id,
      data: {
        password: hashedPassword,
        hasPassword: true,
      },
    });

    return { ok: true, message: 'Password updated successfully' };
  } catch (error) {
    return handleError(error);
  }
};
