'use server';

import prisma from '@/lib/prisma';
import { BasicProfileInformation } from '@/types/types';

export default async function selectUserById(
  id: string
): Promise<BasicProfileInformation | null> {
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
    return user as BasicProfileInformation;
  } catch (error) {
    console.error(error);
    return null;
  }
}
