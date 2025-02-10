import prisma from '@/lib/prisma';
import { UserInvitations } from '@prisma/client';
import {
  createUserInvitationServiceProps,
  updateUserInvitationServiceProps,
} from '@/types/servicesTypes/types';

export const createUserInvitationService = async (
  invitationProps: createUserInvitationServiceProps
): Promise<UserInvitations> => {
  try {
    const newUserInvitation = await prisma.userInvitations.create({
      data: invitationProps,
    });
    return newUserInvitation;
  } catch (error) {
    console.error('createUserInvitationService: error', error);
    throw new Error('Service error: createUserInvitationService');
  }
};

export const updateUserInvitationService = async ({
  participantId,
  eventId,
  status,
}: updateUserInvitationServiceProps): Promise<UserInvitations> => {
  try {
    const userInvitation = await prisma.userInvitations.update({
      where: { participantId_eventId: { participantId, eventId } },
      data: { status },
    });
    return userInvitation;
  } catch (error) {
    console.error('updateUserInvitationService: error', error);
    throw new Error('Service error: updateUserInvitationService');
  }
};
