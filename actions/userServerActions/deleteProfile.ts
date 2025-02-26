'use server';

import { auth } from '@/lib/auth/authConfig';
import { passwordSchema } from '@/lib/zod/zodSchemas';
import { selectEventsByUserService } from '@/services/eventServices';
import {
  deleteUserService,
  selectUserByIdService,
} from '@/services/userServices';
import { getFormDataStringValue } from '@/utils/getFormDataValue';
import { ZodError } from 'zod';
import { deleteImage } from '../deleteImage';
import { checkPassword } from './checkPassword';
interface deleteProfileResponse {
  ok: boolean;
  message: string;
}
/**
 * Interface representing the response of the deleteProfile function.
 * @typedef {Object} deleteProfileResponse
 * @property {boolean} ok - Indicates if the operation was successful.
 * @property {string} message - A message describing the result of the operation.
 */

/**
 * Deletes the user profile
 * @Param {FormData} formdata - The form data containing the id of the user to delete.
 * @throws {Error} If no session is found or if there is an error during the delete process.
 */
export const deleteProfile = async (
  formdata: FormData
): Promise<deleteProfileResponse> => {
  const session = await auth();
  const id = getFormDataStringValue(formdata, 'id');
  const password = getFormDataStringValue(formdata, 'password');
  if (
    !session ||
    !session.user?.id ||
    !session.user.hasPassword ||
    !session.user.email ||
    (session.user.role !== 'admin' && session.user.id !== id)
  ) {
    console.error('deleteProfile: no session found');
    return { ok: false, message: 'Aucun session trouvée' };
  }

  try {
    passwordSchema.parse({ password });
    // Check password
    const passwordMatches: boolean = await checkPassword({
      inputPassword: password,
      email: session.user.email,
    });
    if (!passwordMatches) {
      return { ok: false, message: 'Mot de passe incorrect' };
    }
    // Take all user data
    const userData = await selectUserByIdService({ id });
    if (!userData || userData.email !== session.user.email) {
      throw new Error('Erreur lors de la suppression du profil');
    }
    // take user files to delete
    const userProfileFile = userData.image;
    const eventsCreates = await selectEventsByUserService(id);
    const eventImages = eventsCreates.map((event) => event.image);
    await Promise.all(
      eventImages.map(async (eventImage) => {
        if (eventImage) {
          await deleteImage(eventImage);
        }
      })
    );
    if (userProfileFile) {
      await deleteImage(userProfileFile);
    }
    // Delete the user profile
    await deleteUserService({ userId: session.user.id });
    return { ok: true, message: 'Compte supprimé avec succès' };
  } catch (error) {
    if (error instanceof ZodError) {
      return { ok: false, message: 'Mot de passe invalide' };
    }
    console.error('Erreur lors de la suppression du profil:', error);
    return { ok: false, message: 'Erreur lors de la suppression du profil' };
  }
};
