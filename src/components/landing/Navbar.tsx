"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";

const Navbar = () => {
  const router = useRouter();

  const handleProtectedRoute = (path: string) => {
    // later you can replace this with real auth check
    const isLoggedIn = false;

    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    router.push(path);
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur-2xl">
      
      {/* Background Blur Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5" />

      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* LOGO */}
        <Link
          href="/"
          className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-2xl font-black tracking-tight text-transparent"
        >
          QuizNova
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-8 md:flex">
          
          <button
            onClick={() => router.push("/")}
            className="text-sm font-medium text-gray-300 transition-colors duration-300 hover:text-white"
          >
            Home
          </button>

          <button
            onClick={() =>
              handleProtectedRoute("/quizzes")
            }
            className="text-sm font-medium text-gray-300 transition-colors duration-300 hover:text-white"
          >
            Quizzes
          </button>

          <button
            onClick={() =>
              handleProtectedRoute("/leaderboard")
            }
            className="text-sm font-medium text-gray-300 transition-colors duration-300 hover:text-white"
          >
            Leaderboard
          </button>

          <button
            onClick={() =>
              handleProtectedRoute("/multiplayer")
            }
            className="text-sm font-medium text-gray-300 transition-colors duration-300 hover:text-white"
          >
            Multiplayer
          </button>
        </nav>

        {/* ACTION BUTTON */}
        <div className="hidden md:block">
          <Button
            onClick={() => router.push("/login")}
            className="rounded-full bg-white px-6 text-black transition-all duration-300 hover:scale-105 hover:bg-gray-200"
          >
            Get Started
          </Button>
        </div>

        {/* MOBILE MENU */}
        <button className="rounded-full border border-white/10 bg-white/5 p-2 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 md:hidden">
          <Menu className="h-5 w-5 text-white" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;