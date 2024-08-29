'use client';
import { handleSignOut } from '@/actions/authServerActions/signOutServerAction';
import React from 'react';

export const SignOutButton: React.FC = () => {
  return <button onClick={() => handleSignOut()}>Log out!</button>;
};

export default SignOutButton;
