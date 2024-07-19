'use client'
import Backdrop from "@/components/Backdrop";
import LogForm from "@/components/LogForm";
import { useRouter } from "next/navigation";

export default function Page() {
  const Router = useRouter();
  return (
    <main className="w-full h-full bg-light-ciel dark:bg-dark-bg">
      <Backdrop onClick={() => Router.push('/')} >
        <LogForm onClick={() => Router.push('/')}/>
      </Backdrop>
    </main>
  )
}