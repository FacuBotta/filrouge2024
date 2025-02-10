import { checkIsAuthenticated } from '@/actions/authServerActions/checkIsAuthenticated';
import LogForm from '@/components/forms/LogForm';
import Backdrop from '@/components/layouts/Backdrop';
import { redirect } from 'next/navigation';
import React from 'react';

const LoginPage: React.FC = async () => {
  const { auth } = await checkIsAuthenticated();
  if (auth) {
    redirect('/profile');
  } else {
    return (
      <Backdrop>
        <LogForm />
      </Backdrop>
    );
  }
};

export default LoginPage;
