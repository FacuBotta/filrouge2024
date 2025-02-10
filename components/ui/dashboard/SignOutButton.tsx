'use client';
import { handleSignOut } from '@/actions/authServerActions/signOutServerAction';
import React from 'react';

export const SignOutButton: React.FC = () => {
  return (
    <button className="secondary-btn" onClick={() => handleSignOut()}>
      {/* <IconWrapper type="logOut" strokeWidth={2} /> */}
      Déconnexion
    </button>
  );
};

export default SignOutButton;
