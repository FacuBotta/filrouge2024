"use client";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import LogForm from "@/components/LogForm";
import Backdrop from "@/components/Backdrop";
import { useTheme } from "next-themes";
import HomeImage from "../../public/images/HomeImage";

export default function Home() {
  const { theme } = useTheme();
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const showForm = () => {
    setFormOpen(!formOpen);
  }
  useEffect(() => {
      setMounted(true);
  }, [])
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <section className="flex items-center justify-center w-full min-h-screen px-14 mx-auto bg-light-ciel dark:bg-dark-bg">
        <div className=" h-[100%] w-[90%] flex flex-col items-center text-center gap-6 mb-[100px] text-dark-bg dark:text-dark-grey lg:mr-5 lg:text-left lg:items-start sm:w-[70%] lg:w-[40%] max-w-[500px]">
          <h1 className="text-[50px] sm:text-[80px] font-bold text-nowrap dark:text-dark-greenLight">Home page</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab odit tempora dolore et, minima tenetur perspiciatis quo alias ipsam aporem ipsum dolor sit amet consectetur adipisicing elit. Ab odit tempora dolore et, minima tenetur perspiciatis quo alias ipsam aporem ipsum dolor sit amet consectetur adipisicing elit. Ab odit tempora dolore et, minima tenetur perspiciatis quo alias ipsam aperiam aspernatur eius libero ratione expedita laboriosam velit ipsum sed. Asperiores.</p>
          <div className="flex gap-8">
            <Button onClick={ () => showForm() } >SigIn!</Button>
            <Button>LogIn!</Button>
          </div>
        </div>
        <HomeImage className="hidden lg:block w-[500px]" theme={mounted ? theme : "dark"}/>
      </section>
      {
        formOpen && (
          <Backdrop onClick={showForm}>
            <LogForm/>
          </Backdrop>
        )
      }
    </main>
  );
}
