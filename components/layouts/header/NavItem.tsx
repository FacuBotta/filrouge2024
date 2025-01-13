'use client';

import { Link } from 'next-view-transitions';
import { usePathname } from 'next/navigation';

interface NavItemProps {
  href: string;
  children: string;
}

export default function NavItem(props: NavItemProps) {
  const pathname = usePathname();
  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };
  const itemActiveClass =
    'bg-light-red px-2 sm:border-t-[1px] sm:border-l-[1px] sm:border-r-[1px] sm:border-dark-bg dark:bg-light-yellow dark:border-none dark:text-dark-bg';

  return (
    <li className={isActive(props.href) ? itemActiveClass : 'px-2'}>
      <Link href={props.href}>{props.children}</Link>
    </li>
  );
}
