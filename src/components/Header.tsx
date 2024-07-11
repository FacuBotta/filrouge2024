"use client";
import ThemeSwitcher from "./ThemeSwitcher";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  const itemActive = 'bg-light-red px-2 border-t-[1px] border-l-[1px] border-r-[1px] border-dark-bg dark:bg-dark-yellowLight dark:border-none dark:text-dark-bg';
  
  return (
    <header className="absolute top-0 left-0 right-0 h-11 flex justify-between items-end px-5 border-b-[1px] border-dark-bg dark:border-dark-yellowLight">
      <ThemeSwitcher/>
      <nav>
        <ul className="flex gap-4 place-items-start font-bold text-dark-bg dark:text-dark-grey">
          <li className={isActive('/')? itemActive : 'px-2'}><Link href="/">Home</Link></li>
          <li className={isActive('/about')? itemActive : 'px-2'}><Link href="/about">About</Link></li>
          <li className={isActive('')? itemActive : 'px-2'}><Link className="active:bg-light-red" href="">Contact</Link></li>
        </ul>
      </nav>
    </header>
  )
}