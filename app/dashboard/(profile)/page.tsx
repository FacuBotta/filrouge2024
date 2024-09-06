import { checkIsAuthenticated } from '@/actions/authServerActions/checkIsAuthenticated';
import SignOutButton from '@/components/ui/dashboard/sigOutButton';

const DashboardPage: React.FC = async () => {
  const userAuthenticated = await checkIsAuthenticated();

  /* console.log(
    'userAuthenticated from dashboard profile page',
    userAuthenticated
  ); */

  return (
    <section className="min-h-[95%] w-full flex items-start justify-start">
      Dashboard Profile initial page
      <SignOutButton />
    </section>
  );
};

export default DashboardPage;
