"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useSession,
} from "next-auth/react";

import StatsCard from "./StatsCard";

import PerformanceChart from "@/components/analytics/PerformanceChart";

interface Score {
  _id: string;

  quizTitle: string;

  score: number;

  totalQuestions: number;

  createdAt: string;
}

const DashboardContent = () => {
  const { data: session } =
    useSession();

  const [scores, setScores] =
    useState<Score[]>([]);

  // Fetch User Scores
  useEffect(() => {
    const fetchScores = async () => {
      const res = await fetch(
        `/api/scores?userId=${session?.user?.email}`
      );

      const data =
        await res.json();

      setScores(data);
    };

    if (session?.user?.email) {
      fetchScores();
    }
  }, [session]);

  // Stats
  const totalQuizzes =
    scores.length;

  const averageScore =
    scores.length > 0
      ? (
          scores.reduce(
            (acc, curr) =>
              acc + curr.score,
            0
          ) / scores.length
        ).toFixed(1)
      : 0;

  const bestScore =
    scores.length > 0
      ? Math.max(
          ...scores.map(
            (s) => s.score
          )
        )
      : 0;

  // Chart Data
  const chartData = scores.map(
    (score) => ({
      quiz: score.quizTitle,
      score: score.score,
    })
  );

  return (
    <div className="mt-8 space-y-8">
      
      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        
        <StatsCard
          title="Quizzes Taken"
          value={String(
            totalQuizzes
          )}
        />

        <StatsCard
          title="Average Score"
          value={`${averageScore}`}
        />

        <StatsCard
          title="Best Score"
          value={`${bestScore}`}
        />
      </div>

      {/* Analytics */}
      <PerformanceChart
        data={chartData}
      />

      {/* Recent Activity */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        
        <div className="flex items-center justify-between">
          
          <h2 className="text-3xl font-black text-white">
            Recent Activity 🔥
          </h2>

          <span className="rounded-full bg-purple-500/20 px-4 py-2 text-sm text-purple-300">
            Live Data
          </span>
        </div>

        <div className="mt-8 space-y-4">
          {scores
            .slice(0, 5)
            .map((score) => (
              <div
                key={score._id}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-5 transition hover:border-purple-500/30"
              >
                
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {
                      score.quizTitle
                    }
                  </h3>

                  <p className="mt-1 text-sm text-gray-400">
                    {new Date(
                      score.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-right">
                  
                  <h3 className="text-3xl font-black text-purple-400">
                    {score.score}/
                    {
                      score.totalQuestions
                    }
                  </h3>

                  <p className="text-gray-400">
                    Score
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;