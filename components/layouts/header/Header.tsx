import { checkIsAuthenticated } from '@/actions/authServerActions/checkIsAuthenticated';
import NavItem from './NavItem';
import NavMenuButton from './NavMenuButton';
import ThemeSwitcher from './ThemeSwitcher';

export default async function Header() {
  const userAuthenticated = await checkIsAuthenticated();

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
              <NavItem href="/">Home</NavItem>
              {userAuthenticated && <NavItem href="/profile">Profile</NavItem>}
              {userAuthenticated && (
                <NavItem href="/communaute">Communauté</NavItem>
              )}
              {userAuthenticated ? (
                <NavItem href="/events">Events</NavItem>
              ) : (
                <NavItem href="/login">LogIn</NavItem>
              )}
              {!userAuthenticated && <NavItem href="/about">About</NavItem>}
              {userAuthenticated && (
                <NavItem href="/messages">Messages</NavItem>
              )}
              {userAuthenticated && (
                <NavItem href="/calendrier">Calendrier</NavItem>
              )}

              {!userAuthenticated && <NavItem href="/contact">Contact</NavItem>}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}

//  por que no max-h-fit? porque la transicion no funciona con max-h-fit, css necesita un valor para poder hacer la transicion...
// podria lograrse con la propiedad calc() de CSS pero no tiene soporte para todos los navegadores.
