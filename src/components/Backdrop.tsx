"use client"
import { useEffect } from "react";
export default function Backdrop({children, onClick}: {children: React.ReactNode, onClick: () => void}) {

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        onClick();
      }
    });
    document.body.classList.add('no_scroll');
    return () => {
      document.body.classList.remove('no_scroll');
    };
  }, []);

  const handleClick = (e : React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClick();
    }
  };
  return (
    <div 
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center"
      onClick={handleClick}
    >
      {children}
    </div>
  );
}