'use server';

import { selectUserByEmailService } from '@/services/userServices';

export default async function selectUserByMail(email: string) {
  try {
    const user = await selectUserByEmailService({ email });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}
