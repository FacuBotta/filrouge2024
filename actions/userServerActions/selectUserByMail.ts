'use server';

import prisma from '@/lib/prisma';

export default async function selectUserByMail(email: string) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}
