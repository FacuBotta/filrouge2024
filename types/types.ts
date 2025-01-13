import { User } from '@prisma/client';

// Conversation types for messages
export interface Participant {
  id: string;
  name: string | null;
  username: string | null;
  email: string | null;
  image: string | null;
  joinedAt?: Date;
  updatedAt: Date;
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

export interface Message {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  sender: Participant;
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
  eventEnd: Date;
  createdAt: Date;
  updatedAt: Date;
  category: {
    id: string;
    title: string;
    description: string;
  };
}

export interface EventWithUserAndCount {
  id: string;
  title: string;
  description: string | null;
  eventStart: Date;
  eventEnd: Date;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  category: {
    id: string;
    title: string;
  };
  user: {
    id: string;
    image: string | null;
    username: string | null;
    _count?: {
      Ratings: number;
    };
  };
  _count: {
    participants: number;
  };
}
