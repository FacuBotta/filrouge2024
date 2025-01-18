import { checkIsAuthenticated } from '@/actions/authServerActions/checkIsAuthenticated';
import CategoryNav from '@/components/ui/CategoryNav';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userAuthenticated = await checkIsAuthenticated();
  if (!userAuthenticated) {
    redirect('/login');
  }
  if (userAuthenticated && !userAuthenticated.password) {
    redirect('/set-password');
  }

  const categories = await prisma.category.findMany({
    select: {
      id: true,
      title: true,
      _count: {
        select: {
          Events: true,
        },
      },
    },
  });
  return (
    <div className="flex mt-20 min-h-screen gap-10 max-w-max w-full mx-auto ">
      <CategoryNav categories={categories} />
      <div className="w-full min-h-full md:border-l p-5 ">{children}</div>
    </div>
  );
}
