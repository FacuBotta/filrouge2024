import React from 'react';

export default async function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-start items-start mt-10 min-h-screen gap-10 max-w-max w-full mx-auto">
      {children}
    </div>
  );
}
