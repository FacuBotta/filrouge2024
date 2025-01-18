'use server';

import prisma from '@/lib/prisma';
import { ProfileInformation } from '@/types/types';

export default async function selectUserById(
  id: string
): Promise<ProfileInformation | null> {
  try {
    const user = await prisma.user.findUnique({
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
    return user as ProfileInformation;
  } catch (error) {
    return null;
  }
}
