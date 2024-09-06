'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactElement } from 'react';
import { NotificationSpan } from '../NotificationSpan';

interface NavItemProps {
  href: string;
  notifications?: number;
  children: JSX.Element;
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
  const itemActiveClass = 'px-2 text-light-red dark:text-light-yellow';

  return (
    <li
      className={`${isActive(props.href) ? itemActiveClass : 'px-2'} flex items-start`}
    >
      <Link href={props.href}>{props.children}</Link>
      {props.notifications && (
        <NotificationSpan notifications={props.notifications} />
      )}
    </li>
  );
}
