import AuthWrapper from "@/components/auth/AuthWrapper";
import RegisterForm from "@/components/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <AuthWrapper
      title="Create Account"
      subtitle="Join QuizNova and challenge yourself."
    >
      <RegisterForm />
    </AuthWrapper>
  );
};

export default RegisterPage;