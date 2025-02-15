'use server';

import { auth } from '@/lib/auth/authConfig';
import { createCommentService } from '@/services/commentsServices';

interface makeCommentResponse {
  ok: boolean;
  message: string;
}

/**
 * Creates a comment with an associated score.
 *
 * @param {string} content - The content of the comment.
 * @param {string} recipientId - The ID of the user receiving the comment.
 * @param {number} score - The score given (e.g., 1-5).
 * @returns {Promise<makeCommentResponse>} - An object containing `ok` (boolean) indicating success or failure, and `message` with the result description.
 * @throws {Error} - Throws an error if there is no active user session.
 */
export async function makeComment(
  content: string,
  recipientId: string,
  score: number
): Promise<makeCommentResponse> {
  const session = await auth();
  if (!session) {
    console.error('makeComment: no session found');
    throw new Error('no session found');
  }

  try {
    await createCommentService({
      content,
      authorId: session.user.id,
      recipientId,
      score,
    });
    return { ok: true, message: 'Comment successfully created' };
  } catch (error) {
    console.error(error);
    return { ok: false, message: 'Error creating the comment' };
  }
}
