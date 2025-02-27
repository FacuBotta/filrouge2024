import { checkIsAuthenticated } from '@/actions/authServerActions/checkIsAuthenticated';
import NavItem from './NavItem';
import NavMenuButton from './NavMenuButton';
import ThemeSwitcher from './ThemeSwitcher';

export default async function Header() {
  const { auth, user } = await checkIsAuthenticated();

  return (
    <>
      <input type="checkbox" id="menu-toggle" className="hidden peer" />
      <header className="sticky z-50 top-0 min-w-full sm:max-h-none sm:items-end flex justify-between overflow-hidden max-h-[44px] transition-[max-height] duration-500 ease-in-out peer-checked:max-h-[500px] select-none px-5 border-b-[1px] border-dark-bg dark:border-light-yellow bg-light-ciel/95 dark:bg-dark-bg/95 ">
        <ThemeSwitcher />
        <nav>
          <div className="flex flex-col items-end">
            <label
              id="menu-label"
              htmlFor="menu-toggle"
              className="cursor-pointer sm:hidden p-2 active:scale-95 "
            >
              <NavMenuButton />
            </label>
            <ul className="mr-[-1.25rem] sm:mr-0 gap-4 font-bold text-dark-bg dark:text-dark-grey sm:flex sm:flex-row">
              <NavItem href="/">Accueil</NavItem>
              {auth && <NavItem href="/profile">Profil</NavItem>}
              {auth && <NavItem href="/communaute">Communauté</NavItem>}
              {auth ? (
                <NavItem href="/events">Événements</NavItem>
              ) : (
                <NavItem href="/login">Connection</NavItem>
              )}
              {!auth && <NavItem href="/about">À propos</NavItem>}
              {auth && <NavItem href="/messages">Messages</NavItem>}

              {!auth && <NavItem href="/contact">Contact</NavItem>}
              {auth && user?.role === 'admin' && (
                <NavItem href="/admin">Admin</NavItem>
              )}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}
