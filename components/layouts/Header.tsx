import ThemeSwitcher from "../ui/ThemeSwitcher";
import { checkIsAuthenticated } from "@/actions/authServerActions/checkIsAuthenticated";
import NavMenuButton from "../ui/NavMenuButton";
import NavItem from "../ui/NavItem";

export default async function Header() {
  const userAuthenticated = await checkIsAuthenticated();

  return (
    <>
      <input type="checkbox" id="menu-toggle" className="hidden peer checked+label:text-red-300" />
      <header className="sticky z-50 top-0 min-w-full max-h-[44px] sm:max-h-none flex justify-between sm:items-end select-none px-5 border-b-[1px] border-dark-bg dark:border-light-yellow bg-light-ciel/95  dark:bg-dark-bg/95 overflow-hidden transition-[max-height] duration-500 ease-in-out peer-checked:max-h-[500px]"> 
        <ThemeSwitcher />
        <nav>
          <div className="flex flex-col items-end">
            {/* TODO: Add active class to label when menu is open to change color */}
            <label id="menu-label" htmlFor="menu-toggle" className="cursor-pointer sm:hidden p-2 active:scale-95 ">
              <NavMenuButton />
            </label>
            <ul className="mr-[-1.25rem] sm:mr-0 gap-4 font-bold text-dark-bg dark:text-dark-grey sm:flex sm:flex-row">
              <NavItem href="/">Home</NavItem>
              {userAuthenticated ? (
                <NavItem href="/dashboard">Dashboard</NavItem>
              ) : (
                <NavItem href="/login">LogIn</NavItem>
              )}
              <NavItem href="/about">About</NavItem>
              <NavItem href="/contact">Contact</NavItem>
            </ul>
          </div>
        </nav>
      </header>
    </>
  )
}