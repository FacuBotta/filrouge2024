import { auth } from '@/lib/auth/authConfig';
import { selectAllUsersService } from '@/services/userServices';
import { BasicProfileInformation } from '@/types/types';

export const selectAllBasicUserInfos = async (): Promise<
  BasicProfileInformation[] | []
> => {
  const session = await auth();
  if (!session) {
    console.error('selectAllBasicUserInfos: no session found');
    return [];
  }
  try {
    const users = await selectAllUsersService();
    if (!users) {
      return [];
    }
    // ADAPTER
    // Check to not return users with null values
    return users.filter(
      (user): user is BasicProfileInformation =>
        user.id !== session?.user?.id &&
        user.username !== null &&
        user.email !== null &&
        user.image !== null &&
        user.description !== null
    );
  } catch (error) {
    console.error(error);
    return [];
  }
};
