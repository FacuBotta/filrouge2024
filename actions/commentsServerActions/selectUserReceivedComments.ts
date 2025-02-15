'use server';

import { selectUserReceivedCommentsService } from '@/services/commentsServices';
import { Comment } from '@/types/types';

export default async function selectUserReceivedComments({
  userId,
}: {
  userId: string;
}): Promise<Comment[] | []> {
  try {
    const comments = await selectUserReceivedCommentsService({ userId });
    return comments || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
