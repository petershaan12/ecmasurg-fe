import LoginForm from "../components/Auth/LoginForm";
import { Toaster } from "@/components/ui/sonner";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <main>
        <LoginForm />
      </main>

      <Toaster />
    </div>
  );
};

export default Login;
