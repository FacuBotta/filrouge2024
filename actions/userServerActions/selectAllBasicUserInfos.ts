import { auth } from '@/lib/auth/authConfig';
import { selectAllUsersService } from '@/services/userServices';
import { BasicProfileInformation } from '@/types/types';

export const selectAllBasicUserInfos = async (
  search?: string
): Promise<BasicProfileInformation[] | []> => {
  const session = await auth();
  if (!session) {
    console.error('selectAllBasicUserInfos: no session found');
    return [];
  }
  try {
    const allUsers = await selectAllUsersService();
    if (!allUsers) {
      return [];
    }
    // Check to not return users with null values
    if (!search) {
      return allUsers.filter(
        (user): user is BasicProfileInformation =>
          user.id !== session?.user?.id &&
          user.username !== null &&
          user.email !== null &&
          user.image !== null &&
          user.description !== null
      );
    }
    return allUsers.filter((user): user is BasicProfileInformation =>
      Boolean(
        user.username?.toLowerCase().includes(search.toLowerCase()) ||
          user.email?.toLowerCase().includes(search.toLowerCase())
      )
    );
  } catch (error) {
    console.error(error);
    return [];
  }
};
