'use server';

import prisma from '@/lib/prisma';

export default async function selectUserByMail(mail: string) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: mail,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}
