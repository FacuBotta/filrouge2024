'use client';

import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick?: () => void;
  /** The width of the button, default is fit-content */
  width?: string;
  /** The type of button */
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
};

export default function Button({
  onClick,
  width,
  children,
  type,
}: ButtonProps) {
  return (
    <button
      type={type || 'button'}
      style={{ width: width || 'fit-content' }}
      onClick={onClick}
      className="inline-flex items-center justify-center px-4 py-1 border-2 text-lg rounded-lg bg-light-yellow text-dark-bg font-bold border-dark-bg hover:shadow-lg  transition-transform duration-300 ease-in-out "
    >
      {children}
    </button>
  );
}
