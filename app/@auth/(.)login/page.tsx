import LogForm from '@/components/forms/LogForm';
import Backdrop from '@/components/layouts/Backdrop';
import React from 'react';

const LoginPage: React.FC = async () => {
  /* const { auth } = await checkIsAuthenticated();
  if (auth) {
    redirect('/profile');
  }
 */
  return (
    <Backdrop>
      <LogForm />
    </Backdrop>
  );
};

export default LoginPage;
