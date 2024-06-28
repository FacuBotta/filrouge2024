import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 flex bg-light-grey">
      <ThemeSwitcher/>
      <nav>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
    </header>
  )
}