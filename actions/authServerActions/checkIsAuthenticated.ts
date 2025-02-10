'use server';
import { auth } from '@/lib/auth/authConfig';

/**
 * Check if the user is authenticated
 * If the user is authenticated, return the user object and true
 * If the user is not authenticated, return false and the user object
 * This user object contains only the basic information to take render and redirection decisions
 * @returns {Promise<{auth: boolean, user: User | null}>}
 */

export const checkIsAuthenticated = async () => {
  const session = await auth();
  if (session && session.user) {
    return { auth: true, user: session.user };
  }
  return { auth: false, user: null };
};
