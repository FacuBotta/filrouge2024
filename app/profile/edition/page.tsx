import { checkIsAuthenticated } from '@/actions/authServerActions/checkIsAuthenticated';
import selectUserById from '@/actions/userServerActions/selectUserById';
import { EditProfileForm } from '@/components/forms/EditProfileForm';
import Backdrop from '@/components/layouts/Backdrop';
import IconWrapper from '@/components/ui/IconWrapper';
import { Link } from 'next-view-transitions';
import { redirect } from 'next/navigation';
const EditProfilePage = async () => {
  const { user } = await checkIsAuthenticated();

  const userData = await selectUserById(user?.id as string);
  if (!userData) {
    redirect('/login');
  }
  const { description, username, image } = userData;

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
        <h1 className="text-3xl font-semibold">Edition de mon profil</h1>
        <div className="items-center justify-center gap-5 w-full max-w-[500px] mx-auto">
          <EditProfileForm
            username={username}
            image={image as string}
            description={description as string}
          />
          <Link
            className="w-full flex justify-center mt-5"
            href={'/set-password'}
          >
            Modifier mon mot de passe
          </Link>
          <Link
            className="w-full flex justify-center text-red-600"
            href={'/profile/delete'}
          >
            Supprimer mon compte
          </Link>
        </div>
      </div>
    </Backdrop>
  );
};

export default EditProfilePage;
