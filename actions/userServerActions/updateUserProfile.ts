'use server';

import { auth } from '@/lib/auth/authConfig';
import prisma from '@/lib/prisma';
import { checkIsAuthenticated } from '../authServerActions/checkIsAuthenticated';

export const updateUserProfile = async (formData: FormData): Promise<void> => {
  const user = await checkIsAuthenticated();
  if (!user) {
    console.error('updateUserProfile: no session found');
    return;
  }
  const username = formData.get('username') as string;
  const image = formData.get('image') as string;
  const description = formData.get('description') as string;
  try {
    await prisma.user.update({
      where: {
        id: user.id as string,
      },
      data: {
        username: username as string,
        image: image as string,
        description: description as string,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
