'use client'
import Backdrop from "@/components/Backdrop";
import LogForm from "@/components/LogForm";
import { useRouter } from "next/navigation";
import Home from "../page";

export default function Page() {
  const Router = useRouter();
  return (
    <>
      <Home/>
      <Backdrop onClick={() => Router.push('/')} >
        <LogForm onClick={() => Router.push('/')}/>
      </Backdrop>
    </>
  )
}