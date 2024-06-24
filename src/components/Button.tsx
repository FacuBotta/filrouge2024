"use client";
export default function Button({ children, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center w-fit justify-center px-4 py-1 border border-transparent text-lg rounded-lg bg-light-yellow text-dark-bg font-bold"
    >
      {children}
    </button>
  );
}