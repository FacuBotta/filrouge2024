import { User } from '@prisma/client';

/* ========================================================================== */
/* ============================ CONVERSATION TYPES =========================== */
/* ========================================================================== */
export interface Participant {
  id: string;
  name: string | null;
  username: string | null;
  email: string | null;
  image: string | null;
  joinedAt?: Date;
  updatedAt: Date;
}
export interface Message {
  id: string;
  content: string;
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
  messages?: Message[];
  unreadMessages?: number;
  role?: string;
}

/* ========================================================================== */
/* ============================ USER TYPES ================================== */
/* ========================================================================== */

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
  category: {
    id: string;
    title: string;
  };
  user: BasicProfileInformation;
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
  category: {
    id: string;
    title: string;
  };
  _count: {
    participants: number;
  };
}
