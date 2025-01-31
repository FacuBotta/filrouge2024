'use client';

import { Link } from 'next-view-transitions';
import { usePathname } from 'next/navigation';
interface CategoryNavProps {
  categories: {
    id: string;
    title: string;
  }[];
}

export default function CategoryNav({ categories }: CategoryNavProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden md:block w-60 flex-shrink-0 h-full p-4 sticky top-40">
      <ul className="space-y-2  flex flex-col gap-2 w-full">
        <li className="w-full">
          <Link className="primary-btn w-full" href={'/events/new'}>
            Creer un événement
          </Link>
        </li>
        <li className="w-full">
          <Link
            href="/events"
            className={`block w-full hover:scale-[1.01] transition-transform ease-in-out border ${
              pathname === '/events'
                ? 'border-light-yellow'
                : 'border-dark-cards'
            } p-2 bg-card border-2 rounded-lg shadow-xl`}
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
                  : 'border-black dark:border-dark-cards'
              } p-2 bg-card border-2 rounded-lg shadow-xl`}
            >
              {category.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
