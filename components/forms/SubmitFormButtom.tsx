'use client';

import { useFormStatus } from 'react-dom';

interface SubmitButtonProps {
  text: string;
  loadingText: string;
  className?: string;
}

export default function SubmitButton({
  text,
  loadingText,
  className,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={`primary-btn ${className}`}>
      {pending ? loadingText : text}
    </button>
  );
}
