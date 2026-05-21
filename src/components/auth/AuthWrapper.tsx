import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  title: string;
  subtitle: string;
}

const AuthWrapper = ({ children, title, subtitle }: Props) => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6">
      
      {/* Glow */}
      <div className="absolute h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        
        <h1 className="text-4xl font-black text-white">
          {title}
        </h1>

        <p className="mt-2 text-gray-400">
          {subtitle}
        </p>

        <div className="mt-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;