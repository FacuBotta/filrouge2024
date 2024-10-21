import { checkIsAuthenticated } from '@/actions/authServerActions/checkIsAuthenticated';
import DashboardNav from '@/components/ui/dashboard/DashboardNav';
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
  return (
    <main className="dashboard-main">
      <DashboardNav userAuthenticated={userAuthenticated} />
      <div className="dashboard-children">{children}</div>
    </main>
  );
}
