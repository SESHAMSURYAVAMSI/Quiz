import AuthWrapper from "@/components/auth/AuthWrapper";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <AuthWrapper
      title="Welcome Back"
      subtitle="Login to continue your journey."
    >
      <LoginForm />
    </AuthWrapper>
  );
};

export default LoginPage;