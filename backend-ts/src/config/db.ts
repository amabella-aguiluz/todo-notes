<<<<<<< HEAD
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
=======
// import { PrismaClient } from '@prisma/client';

// export const prisma = new PrismaClient({
//   adapter: {
//     url: process.env.DATABASE_URL!,
//   },
// });
>>>>>>> d23a76f55ae530477bcd5025d0600cab91740e4e
