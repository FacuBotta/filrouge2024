'use server';
import { auth } from '@/lib/auth/authConfig';
import selectUserByMail from '../userServerActions/selectUserByMail';

export const checkIsAuthenticated = async () => {
  const session = await auth();
  if (session) {
    const userEmail = session.user?.email;
    const user = await selectUserByMail(userEmail as string);
    if (!user) {
      return false;
    }
    return user;
  }
  return false;
};
