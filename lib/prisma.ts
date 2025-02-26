import { PrismaClient } from '@prisma/client';
// All this code is a good practice to use prisma in development
// It evitates the need to create a new instance of prisma in each reload of the nextjs server
// In production it is not needed because the server is not reloaded and the prisma instance is only created once
const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.DOTENV !== 'production') globalThis.prismaGlobal = prisma;
