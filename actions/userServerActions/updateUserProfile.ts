'use server';

import { updateUserService } from '@/services/userServices';
import { checkIsAuthenticated } from '../authServerActions/checkIsAuthenticated';

interface updateUserProfileResponse {
  ok: boolean;
  message: string;
}

export const updateUserProfile = async (
  formdata: FormData
): Promise<updateUserProfileResponse> => {
  const { user } = await checkIsAuthenticated();
  if (!user) {
    console.error('updateUserProfile: no session found');
    throw new Error('No session found');
  }
  // TODO : parse data with zod
  try {
    const username = formdata.get('username') as string;
    const image = formdata.get('image') as string;
    const description = formdata.get('description') as string;
    await updateUserService({
      id: user.id,
      data: {
        username,
        image,
        description,
      },
    });
    return { ok: true, message: 'Profile mis à jour' };
  } catch (error) {
    console.error(error);
    return { ok: false, message: 'Une erreur est survenue' };
  }
};
