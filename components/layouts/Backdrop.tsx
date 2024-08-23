"use client"
import { useEffect } from "react";
export default function Backdrop(children: React.ReactNode) {

  useEffect(() => {
    document.body.classList.add('no_scroll');
    return () => {
      document.body.classList.remove('no_scroll');
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center"
    >
      {children}
    </div>
  );
}