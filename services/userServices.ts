import prisma from '@/lib/prisma';
import { getUserServiceType } from '@/lib/zod/zodSchemas';
import { UserDataService } from '@/types/servicesTypes/types';
import { Prisma, User } from '@prisma/client';

export const deleteUserService = async ({
  userId,
}: {
  userId: string;
}): Promise<boolean> => {
  if (!userId) {
    return false;
  }
  try {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return true;
  } catch (error) {
    console.error('deleteUserService error:', error);
    throw new Error('Error deleting user');
  }
};

export const updateUserService = async ({
  id,
  data,
}: {
  id: string;
  data: Pick<
    Prisma.UserUpdateInput,
    'image' | 'description' | 'username' | 'hasPassword' | 'password'
  >;
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
export const selectUserDataService = async ({
  id,
}: {
  id: string;
}): Promise<UserDataService | null> => {
  if (!id || typeof id !== 'string') {
    return null;
  }
  try {
    const userData = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        image: true,
        description: true,
        EventsCreated: {
          select: {
            id: true,
            title: true,
            description: true,
            eventStart: true,
            eventEnd: true,
            isPublic: true,
            image: true,
            createdAt: true,
            updatedAt: true,
            formattedAddress: true,
            conversation: { select: { id: true } },
            participants: { select: { userId: true } },
            category: { select: { id: true, title: true } },
            UserInvitations: true,
            Tasks: true,
          },
          orderBy: { eventStart: 'asc' },
        },
        EventsJoined: {
          select: {
            event: {
              select: {
                id: true,
                title: true,
                description: true,
                user: { select: { id: true, username: true, image: true } },
                eventStart: true,
                eventEnd: true,
                isPublic: true,
                image: true,
                createdAt: true,
                updatedAt: true,
                formattedAddress: true,
                conversation: { select: { id: true } },
                category: { select: { id: true, title: true } },
                _count: { select: { participants: true } },
              },
            },
          },
        },
        Tasks: true,
        CommentsReceived: {
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            content: true,
            recipientId: true,
            author: { select: { id: true, username: true, image: true } },
            rating: {
              select: {
                score: true,
              },
            },
          },
        },
      },
    });

    if (!userData) return null;
    return userData;
  } catch (error) {
    console.error('selectUserDataService', error);
    return null;
  }
};
