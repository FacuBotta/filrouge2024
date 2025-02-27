/* 
=============== Event Service Types ===============
*/

import { Tasks, UserInvitations } from '@prisma/client';
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
  eventId: string;
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

/* 
=============== User Service Types ===============
*/
export interface CommentCreatorService {
  id: string;
  username: string | null;
  image: string | null;
}
export interface CommentService {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  recipientId: string;
  author: CommentCreatorService;
  rating?: { score: number } | null;
}
export interface EventCreatorService {
  id: string;
  username: string | null;
  image: string | null;
}
export interface BasicEventDataService {
  id: string;
  title: string;
  description: string | null;
  user?: EventCreatorService;
  eventStart: Date;
  eventEnd: Date | null;
  isPublic: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  conversation: { id: string } | null;
  participants?: { userId: string }[] | null;
  UserInvitations?: Partial<UserInvitations>[] | null;
  formattedAddress: string | null;
  category: {
    id: string;
    title: string;
  };
  _count?: {
    participants: number;
  };
}
export interface UserDataService {
  id: string;
  email: string | null;
  username: string | null;
  image: string | null;
  description: string | null;
  EventsCreated: BasicEventDataService[];
  EventsJoined: { event: BasicEventDataService }[];
  Tasks: Tasks[];
  CommentsReceived: CommentService[];
}
