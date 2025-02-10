/* 
=============== Event Service Types ===============
*/

import { InvitationStatus } from '../types';

export interface createEventServiceProps {
  userId: string;
  categoryId: string;
  title: string;
  description: string;
  eventStart: Date;
  eventEnd: Date | null;
  isPublic: boolean;
  image: string;
  locationUrl: string;
  lat: number;
  lng: number;
  vicinity: string;
  formattedAddress: string;
}

/* 
=============== User Event Service Types ===============
*/
export interface createUserEventServiceProps {
  userId: string;
  eventId: string | null;
}

/* 
=============== Conversation Service Types ===============
*/

export interface createConversationServiceProps {
  title: string;
  eventId?: string | null;
}

/* 
=============== User Invitation Service Types ===============
*/
export interface createUserInvitationServiceProps {
  creatorId: string;
  participantId: string;
  eventId: string;
  status: InvitationStatus;
  conversationId: string;
}
export interface updateUserInvitationServiceProps {
  participantId: string;
  eventId: string;
  status: InvitationStatus;
}

/* 
=============== Message Service Types ===============
*/

export interface createMessageServiceProps {
  content: string;
  conversationId: string;
  invitationId?: string | null;
  senderId: string;
}
