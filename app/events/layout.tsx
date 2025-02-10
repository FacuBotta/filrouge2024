import CategoryNav from '@/components/ui/CategoryNav';
import prisma from '@/lib/prisma';
import React from 'react';

export default async function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      title: true,
      _count: {
        select: {
          Events: true,
        },
      },
    },
  });
  return (
    <div className="flex mt-10 min-h-screen gap-10 max-w-max w-full mx-auto sm:pl-10 ">
      <div className="hidden sm:block">
        <CategoryNav categories={categories} />
      </div>
      <div className="w-full min-h-full md:border-l p-2 ">{children}</div>
    </div>
  );
}
