'use client';

import { Link } from 'next-view-transitions';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
interface CategoryNavProps {
  categories: {
    id: string;
    title: string;
  }[];
}

export default function CategoryNav({ categories }: CategoryNavProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const categoryList = (
    <ul className="space-y-2 flex flex-col gap-2 w-full">
      <li className="w-full">
        <Link className="primary-btn w-full" href={'/events/new'}>
          Creer un événement
        </Link>
      </li>
      <li className="w-full">
        <Link
          href="/events"
          className={`block w-full hover:scale-[1.01] transition-transform ease-in-out border ${
            pathname === '/events' ? 'border-light-yellow' : 'border-dark-bg/50'
          } p-2  bg-slate-600/50 rounded-lg shadow-xl`}
        >
          Toutes les catégories
        </Link>
      </li>
      {categories.map((category) => (
        <li key={category.id} className="w-full">
          <Link
            href={`/events/${category.title.toLowerCase().replaceAll(' ', '-')}`}
            className={`block w-full hover:scale-[1.01] transition-transform ease-in-out border ${
              pathname ===
              `/events/${category.title.toLowerCase().replaceAll(' ', '-')}`
                ? 'border-light-yellow'
                : 'border-dark-bg/50'
            } p-2 bg-slate-600/50 rounded-lg shadow-xl`}
          >
            {category.title}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <div className="md:hidden w-full p-4">
        <button
          onClick={() => setIsOpen(true)}
          className="w-full p-2 bg-slate-600/50 rounded-lg shadow-xl border border-dark-bg/50"
        >
          Sélectionner une catégorie
        </button>

        <dialog
          open={isOpen}
          className="fixed inset-0 bg-black/50 z-50 w-full h-full"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-dark-bg p-4 rounded-lg max-w-xs mx-auto mt-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2>Catégories</h2>
              <button onClick={() => setIsOpen(false)}>✕</button>
            </div>
            <nav>{categoryList}</nav>
          </div>
        </dialog>
      </div>

      <aside className="hidden md:block w-60 flex-shrink-0 h-full p-4 sticky top-40">
        <nav>{categoryList}</nav>
      </aside>
    </>
  );
}
