import { PrismaClient } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended';
import { expect } from '@jest/globals';
import {
  selectAllUsersService,
  selectUserByEmailService,
  selectUserByIdService,
  updateUserService,
} from './userServices';
import {
  getAllUsersServiceSchema,
  getUserServiceSchema,
} from '@/lib/zod/zodSchemas';

jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

const prismaMock = jest.requireMock('@/lib/prisma').default;

const mockUser = {
  id: '1',
  email: 'user@example.com',
  username: 'testuser',
  password: 'secretpassword',
  image: null,
  description: null,
  _count: { Ratings: 2, EventsCreated: 1 },
};

const mockUsers = [
  {
    id: '1',
    email: 'user1@example.com',
    password: '123456',
    username: 'testuser1',
    image: null,
    description: null,
    _count: { Ratings: 2, EventsCreated: 1 },
  },
  {
    id: '2',
    email: 'user2@example.com',
    password: '123456',
    username: 'testuser2',
    image: null,
    description: null,
    _count: { Ratings: 0, EventsCreated: 3 },
  },
];
describe('User Services', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('UpdateUserService', () => {
    it('should update a user successfully', async () => {
      const newData = {
        username: 'newUserName',
        description: 'new description',
      };

      prismaMock.user.update.mockResolvedValue({
        ...mockUser,
        ...newData,
      });

      const result = await updateUserService({
        id: '1',
        data: newData,
      });

      expect(prismaMock.user.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: newData,
      });
      expect(result).toEqual({
        ...mockUser,
        ...newData,
      });
    });
  });
  describe('selectUserByIdService', () => {
    it('should select a user by id successfully (zod schema ok and password not returned)', async () => {
      prismaMock.user.findUnique.mockResolvedValue(mockUser);

      const result = await selectUserByIdService({ id: '1' });

      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
        select: {
          id: true,
          email: true,
          username: true,
          image: true,
          description: true,
          _count: {
            select: {
              EventsCreated: true,
              Ratings: true,
            },
          },
        },
      });
      expect(getUserServiceSchema.safeParse(result).success).toBe(true);
      expect(result).not.toHaveProperty('password');
      expect(result).toEqual(
        expect.objectContaining({
          id: mockUser.id,
          email: mockUser.email,
          username: mockUser.username,
          image: mockUser.image,
          description: mockUser.description,
          _count: mockUser._count,
        })
      );
      expect(result).not.toBeNull();
      expect(Object.keys(result!)).not.toContain('password');
    });

    it('should return null when user is not found', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      const result = await selectUserByIdService({ id: '1' });

      expect(result).toBeNull();
    });
  });
  describe('selectUserByEmailService', () => {
    it('should select a user by email successfully', async () => {
      prismaMock.user.findUnique.mockResolvedValue(mockUser);

      const result = await selectUserByEmailService({
        email: 'user@example.com',
      });

      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'user@example.com' },
        select: expect.anything(),
      });
      expect(getUserServiceSchema.safeParse(result).success).toBe(true);
    });

    it('should return null when user is not found', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      const result = await selectUserByEmailService({
        email: 'user@example.com',
      });

      expect(result).toBeNull();
    });
  });

  describe('selectAllUsersService', () => {
    const originalError = console.error;

    beforeAll(() => {
      console.error = jest.fn();
    });

    afterAll(() => {
      console.error = originalError;
    });
    it('should select all users successfully', async () => {
      prismaMock.user.findMany.mockResolvedValue(mockUsers);

      const result = await selectAllUsersService();

      expect(prismaMock.user.findMany).toHaveBeenCalledWith({
        select: {
          id: true,
          email: true,
          username: true,
          image: true,
          description: true,
          _count: {
            select: {
              Ratings: true,
              EventsCreated: true,
            },
          },
        },
      });
      expect(() => getAllUsersServiceSchema.parse(result)).not.toThrow();
    });

    it('should return null when there is an error', async () => {
      prismaMock.user.findMany.mockRejectedValue(new Error('Error'));

      const result = await selectAllUsersService();

      expect(result).toBeNull();
    });
  });
});
