// "use client"
import { useTheme } from "next-themes";
// import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  // const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  console.log(systemTheme)
  const currentTheme = theme === 'system' ? systemTheme : theme;

  /* useEffect(() => {
    setMounted(true);
  }, [])

  if(!mounted) return null */

  return (
    <button
      onClick={() => theme == "dark"? setTheme('light'): setTheme("dark")}
      className="bg-light-yellow"
    >
      Toggle Mode
    </button>
  )
}