'use client';
import { handleSignOut } from '@/actions/authServerActions/signOutServerAction';
import React from 'react';
import IconWrapper from '../IconWrapper';

export const SignOutButton: React.FC = () => {
  return (
    <button onClick={() => handleSignOut()}>
      {/* <IconWrapper type="logOut" strokeWidth={2} /> */}
      Déconnexion
    </button>
  );
};

export default SignOutButton;
