import prisma from '@/lib/prisma';
import { getUserServiceType } from '@/lib/zodSchemas';
import { Prisma, User } from '@prisma/client';

// TODO : type data to limit the data that can be updated

export const updateUserService = async ({
  id,
  data,
}: {
  id: string;
  data: Prisma.UserUpdateInput;
}) => {
  try {
    return prisma.user.update({
      where: {
        id,
      },
      data,
    });
  } catch (error) {
    console.error('updateUserService', error);
    return null;
  }
};
export const selectUserByIdService = async ({
  id,
}: {
  id: string;
}): Promise<getUserServiceType | null> => {
  try {
    return prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        username: true,
        image: true,
        description: true,
        _count: {
          select: {
            EventsCreated: true,
            Ratings: true,
          },
        },
      },
    });
  } catch (error) {
    console.error('selectUserByIdService', error);
    return null;
  }
};

export const selectUserByEmailService = async ({
  email,
}: {
  email: string;
}): Promise<Partial<User> | null> => {
  try {
    return prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        role: true,
        password: true,
        hasPassword: true,
        email: true,
      },
    });
  } catch (error) {
    console.error('selectUserByEmailService', error);
    return null;
  }
};
export const selectAllUsersService = async (): Promise<
  Partial<User>[] | null
> => {
  try {
    return await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        image: true,
        description: true,
        _count: {
          select: {
            Ratings: true,
            EventsCreated: true,
          },
        },
      },
    });
  } catch (error) {
    console.error('selectAllUsersService', error);
    return null;
  }
};
