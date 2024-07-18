'use client'
import Backdrop from "@/components/Backdrop";
import LogForm from "@/components/LogForm";
import { useRouter } from "next/navigation";

export default function Signup() {
  const Router = useRouter();
  return (
    <Backdrop onClick={() => Router.back()} >
      <LogForm type="Sign-Up"/>
    </Backdrop>
  )
}