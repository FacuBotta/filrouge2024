import PasswordForm from "@/components/forms/passwordForm";
import { checkIsAuthenticated } from "@/actions/authServerActions/checkIsAuthenticated";
import { redirect } from "next/navigation";


const FirstConnectionPage = async () => {
  const userAuthenticated = await checkIsAuthenticated();
  if (!userAuthenticated) {
    redirect("/login");
  }
  return (
    <div className="flex flex-col items-center justify-center p-24">
      <h2>Bienvenue sur EventHub !</h2>
      <p>Vous devez d&lsquo;abord créer un mot de passe pour pouvoir commencer.</p>
      <PasswordForm id={userAuthenticated.id} />
    </div>
  )
}

export default FirstConnectionPage;