import { checkIsAuthenticated } from '@/actions/authServerActions/checkIsAuthenticated';
import { auth } from '@/lib/auth/authConfig';
import { redirect } from 'next/navigation';

const DashboardPage: React.FC = async () => {
  const userAuthenticated = await checkIsAuthenticated();
  if (userAuthenticated && !userAuthenticated.password) {
    redirect('/complete-profile');
  }
  /* console.log(
    'userAuthenticated from dashboard profile page',
    userAuthenticated
  ); */

  return (
    <div className="min-h-screen w-full p-10 flex gap-2">
      Dashboard Profile initial page
    </div>
  );
};

export default DashboardPage;
