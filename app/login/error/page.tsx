import React from 'react';
import AccessDeniedImage from '@/public/images/AccessDeniedImage';
import Link from 'next/link';

export default async function ErrorPage({
  params,
}: {
  params: Promise<{ error: string }>;
}) {
  let message = '';
  const { error } = await params;

  if (error === 'Verification') {
    message = 'Le lien de vérification est invalide ou expiré';
  } else {
    message = 'Une erreur est survenue';
  }

  return (
    <main className="min-h-screen px-3 flex flex-col gap-10 items-center justify-center bg-light-ciel dark:bg-dark-bg">
      <h1 className="text-3xl font-bold ">{message}</h1>
      <div className="w-full sm:w-[60%] max-w-[300px] flex">
        <AccessDeniedImage />
      </div>
      <Link className="primary-btn" href={'/'}>
        Accueil
      </Link>
    </main>
  );
}
