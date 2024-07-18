'use client'

import Backdrop from "@/components/Backdrop";
import LogForm from "@/components/LogForm";
import { useRouter } from "next/navigation";

export default function Login() {
  const Router = useRouter();
  return (
    <Backdrop onClick={() => Router.back()} >
      <LogForm onClick={() => Router.back()}/>
    </Backdrop>
  )
}