import { checkIsAuthenticated } from '@/actions/authServerActions/checkIsAuthenticated';
import CategoryNav from '@/components/ui/CategoryNav';
import DashboardNav from '@/components/ui/dashboard/DashboardNav';
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
    <main className="dashboard-main">
      <DashboardNav userAuthenticated={userAuthenticated} />
      <div className="dashboard-children flex mt-12 mb-7 gap-10 ">
        <CategoryNav categories={categories} />
        {children}
      </div>
    </main>
  );
}
