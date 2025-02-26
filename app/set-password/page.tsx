import { checkIsAuthenticated } from '@/actions/authServerActions/checkIsAuthenticated';
import PasswordForm from '@/components/forms/passwordForm';
import Backdrop from '@/components/layouts/Backdrop';
import { redirect } from 'next/navigation';

export default async function SetPasswordPage() {
  const { user } = await checkIsAuthenticated();
  if (!user) {
    redirect('/login');
  }
  const isUpdate = user?.hasPassword || false;
  return (
    <div className="bg-light-ciel dark:bg-dark-bg h-screen">
      <Backdrop>
        <div className="flex flex-col items-center justify-center self-start gap-10 p-24 ">
          <h1 className="text-6xl font-bold text-light-grey text-balance text-center">
            {isUpdate
              ? 'Modification de mot de passe'
              : 'Bienvenue sur EventHub !'}
          </h1>
          <div className="text-center text-light-grey">
            <p className="text-2xl">
              {isUpdate
                ? 'Tu peux choisir un nouveau mot de passe'
                : "Vous devez d'abord créer un mot de passe pour pouvoir commencer."}
            </p>
          </div>
          <PasswordForm isUpdate={user.hasPassword} id={user.id} />
        </div>
      </Backdrop>
    </div>
  );
}
