'use server';

import { checkIsAuthenticated } from '../authServerActions/checkIsAuthenticated';
import { updateUserService } from '@/services/userServices';

interface updateUserProfileProps {
  username: string;
  image: string;
  description: string;
}

export const updateUserProfile = async ({
  username,
  image,
  description,
}: updateUserProfileProps): Promise<void> => {
  const { user } = await checkIsAuthenticated();
  if (!user) {
    console.error('updateUserProfile: no session found');
    return;
  }
  // TODO : parse data with zod
  try {
    await updateUserService({
      id: user.id,
      data: {
        username,
        image,
        description,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
