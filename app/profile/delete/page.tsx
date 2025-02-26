import { checkIsAuthenticated } from '@/actions/authServerActions/checkIsAuthenticated';
import DeleteProfileForm from '@/components/forms/DeleteProfileForm';
import Backdrop from '@/components/layouts/Backdrop';
import IconWrapper from '@/components/ui/IconWrapper';
import { Link } from 'next-view-transitions';
import { redirect } from 'next/navigation';

const DeleteProfilePage = async () => {
  const { user } = await checkIsAuthenticated();
  if (!user || !user.id) {
    redirect('/login');
  }

  return (
    <Backdrop>
      <div className="flex flex-col items-center justify-center p-10 mt-[150px] sm:mt-[180px] mb-5 w-full max-w-[900px] mx-2 bg-light-ciel relative rounded-xl border-2 border-light-yellow dark:bg-dark-bg ">
        <Link href="/profile">
          <IconWrapper
            type="plus"
            strokeWidth={2}
            className="transform rotate-45 absolute right-[10px] top-[10px]"
          />
        </Link>
        <h1 className="text-3xl font-semibold">Tu va nous manquer 😢</h1>
        <div className="items-center justify-center gap-5 min-h-[200px] w-full max-w-[500px] mx-auto mt-5">
          <DeleteProfileForm id={user.id} />
        </div>
      </div>
    </Backdrop>
  );
};

export default DeleteProfilePage;
