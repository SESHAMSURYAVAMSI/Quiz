"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useSession,
} from "next-auth/react";

import HistoryCard from "@/components/analytics/HistoryCard";

import PerformanceChart from "@/components/analytics/PerformanceChart";

interface Score {
  _id: string;

  quizTitle: string;

  score: number;

  totalQuestions: number;

  createdAt: string;
}

const HistoryPage = () => {
  const { data: session } =
    useSession();

  const [scores, setScores] =
    useState<Score[]>([]);

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

  // Chart Data
  const chartData = scores.map(
    (score) => ({
      quiz: score.quizTitle,
      score: score.score,
    })
  );

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

  return (
    <div className="min-h-screen bg-black p-6">
      
      <div className="mx-auto max-w-6xl">
        
        <h1 className="mb-10 text-5xl font-black text-white">
          Quiz Analytics 📊
        </h1>

        {/* Stats */}
        <div className="mb-10 grid gap-6 md:grid-cols-3">
          
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-gray-400">
              Total Quizzes
            </p>

            <h2 className="mt-3 text-5xl font-black text-white">
              {totalQuizzes}
            </h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-gray-400">
              Average Score
            </p>

            <h2 className="mt-3 text-5xl font-black text-purple-400">
              {averageScore}
            </h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-gray-400">
              Best Score
            </p>

            <h2 className="mt-3 text-5xl font-black text-green-400">
              {bestScore}
            </h2>
          </div>
        </div>

        {/* Chart */}
        <PerformanceChart
          data={chartData}
        />

        {/* History */}
        <div className="mt-10 space-y-5">
          {scores.map((score) => (
            <HistoryCard
              key={score._id}
              quizTitle={
                score.quizTitle
              }
              score={score.score}
              totalQuestions={
                score.totalQuestions
              }
              createdAt={
                score.createdAt
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;