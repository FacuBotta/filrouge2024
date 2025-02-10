import { auth } from '@/lib/auth/authConfig';
import prisma from '@/lib/prisma';
import { BasicProfileInformation } from '@/types/types';

export const selectAllBasicUserInfos = async (): Promise<
  BasicProfileInformation[] | []
> => {
  const session = await auth();
  if (!session) {
    console.error('selectAllBasicUserInfos: no session found');
    return [];
  }
  try {
    const users = await prisma.user.findMany({
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
    // Check to not return users with null values
    return users.filter(
      (user): user is BasicProfileInformation =>
        user.id !== session?.user?.id &&
        user.username !== null &&
        user.email !== null &&
        user.image !== null &&
        user.description !== null
    );
  } catch (error) {
    console.error(error);
    return [];
  }
};
