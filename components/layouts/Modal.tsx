import React from 'react';

export default function Modal ({ children }: {children: React.ReactNode}) {
  return (
    <div className="fixed top-0 left-0 max-h-screen inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      {children}
    </div>
  );
}
