import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";
import { redirect } from "next/navigation";
import React from "react";
import { DashboardPage } from "./dashboard";

const Dashboard = async () => {

  const userAuthenticated = await checkIsAuthenticated();
  if (!userAuthenticated) {
    redirect("/login");
  }
  return (
    <DashboardPage user={userAuthenticated} />
  );
}

export default Dashboard;