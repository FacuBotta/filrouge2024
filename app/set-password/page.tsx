import PasswordForm from '@/components/forms/passwordForm';
import { checkIsAuthenticated } from '@/actions/authServerActions/checkIsAuthenticated';
import { redirect } from 'next/navigation';
import Backdrop from '@/components/layouts/Backdrop';

export default async function SetPasswordPage() {
  const userAuthenticated = await checkIsAuthenticated();
  console.log(userAuthenticated);
  if (!userAuthenticated) {
    redirect('/login');
  }
  const isUpdated = userAuthenticated.password !== null;
  return (
    <div className="bg-light-ciel dark:bg-dark-bg h-screen">
      <Backdrop>
        <div className="flex flex-col items-center justify-center self-start gap-10 p-24 ">
          <h1 className="text-6xl font-bold text-light-grey">
            {isUpdated
              ? 'Modification de mot de passe'
              : 'Bienvenue sur EventHub !'}
          </h1>
          <div className="text-center text-light-grey">
            <p className="text-2xl">
              {isUpdated
                ? 'Tu peux choisir un nouveau mot de passe'
                : "Vous devez d'abord créer un mot de passe pour pouvoir commencer."}
            </p>
            <span className="text-sm">
              (1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial)
            </span>
          </div>
          <PasswordForm isUpdated={isUpdated} id={userAuthenticated.id} />
        </div>
      </Backdrop>
    </div>
  );
}
