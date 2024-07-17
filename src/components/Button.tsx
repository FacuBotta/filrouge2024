"use client";

type ButtonProps = {
  onClick?: () => void;
  /** The width of the button, default is fit-content */
  width?: string;
  /** The type of button */
  type?: 'button' | 'submit' | 'reset';
  children: string;
};

export default function Button({ onClick, width, children, type }: ButtonProps) {
  return (
    <button
      type={type || 'button'}
      style={{ width: width || 'fit-content' }}
      onClick={onClick}
      className="inline-flex items-center justify-center px-4 py-1 border-2 border-transparent text-lg rounded-lg bg-light-yellow text-dark-bg font-bold hover:border-dark-bg dark:hover:border-dark-grey"
    >
      {children}
    </button>
  );
}