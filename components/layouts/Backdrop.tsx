'use client';
import React, { useEffect } from 'react';

export default function Backdrop({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  return (
    <div className="no-scrollbar pt-[100px] fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center overflow-y-scroll">
      {children}
    </div>
  );
}
