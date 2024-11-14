import { checkIsAuthenticated } from '@/actions/authServerActions/checkIsAuthenticated';
import { redirect } from 'next/navigation';
import Backdrop from '@/components/layouts/Backdrop';
import { updateUserProfile } from '@/actions/userServerActions/updateUserProfile';
import IconWrapper from '@/components/ui/IconWrapper';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { DefaultUserAvatar } from '@/public/images/DefaultUserAvatar';

const EditProfilePage = async () => {
  const userAuthenticated = await checkIsAuthenticated();
  if (!userAuthenticated) {
    redirect('/login');
  }
  const { username, image, description } = userAuthenticated;

  return (
    <Backdrop>
      <div className="flex flex-col items-center justify-center p-10 mt-[150px] sm:mt-[180px] mb-5 w-full max-w-[900px] mx-2 bg-light-ciel relative rounded-xl border-2 border-light-yellow dark:bg-dark-bg ">
        <Link href="/dashboard">
          <IconWrapper
            type="plus"
            strokeWidth={2}
            className="transform rotate-45 absolute right-[10px] top-[10px]"
          />
        </Link>
        <h1 className="text-3xl font-semibold">Edition de votre profil</h1>
        {image ? (
          <Image
            src={image as string}
            alt="user avatar"
            width={220}
            height={220}
            className="rounded-full border-2 border-dark-bg dark:border-white my-5"
          />
        ) : (
          <DefaultUserAvatar className="size-full rounded-full my-5" />
        )}
        <div className="items-center justify-center gap-5 w-full max-w-[500px] mx-auto">
          <form className="flex flex-col gap-5 mt-2" action={updateUserProfile}>
            <input
              className="p-2 border-2 rounded-lg border-dark-bg dark:border-white"
              type="text"
              name="username"
              defaultValue={username as string}
              placeholder="Username"
            />
            <input
              className="p-2 border-2 rounded-lg border-dark-bg dark:border-white"
              type="text"
              name="image"
              defaultValue={image as string}
              placeholder="Le URL de ta photo"
            />
            <textarea
              className="p-2 border-2 rounded-lg border-dark-bg dark:border-white"
              name="description"
              rows={6}
              maxLength={300}
              defaultValue={description as string}
              placeholder="Donne une petite description de toi pour partager avec le reste de la communauté! (max 300 caractères)"
            />
            <button type="submit" className="primary-btn !w-full">
              Sauvegarder
            </button>
          </form>
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
