import { checkIsAuthenticated } from '@/actions/authServerActions/checkIsAuthenticated';

const DashboardPage: React.FC = async () => {
  const userAuthenticated = await checkIsAuthenticated();

  /* console.log(
    'userAuthenticated from dashboard profile page',
    userAuthenticated
  ); */

  return (
    <section className="min-h-[95%] w-full flex items-start justify-start">
      Dashboard Profile initial page
    </section>
  );
};

export default DashboardPage;
