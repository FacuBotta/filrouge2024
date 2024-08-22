import SignOutButton from "@/components/ui/sigOutButton";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";

export const DashboardPage: React.FC<{ user: User }> = ({ user }) => {
  if (!user.password) {
    redirect("/complete-profile");
  }
  return (
    <div className="flex bg-slate flex-col items-center justify-center p-24">
      <SignOutButton />
      <h1>Dashboard coming solution</h1>
      <p>Welcome, {user.name || user.email}!</p>
    </div>
  );
};

export default DashboardPage;