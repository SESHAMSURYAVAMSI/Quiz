"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import FloatingCard from "./FloatingCard";

const HeroSection = () => {
  const router = useRouter();

  // TEMP AUTH CHECK
  // later replace with next-auth session
  const isLoggedIn = false;

  const handleProtectedNavigation = (
    path: string
  ) => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    router.push(path);
  };

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-black px-6 pt-24">
      
      {/* BACKGROUND GLOW */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/20 blur-3xl" />

      {/* GRID PATTERN */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* EXTRA GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-blue-900/10" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-16 md:grid-cols-2">
        
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          
          {/* BADGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-5 inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-5 py-2 text-sm font-medium text-purple-300 backdrop-blur-xl"
          >
            🚀 AI Powered Smart Quiz Platform
          </motion.div>

          {/* HEADING */}
          <h1 className="text-5xl font-black leading-tight tracking-tight text-white md:text-7xl">
            Learn Smarter <br />

            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Compete Faster
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-400">
            Experience next-generation learning with multiplayer quizzes,
            AI-generated questions, real-time leaderboards, XP rewards,
            and voice-powered quiz battles.
          </p>

          {/* BUTTONS */}
          <div className="mt-10 flex flex-wrap gap-4">
            
            <Button
              onClick={() =>
                handleProtectedNavigation(
                  "/quizzes"
                )
              }
              className="rounded-full bg-white px-8 py-6 text-base font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-gray-200"
            >
              Start Quiz
            </Button>

            <Button
              variant="outline"
              onClick={() =>
                handleProtectedNavigation(
                  "/quizzes"
                )
              }
              className="rounded-full border-white/20 bg-white/5 px-8 py-6 text-base text-white backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white/10"
            >
              Explore Quizzes
            </Button>
          </div>

          {/* STATS */}
          <div className="mt-10 flex flex-wrap gap-8">
            
            <motion.div
              whileHover={{ y: -5 }}
            >
              <h3 className="text-3xl font-bold text-white">
                25K+
              </h3>

              <p className="text-sm text-gray-400">
                Active Users
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
            >
              <h3 className="text-3xl font-bold text-white">
                1.2K+
              </h3>

              <p className="text-sm text-gray-400">
                Daily Quizzes
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
            >
              <h3 className="text-3xl font-bold text-white">
                98%
              </h3>

              <p className="text-sm text-gray-400">
                Success Rate
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative grid gap-6"
        >
          
          <FloatingCard
            title="🔥 Live Players"
            value="12,540"
          />

          <FloatingCard
            title="🧠 AI Generated Quizzes"
            value="8,200+"
          />

          <FloatingCard
            title="🏆 Highest XP"
            value="1520 XP"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;