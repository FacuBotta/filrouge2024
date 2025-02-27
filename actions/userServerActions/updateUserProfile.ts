'use server';

import { auth } from '@/lib/auth/authConfig';
import { handleError } from '@/lib/zod/handleError';
import { updateUserSchema } from '@/lib/zod/zodSchemas';
import { updateUserService } from '@/services/userServices';
import {
  getFormDataFileValue,
  getFormDataStringValue,
} from '@/utils/getFormDataValue';
import { deleteImage } from '../deleteImage';
import { uploadImage } from '../uploadImage';

/**
 * Interface representing the response of the updateUserProfile function.
 * @typedef {Object}updateUserProfileResponse
 * @property {boolean} ok - Indicates if the operation was successful.
 * @property {string} message - A message describing the result of the operation.
 */
interface updateUserProfileResponse {
  ok: boolean;
  message: string;
}

/**
 * Updates the user profile with the provided form data.
 * @param {FormData} formdata - The form data containing the user profile information.
 * formdata should contain the following fields:
 * - username: string
 * - description: string
 * - new-image: File (optional)
 * - old-image: string (optional)
 * @returns {Promise<updateUserProfileResponse>} A promise that resolves to an updateUserProfileResponse object.
 * @throws {Error} If no session is found or if there is an error during the update process.
 */
export const updateUserProfile = async (
  formdata: FormData
): Promise<updateUserProfileResponse> => {
  const session = await auth();

  if (!session || !session.user?.id) {
    console.error('updateUserProfile: no session found');
    throw new Error('No session found');
  }
  try {
    const description = getFormDataStringValue(formdata, 'description');
    const username = getFormDataStringValue(formdata, 'username');
    const newImageFile = getFormDataFileValue(formdata, 'new-image');
    const oldImagePath = getFormDataStringValue(formdata, 'old-image');

    // Validate the form data using Zod schema
    updateUserSchema.parse({
      username,
      image: newImageFile,
      description,
      oldImagePath,
    });

    const userData = {
      username,
      description,
      image: oldImagePath, // Keep the old image path by default
    };

    if (newImageFile) {
      const { imagePath } = await uploadImage(newImageFile, username);

      if (!imagePath) {
        throw new Error("Erreur lors du téléchargement de l'image");
      }
      userData.image = imagePath;

      if (oldImagePath?.length > 0) {
        await deleteImage(oldImagePath);
      }
    }
    await updateUserService({
      id: session.user.id,
      data: userData,
    });
    return { ok: true, message: 'Profil mis à jour' };
  } catch (error) {
    const customError = handleError(error);
    return { ok: customError.ok, message: customError.message };
  }
};
