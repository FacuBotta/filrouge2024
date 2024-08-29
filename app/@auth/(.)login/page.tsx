import LogForm from '@/components/forms/LogForm';
import React from 'react';
import Backdrop from '@/components/layouts/Backdrop';
import { checkIsAuthenticated } from '@/actions/authServerActions/checkIsAuthenticated';
import { redirect } from 'next/navigation';

const LoginPage: React.FC = async () => {
  const isAuthenticated = await checkIsAuthenticated();
  if (isAuthenticated) {
    redirect('/dashboard');
  } else {
    return (
      <Backdrop>
        <LogForm/>
      </Backdrop>
    );
  }
};

export default LoginPage;
