import React from 'react';

type BadgeProps = {
  children: React.ReactNode | string;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium' | 'large';
  outline?: boolean;
  rounded?: 'pill' | 'circle';
  className?: string;
  onClick?: () => void;
};

export default function Badge({
  children,
  color = 'primary',
  size = 'medium',
  outline = false,
  rounded = 'pill',
  className = '',
  onClick,
}: BadgeProps) {
  // Configuración de colores
  const variantClasses = {
    primary: {
      bg: 'bg-light-ciel dark:bg-dark-greenLight/70',
      text: 'text-black dark:text-white',
      ring: 'ring-2 ring-light-ciel dark:ring-dark-greenLight',
    },
    secondary: {
      bg: 'bg-purple-100 dark:bg-purple-900/70',
      text: 'text-purple-800 dark:text-purple-100',
      ring: 'ring-2 ring-purple-500',
    },
    success: {
      bg: 'bg-green-100 dark:bg-green-900/70',
      text: 'text-green-800 dark:text-green-100',
      ring: 'ring-2 ring-green-500',
    },
    warning: {
      bg: 'bg-yellow-100 dark:bg-yellow-900/70',
      text: 'text-yellow-800 dark:text-yellow-100',
      ring: 'ring-2 ring-yellow-500',
    },
    error: {
      bg: 'bg-red-100 dark:bg-red-900/70',
      text: 'text-red-800 dark:text-red-100',
      ring: 'ring-2 ring-red-500',
    },
    info: {
      bg: 'bg-blue-100 dark:bg-blue-900/70',
      text: 'text-blue-800 dark:text-blue-100',
      ring: 'ring-2 ring-blue-500',
    },
  };

  // Tamaños
  const sizeClasses = {
    small: 'px-2 py-0.5 text-xs',
    medium: 'px-3 py-1 text-sm',
    large: 'px-4 py-1.5 text-base',
  };

  // Estilo outline
  const outlineClasses = outline
    ? `bg-transparent ${variantClasses[color].text} ${variantClasses[color].ring}`
    : `${variantClasses[color].bg} ${variantClasses[color].text}`;

  // Radio de borde
  const roundedClasses = {
    pill: 'rounded-full',
    circle: 'rounded-lg',
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center font-[500] transition-all cursor-pointer ${
        sizeClasses[size]
      } ${roundedClasses[rounded]} ${outlineClasses} ${className}`}
    >
      {children}
    </div>
  );
}
