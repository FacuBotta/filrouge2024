'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItemProps {
  href: string;
  children: string;
}

export default function NavItem(props: NavItemProps) {
  const pathname = usePathname();
  const isActive = (href: string) => {
    // TODO: arreglar esto para que funcione el link marcado como activo
    return (
      pathname === href ||
      (href.match('messages') &&
        pathname.startsWith('/dashboard/messages' + '/'))
    );
  };
  const itemActiveClass = 'px-2 border border-dark-bg dark:border-light-yellow';

  return (
    <li className={isActive(props.href) ? itemActiveClass : 'px-2'}>
      <Link href={props.href}>{props.children}</Link>
    </li>
  );
}
