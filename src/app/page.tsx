"use client";
import Button from "@/components/Button";
import Image from "next/image";
import imageHome1Light from "../../public/images/image1-home-light.svg";
import imageHome1Dark from "../../public/images/image1-home-dark.svg";
import { useState } from "react";
import LogForm from "@/components/LogForm";

export default function Home() {
  const theme = localStorage.getItem('theme');
  console.log(theme);
  const [formOpen, setFormOpen] = useState(false);
  const showForm = () => {
    setFormOpen(!formOpen);
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <section className="flex items-center justify-center w-full min-h-screen px-14 mx-auto bg-light-ciel dark:bg-dark-bg">
        <div className="h-[100%] w-[40%] flex flex-col gap-8 my-[-300px] text-dark-bg dark:text-dark-grey">
          <h1 className="text-[80px] font-bold dark:text-dark-greenLight">Home page</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab odit tempora dolore et, minima tenetur perspiciatis quo alias ipsam aporem ipsum dolor sit amet consectetur adipisicing elit. Ab odit tempora dolore et, minima tenetur perspiciatis quo alias ipsam aporem ipsum dolor sit amet consectetur adipisicing elit. Ab odit tempora dolore et, minima tenetur perspiciatis quo alias ipsam aperiam aspernatur eius libero ratione expedita laboriosam velit ipsum sed. Asperiores.</p>
          <div className="flex gap-8">
            <Button onClick={ () => showForm() } >SigIn!</Button>
            <Button>LogIn!</Button>
          </div>
        </div>
        <Image 
          src={theme === 'light' ? imageHome1Light : imageHome1Dark}
          alt="logo"
          width={"100%"}
          // height={200}
          // className="object-cover object-center"
        />
      </section>
      {
        formOpen && (
          <LogForm/>
        )
      }
    </main>
  );
}
