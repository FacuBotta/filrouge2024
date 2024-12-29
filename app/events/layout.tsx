import { checkIsAuthenticated } from '@/actions/authServerActions/checkIsAuthenticated';
import DashboardNav from '@/components/ui/dashboard/DashboardNav';
import CategoryNav from '@/components/ui/CategoryNav';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';

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
  console.log(categories);
  return (
    <main className="dashboard-main">
      <DashboardNav userAuthenticated={userAuthenticated} />
      <div className="dashboard-children flex mt-12 mb-7">
        <CategoryNav categories={categories} />
        {children}
      </div>
    </main>
  );
}
