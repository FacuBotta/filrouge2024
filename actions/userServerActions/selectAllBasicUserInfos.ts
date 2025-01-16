// select all basic user informations

import prisma from '@/lib/prisma';
import { User } from '@prisma/client';

export const selectAllBasicUserInfos = async (): Promise<
  Pick<User, 'id' | 'email' | 'description' | 'username' | 'image'>[]
> => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        image: true,
        description: true,
      },
    });
    console.log(users);
    return users;
  } catch (error) {
    console.error(error);
    return [];
  }
};
