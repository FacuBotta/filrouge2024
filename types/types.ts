import { User, UserInvitations } from '@prisma/client';

/* ========================================================================== */
/* ============================ GENERAL TYPES =========================== */
/* ========================================================================== */
export interface ScoreGiverRef {
  getScore: () => number;
}
/* ========================================================================== */
/* ============================ CONVERSATION TYPES =========================== */
/* ========================================================================== */
export type UserRole = 'GUEST' | 'CREATOR';

export interface Participant {
  id: string;
  name: string | null;
  username: string | null;
  email: string | null;
  image: string | null;
  joinedAt?: Date;
  updatedAt: Date;
  role?: UserRole;
}
export type InvitationStatus =
  | 'WAITING_CREATOR_RESPONSE'
  | 'WAITING_PARTICIPANT_RESPONSE'
  | 'JOINED'
  | 'DISJOINED'
  | 'DECLINED_BY_CREATOR'
  | 'DECLINED_BY_PARTICIPANT';

export interface Invitation {
  id: string;
  participantId: string;
  creatorId: string;
  eventId: string;
  status: InvitationStatus;
  conversationId: string;
  createdAt: Date;
}
export interface Message {
  id: string;
  content: string;
  invitation: Invitation | null;
  createdAt: Date;
  updatedAt: Date;
  sender: Participant;
}

export interface Conversation {
  id: string;
  title: string | null;
  createdAt: Date;
  updatedAt: Date;
  participants?: Participant[];
  event?: { id: string; title: string };
  eventId?: string | null;
  messages?: Message[];
  unreadMessages?: number;
}

/* ========================================================================== */
/* ============================ USER TYPES ================================== */
/* ========================================================================== */
export interface Comment {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  rating: {
    score: number;
  } | null;
  author: {
    id: string;
    username: string | null;
    image: string | null;
    _count: {
      Ratings: number;
    };
  };
}
export interface BasicProfileInformation {
  id: string;
  email: string | null;
  username: string | null;
  image: string | null;
  description: string | null;
  _count: {
    EventsCreated: number;
    Ratings: number;
  };
}

export type RegisteredUsers = Pick<
  User,
  'id' | 'email' | 'name' | 'username' | 'image'
>;

export interface UserJoinedEvent {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  eventStart: Date;
  eventEnd: Date | null;
  createdAt: Date;
  updatedAt: Date;
  category: {
    id: string;
    title: string;
    description: string;
  };
}
/* ========================================================================== */
/* ============================ EVENT TYPES ================================= */
/* ========================================================================== */
export interface EventCoordinates {
  lat?: number;
  lng?: number;
}
export interface EventAddress {
  url?: string;
  lat?: number;
  lng?: number;
  formattedAddress?: string;
  vicinity?: string;
}
// TODO: quitar esta interface
export interface UserInvitation {
  id: string;
  userId: string;
  eventId: string;
  status: string;
  conversationId: string;
  createdAt: Date;
}
type EventParticipant = {
  userId: string;
};
type Tasks = {
  id: string;
  content: string;
  userId: string;
  completed: boolean;
  createdAt: Date;
  order: number;
  eventId: string | null;
};
export interface EventWithUserAndCount {
  id: string;
  title: string;
  description: string | null;
  eventStart: Date;
  eventEnd: Date | null;
  isPublic: boolean | null;
  image: string | null;
  locationUrl: string | null;
  lat: number | null;
  lng: number | null;
  vicinity: string | null;
  formattedAddress: string | null;
  createdAt: Date;
  updatedAt: Date;
  Tasks?: Tasks[];
  participants?: EventParticipant[];
  conversation: { id: string } | null;
  UserInvitations?: Invitation[];
  category: {
    id: string;
    title: string;
  };
  user?: BasicProfileInformation;
  _count: {
    participants: number | null;
  };
}
export interface NewEventForm {
  categoryId: string;
  title: string;
  description: string;
  eventStart: Date;
  eventEnd: Date | null;
  isPublic: boolean;
  participants: string[];
  address: EventAddress;
  image: File | null;
}

export interface EventByUser {
  id: string;
  title: string;
  image: string | null;
  description: string | null;
  eventStart: Date;
  eventEnd: Date | null;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  Tasks?: Tasks[];
  conversation: { id: string } | null;
  category: {
    id: string;
    title: string;
  };
  _count: {
    participants: number;
  };
}
export interface EventCreator {
  id: string;
  username: string | null;
  image: string | null;
}
export interface BasicEventData {
  id: string;
  title: string;
  description: string | null;
  creator?: EventCreator;
  eventStart: Date;
  eventEnd: Date | null;
  isPublic: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  conversation: { id: string } | null;
  participants?: { userId: string }[] | null;
  formattedAddress: string | null;
  tasks?: Tasks[] | null;
  UserInvitations?: Partial<UserInvitations>[] | null;
  category: {
    id: string;
    title: string;
  };
  _count?: {
    participants: number;
  };
}
export interface UserComment {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  author: { id: string; username: string | null; image: string | null };
  rating?: { score: number } | null;
}
export interface UserData {
  id: string;
  email: string | null;
  username: string | null;
  image: string | null;
  description: string | null;
  eventsCreated: BasicEventData[];
  eventsJoined: BasicEventData[];
  tasks: Tasks[];
  comments: UserComment[];
  score: number;
}
