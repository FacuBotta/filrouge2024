import { checkIsAuthenticated } from '@/actions/authServerActions/checkIsAuthenticated';
import selectUserById from '@/actions/userServerActions/selectUserById';
import { EditProfileForm } from '@/components/forms/EditProfileForm';
import Backdrop from '@/components/layouts/Backdrop';
import IconWrapper from '@/components/ui/IconWrapper';
import { UserAvatar } from '@/public/images/UserAvatar';
import { BasicProfileInformation } from '@/types/types';
import { Link } from 'next-view-transitions';
import { redirect } from 'next/navigation';
const EditProfilePage = async () => {
  const { user } = await checkIsAuthenticated();

  const userData: BasicProfileInformation | null = await selectUserById(
    user?.id as string
  );
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
        <h1 className="text-3xl font-semibold">Edition de votre profil</h1>
        <UserAvatar src={image} className="size-32 my-5" />
        <div className="items-center justify-center gap-5 w-full max-w-[500px] mx-auto">
          <EditProfileForm
            username={username as string}
            image={image as string}
            description={description as string}
          />
          <Link className="w-full flex justify-center" href={'/set-password'}>
            {/* TODO: send email to verify the user before changing the password */}
            Changer de mot de passe
          </Link>
        </div>
      </div>
    </Backdrop>
  );
};

export default EditProfilePage;
