import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const numberOfUsers = 10;
  for (let i = 0; i < numberOfUsers; i++) {
    await prisma.user.create({
      data: {
        email: `user${i}@example.com`,
        name: `User ${i}`,
        username: `user${i}`,
        password: 'lalala',
      },
    });
  }
  console.log('Seeded users');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
