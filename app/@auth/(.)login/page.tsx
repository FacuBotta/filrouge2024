import LogForm from "@/components/forms/LogForm";
import Modal from "@/components/ui/Modal";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";
import { redirect } from "next/navigation";

const LoginPage: React.FC = async () => {

  const isAuthenticated = await checkIsAuthenticated();
  if (isAuthenticated) {
    redirect("/dashboard");
  } else {
    return (
      <Modal>
        <LogForm/>
      </Modal>
    );
  }
}

export default LoginPage;