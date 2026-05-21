"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useSession,
} from "next-auth/react";

interface User {
  name: string;

  email: string;

  xp: number;

  level: string;

  badges: string[];

  streak: number;
}

const ProfilePage = () => {
  const { data: session } =
    useSession();

  const [user, setUser] =
    useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(
        `/api/users/${session?.user?.email}`
      );

      const data =
        await res.json();

      setUser(data);
    };

    if (session?.user?.email) {
      fetchUser();
    }
  }, [session]);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6">
      
      <div className="mx-auto max-w-5xl">
        
        {/* Profile Header */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
          
          <div className="flex flex-col items-center text-center">
            
            {/* Avatar */}
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-purple-500 text-5xl font-black text-white">
              {user.name.charAt(0)}
            </div>

            <h1 className="mt-6 text-5xl font-black text-white">
              {user.name}
            </h1>

            <p className="mt-2 text-gray-400">
              {user.email}
            </p>

            {/* Level */}
            <div className="mt-6 rounded-full bg-purple-500/20 px-6 py-3 text-xl font-bold text-purple-300">
              {user.level}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
            <p className="text-gray-400">
              XP Points
            </p>

            <h2 className="mt-4 text-5xl font-black text-white">
              {user.xp}
            </h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
            <p className="text-gray-400">
              Current Level
            </p>

            <h2 className="mt-4 text-5xl font-black text-purple-400">
              {user.level}
            </h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
            <p className="text-gray-400">
              Daily Streak
            </p>

            <h2 className="mt-4 text-5xl font-black text-orange-400">
              {user.streak}
            </h2>
          </div>
        </div>

        {/* Badges */}
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8">
          
          <h2 className="mb-8 text-4xl font-black text-white">
            Achievements 🏅
          </h2>

          <div className="flex flex-wrap gap-4">
            {user.badges?.map(
              (badge, index) => (
                <div
                  key={index}
                  className="rounded-full bg-purple-500/20 px-6 py-4 text-lg font-bold text-purple-300"
                >
                  {badge}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;