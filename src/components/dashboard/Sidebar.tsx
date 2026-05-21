"use client";

import Link from "next/link";

import {
  LayoutDashboard,
  Trophy,
  Brain,
  User,
  BarChart3,
  Shield,
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="hidden w-72 flex-col border-r border-white/10 bg-white/5 p-6 backdrop-blur-xl md:flex">
      
      {/* Logo */}
      <h1 className="mb-10 text-3xl font-black text-white">
        QuizNova
      </h1>

      {/* Navigation */}
      <nav className="space-y-3">
        
        {/* Dashboard */}
        <Link
          href="/dashboard"
          className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 text-white transition hover:bg-white/20"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        {/* Quizzes */}
        <Link
          href="/quizzes"
          className="flex items-center gap-3 rounded-2xl p-4 text-gray-400 transition hover:bg-white/10 hover:text-white"
        >
          <Brain size={20} />
          Quizzes
        </Link>

        {/* Leaderboard */}
        <Link
          href="/leaderboard"
          className="flex items-center gap-3 rounded-2xl p-4 text-gray-400 transition hover:bg-white/10 hover:text-white"
        >
          <Trophy size={20} />
          Leaderboard
        </Link>

        {/* Analytics */}
        <Link
          href="/history"
          className="flex items-center gap-3 rounded-2xl p-4 text-gray-400 transition hover:bg-white/10 hover:text-white"
        >
          <BarChart3 size={20} />
          Analytics
        </Link>

        {/* Admin */}
        <Link
          href="/admin"
          className="flex items-center gap-3 rounded-2xl p-4 text-gray-400 transition hover:bg-white/10 hover:text-white"
        >
          <Shield size={20} />
          Admin
        </Link>

        {/* Profile */}
        <Link
          href="/profile"
          className="flex items-center gap-3 rounded-2xl p-4 text-gray-400 transition hover:bg-white/10 hover:text-white"
        >
          <User size={20} />
          Profile
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;