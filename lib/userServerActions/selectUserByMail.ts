"use server";

import prisma from "@/lib/prisma";

export default async function selectUserByMail(mail: string) {
  const user = await prisma.user.findFirst({
    where: {
      email: mail,
    },
  });
  return user;
}