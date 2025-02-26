'use server';

import { signIn } from '@/lib/auth/authConfig';
import { handleError } from '@/lib/zod/handleError';
import { emailSchema } from '@/lib/zod/zodSchemas';
import { selectUserByEmailService } from '@/services/userServices';

/**
 * Handles the email sign-in process.
 *
 * This function sends an email to the provided email address with a link to sign in.
 *
 * @param {string} email - The email address to sign in with.
 * @returns {Promise<{ ok: boolean, message?: string }>} An object indicating the result of the sign-in process.
 */
export async function emailSignInServerAction(
  email: string
): Promise<{ ok: boolean; message: string }> {
  try {
    // Validate the email using Zod schema
    emailSchema.parse({ email });

    // Check if the user already exists
    const user = await selectUserByEmailService({ email });
    if (user) {
      return {
        ok: false,
        message: 'Un compte existe déjà avec cet email',
      };
    }

    // Proceed with the sign-in process
    await signIn('nodemailer', {
      email,
      callbackUrl: '/profile',
      redirect: false,
    });

    return { ok: true, message: 'Email envoyé' };
  } catch (error) {
    return handleError(error);
  }
}
