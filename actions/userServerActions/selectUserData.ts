'use server';

import { auth } from '@/lib/auth/authConfig';
import { selectUserDataService } from '@/services/userServices';
import { UserData } from '@/types/types';
import { mapUserData } from '@/utils/adapters/userAdapters';

/**
 * Selects and maps the user profile data.
 *
 * This function retrieves the profile data of the currently authenticated user,
 * maps it to a more suitable format for use, and returns the transformed data.
 * If no session exists or there is an error, the function will return null.
 *
 * @returns {Promise<UserData | null>} The mapped user profile data, or null if no session is found or if an error occurs.
 *
 * @throws {null} Will log an error message if the user data retrieval fails and returns.
 */
export default async function selectProfileData(): Promise<UserData | null> {
  const session = await auth();

  // If no session or user ID is found, return null
  if (!session || !session.user?.id) {
    return null;
  }

  try {
    const userData = await selectUserDataService({ id: session.user.id });

    if (!userData) return null;

    // Map the user data to the appropriate format
    const mappedUserData = mapUserData(userData);

    return mappedUserData;
  } catch (error) {
    console.error('Error in selectProfileData:', error);
    return null;
  }
}
