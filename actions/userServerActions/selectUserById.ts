'use server';

import { selectUserDataService } from '@/services/userServices';
import { UserDataService } from '@/types/servicesTypes/types';
import { UserData } from '@/types/types';
import { mapUserData } from '@/utils/adapters/userAdapters';

export default async function selectUserById(
  id: string
): Promise<UserData | null> {
  try {
    const userData: UserDataService | null = await selectUserDataService({
      id,
    });
    if (!userData) return null;
    const parsedUserData = mapUserData(userData);
    return parsedUserData;
  } catch (error) {
    console.error(error);
    return null;
  }
}
