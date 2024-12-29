'use client';

import Link from 'next/link';
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
    <aside className="w-64 h-full border-r p-4 sticky top-40">
      <nav>
        <ul className="space-y-2">
          <li>
            <Link
              href="/events"
              className={`block p-2 rounded ${
                pathname === '/events'
                  ? 'bg-green-100 text-green-800'
                  : 'hover:bg-gray-100'
              }`}
            >
              Toutes les catégories
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/events/${category.title.toLowerCase().replaceAll(' ', '-')}`}
                className={`block p-2 rounded ${
                  pathname.includes(category.title.toLowerCase())
                    ? 'bg-green-100 text-green-800'
                    : 'hover:bg-gray-100'
                }`}
              >
                {category.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
