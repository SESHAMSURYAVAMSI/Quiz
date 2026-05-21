"use client";

import { useEffect, useState } from "react";

interface Score {
  _id: string;
  userName: string;
  score: number;
  totalQuestions: number;
}

const LeaderboardPage = () => {
  const [scores, setScores] = useState<
    Score[]
  >([]);

  useEffect(() => {
    const fetchScores = async () => {
      const res = await fetch("/api/scores");

      const data = await res.json();

      setScores(data);
    };

    fetchScores();
  }, []);

  return (
    <div className="min-h-screen bg-black p-6">
      
      <div className="mx-auto max-w-4xl">
        
        <h1 className="mb-10 text-5xl font-black text-white">
          Leaderboard 🏆
        </h1>

        <div className="space-y-4">
          {scores.map((user, index) => (
            <div
              key={user._id}
              className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
              <div>
                <h2 className="text-2xl font-bold text-white">
                  #{index + 1} {user.userName}
                </h2>

                <p className="mt-1 text-gray-400">
                  Score:
                  {" "}
                  {user.score}/
                  {user.totalQuestions}
                </p>
              </div>

              <div className="text-4xl">
                🏅
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;