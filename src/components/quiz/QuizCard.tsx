"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Brain, ArrowRight } from "lucide-react";

interface Props {
  quiz: {
    id: string;
    title: string;
    questions: number;
    difficulty: string;
  };
}

const QuizCard = ({ quiz }: Props) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -10,
        scale: 1.02,
      }}
      transition={{
        duration: 0.3,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/5
        p-6
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-purple-500/50
        hover:shadow-[0_0_40px_rgba(168,85,247,0.4)]
      "
    >
      {/* Glow Effect */}
      <div
        className="
          absolute
          right-0
          top-0
          h-40
          w-40
          rounded-full
          bg-purple-500/10
          blur-3xl
          transition-all
          duration-500
          group-hover:bg-purple-500/20
        "
      />

      <div className="relative z-10">
        
        {/* Difficulty Badge */}
        <div className="mb-5 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/20 px-4 py-2 text-sm text-purple-300">
            <Brain size={16} />
            {quiz.difficulty}
          </div>

          <span className="text-sm text-gray-500">
            #{quiz.id}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-black leading-tight text-white">
          {quiz.title}
        </h2>

        {/* Questions */}
        <p className="mt-3 text-gray-400">
          {quiz.questions} Questions Included
        </p>

        {/* Button */}
        <Link
          href={`/quizzes/${quiz.id}`}
          className="
            mt-8
            inline-flex
            items-center
            gap-2
            rounded-2xl
            bg-white
            px-6
            py-3
            font-semibold
            text-black
            transition-all
            duration-300
            hover:scale-105
            hover:bg-gray-200
            active:scale-95
          "
        >
          Start Quiz
          <ArrowRight size={18} />
        </Link>
      </div>
    </motion.div>
  );
};

export default QuizCard;