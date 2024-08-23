"use client";
import { handleSignOut } from "@/lib/auth/signOutServerAction";

export const SignOutButton: React.FC = () => {
  return (
  <button onClick={() => handleSignOut()} >Log out!</button>
  );
}

export default SignOutButton;