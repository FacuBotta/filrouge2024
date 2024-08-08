import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";
import { redirect } from "next/navigation";
import React from "react";
import { DashboardPage } from "./dashboard";

// React.FC is a type that stands for "Function Component" in React.
// It is a generic type that allows you to specify the props that a function component will accept.
// It provides type safety for the props that a component expects to receive. This can help catch bugs early on and make your code easier to understand.
//It makes it easier to refactor your component's props. For example, if you want to rename a prop, the TypeScript compiler will catch any places where that prop is used and help you update them.
// It makes it easier to see the expected shape of a component's props just by looking at its type definition.

const Dashboard: React.FC = async () => {

  const isAuthenticated = await checkIsAuthenticated();

  if (!isAuthenticated) {
    redirect("/login");
  }
  return (
    <DashboardPage/>
  );
}

export default Dashboard;