'use server';

import { auth } from '@/lib/auth/authConfig';
import { createUserEventService } from '@/services/userEventServices';

/**
 * Adds the authenticated user to an event.
 *
 * - Checks if the user is authenticated.
 * - Creates an entry in the `userEvents` table to associate the user with the event.
 *
 * @param {string} eventId - The ID of the event to join.
 * @returns {Promise<{ ok: boolean }>} - Returns `{ ok: true }` if the operation is successful, `{ ok: false }` otherwise.
 *
 * @throws {Error} If the user is not authenticated or `eventId` is missing.
 */
export const joinUserToEvent = async (eventId: string) => {
  try {
    const session = await auth();
    if (!session || !session.user?.id || !eventId) {
      throw new Error('No session found or missing data');
    }

    // Add the user to the event
    await createUserEventService({ userId: session.user.id, eventId });

    return { ok: true };
  } catch (error) {
    console.error('joinUserToEvent: error', error);
    return { ok: false };
  }
};
