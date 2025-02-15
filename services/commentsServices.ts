import prisma from '@/lib/prisma';
import { Comment } from '@/types/types';

export const createCommentService = async ({
  content,
  authorId,
  recipientId,
  score,
}: {
  content: string;
  authorId: string;
  recipientId: string;
  score: number;
}) => {
  try {
    const comment = await prisma.comments.create({
      data: {
        content,
        authorId,
        recipientId,
      },
    });
    const rating = await prisma.ratings.create({
      data: {
        userId: recipientId,
        score,
        commentId: comment.id,
      },
    });
    return { comment, rating };
  } catch (error) {
    console.error('createCommentService error: ', error);
    return null;
  }
};

export const selectUserReceivedCommentsService = async ({
  userId,
}: {
  userId: string;
}): Promise<Comment[] | null> => {
  try {
    const comments = await prisma.comments.findMany({
      where: {
        recipientId: userId,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        rating: {
          select: {
            score: true,
          },
        },
        author: {
          select: {
            id: true,
            username: true,
            image: true,
            _count: {
              select: {
                Ratings: true,
              },
            },
          },
        },
      },
    });
    return comments;
  } catch (error) {
    console.error('selectCommentsByUserIdService', error);
    return null;
  }
};
