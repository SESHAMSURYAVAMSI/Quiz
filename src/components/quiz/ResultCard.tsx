"use client";

import Confetti from "react-confetti";

interface Props {
  score: number;
  total: number;
}

const ResultCard = ({
  score,
  total,
}: Props) => {
  const percentage =
    (score / total) * 100;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
      
      <Confetti />

      {/* Glow */}
      <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative z-10">
        
        <h1 className="text-5xl font-black text-white">
          Quiz Completed 🎉
        </h1>

        <p className="mt-6 text-2xl text-gray-300">
          Your Score
        </p>

        <h2 className="mt-4 text-8xl font-black text-purple-400">
          {score}/{total}
        </h2>

        <p className="mt-4 text-xl text-gray-400">
          {percentage}% Accuracy
        </p>
      </div>
    </div>
  );
};

export default ResultCard;