import { useTheme } from "next-themes";

export default function ThemeSwitcher() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <button
      onClick={() => theme == "dark"? setTheme('light'): setTheme("dark")}
      className="bg-light-yellow"
    >
      Toggle Mode
    </button>
  )
}