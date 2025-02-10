'use server';

import { selectUserByIdService } from '@/services/userServices';
import { BasicProfileInformation } from '@/types/types';

export default async function selectUserById(
  id: string
): Promise<BasicProfileInformation | null> {
  try {
    const user = await selectUserByIdService({ id });
    return user as BasicProfileInformation;
  } catch (error) {
    console.error(error);
    return null;
  }
}
