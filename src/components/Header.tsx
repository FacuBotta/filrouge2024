"use client"
import { useEffect, useState } from "react";
import Button from "./Button"

export default function Header() {
  console.log(localStorage.getItem('theme'));
  const [theme, setTheme] = useState(()=> {
    if (localStorage.getItem('theme') === 'dark') {
      return 'dark';
    } else if (localStorage.getItem('theme') === 'light') {
      return 'light';
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });
  const handleTheme = (e: any) => {
    e.preventDefault();
    setTheme(theme === 'light' ? 'dark' : 'light');
    localStorage.setItem('theme', theme);
  }
  useEffect(() => {
    if (theme === 'dark') {
      document.querySelector('html')?.classList.add('dark');    
    } else {
      document.querySelector('html')?.classList.remove('dark');
    }
  }, [theme]);
  return (
    <header className="absolute top-0 left-0 right-0 flex bg-light-grey">
      <Button onClick={(e: any)=> handleTheme(e)}>theme</Button>
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