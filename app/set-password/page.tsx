import PasswordForm from '@/components/forms/passwordForm';
import { checkIsAuthenticated } from '@/actions/authServerActions/checkIsAuthenticated';
import { redirect } from 'next/navigation';
import Backdrop from '@/components/layouts/Backdrop';

export default async function SetPasswordPage() {
  const userAuthenticated = await checkIsAuthenticated();
  if (!userAuthenticated) {
    redirect('/login');
  }
  return (
    <div className="bg-light-ciel dark:bg-dark-bg h-screen">
      <Backdrop>
        <div className="flex flex-col items-center justify-center self-start gap-10 p-24 ">
          <h1 className="text-6xl font-bold text-light-grey">
            Bienvenue sur EventHub !
          </h1>
          <p className="text-light-grey text-2xl">
            Vous devez d&lsquo;abord créer un mot de passe pour pouvoir
            commencer.
          </p>
          <PasswordForm id={userAuthenticated.id} />
        </div>
      </Backdrop>
    </div>
  );
}
