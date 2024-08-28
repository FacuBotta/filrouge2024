import SignOutButton from "@/components/ui/sigOutButton";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";
import { MessageForm } from "@/components/forms/messageForm";

export const DashboardPage: React.FC<{ user: User }> = async ({ user }) => {
  if (!user.password) {
    redirect("/complete-profile");
  }
  

  return (
    <div className="min-h-screen w-full p-10 grid grid-rows-fill gap-2">
      <div className="bg-light-yellow col-span-3 h-[150px]">
        <SignOutButton />
        <h1>Dashboard coming solution</h1>
        <p>Welcome, {user.name || user.email}!</p>
      </div>
      <aside className="bg-dark-greenLight row-span-4">
        algo
      </aside>
      <section className="bg-light-blue col-span-2 row-span-3">
        fonction render zone
      </section>
      {/* <MessageForm user={user} /> */}
    </div>
  );
};

export default DashboardPage;