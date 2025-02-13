import LogForm from '@/components/forms/LogForm';
import Backdrop from '@/components/layouts/Backdrop';
import React from 'react';
import HomeImage from '../../public/images/HomeImage';

const LoginPage: React.FC = async () => {
  /* const { auth } = await checkIsAuthenticated();
  console.log({ auth });

  if (auth) {
    redirect('/profile');
  } */

  return (
    <>
      <section className="flex items-center justify-center w-full min-h-screen bg-light-ciel dark:bg-dark-bg">
        <div className="flex h-full w-[90%] m-auto items-center justify-center text-center lg:!text-start">
          <div className="text-dark-bg dark:text-dark-grey lg:mr-10 sm:w-[70%] lg:w-[40%] max-w-[500px] ">
            <h1 className="text-[60px] mt-[-20px] sm:text-[80px] font-bold text-nowrap dark:text-dark-greenLight">
              EventHub
            </h1>
            <p className="text-balance">
              <strong>EventHub</strong> est votre solution tout-en-un pour la
              gestion d&apos;événements et de RDV. Simplifiez
              l&apos;organisation de vos activités avec notre interface moderne
              et intuitive. Vous pouvez facilement synchroniser vos événements
              avec Google Calendar, gérer vos tâches, et communiquer avec vos
              collègues. Que vous planifiez un petit rassemblement ou un grand
              événement, EventHub vous offre les outils nécessaires pour réussir
              !
            </p>
            <div className="flex gap-8 mt-4 justify-center lg:!justify-start">
              <div className="inline-flex items-center justify-center px-4 py-1 border-2 border-transparent text-lg rounded-lg bg-light-yellow text-dark-bg font-bold hover:border-dark-bg dark:hover:border-dark-grey">
                Commencer maintenant !
              </div>
            </div>
          </div>
          <HomeImage className="hidden lg:block w-[500px] h-full" />
        </div>
      </section>
      <Backdrop>
        <LogForm />
      </Backdrop>
    </>
  );
};

export default LoginPage;
