"use client";

import { useEffect, useMemo, useState } from "react";

import { useParams } from "next/navigation";

import { useSession } from "next-auth/react";

import QuestionCard from "@/components/quiz/QuestionCard";
import ProgressBar from "@/components/quiz/ProgressBar";
import Timer from "@/components/quiz/Timer";
import ResultCard from "@/components/quiz/ResultCard";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface Quiz {
  _id: string;
  title: string;
  questions: Question[];
}

const QUESTION_TIME = 30;

const QuizPage = () => {
  const params = useParams();

  const { data: session } = useSession();

  const [quiz, setQuiz] = useState<Quiz | null>(
    null
  );

  const [loading, setLoading] =
    useState(true);

  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState(0);

  const [selectedAnswer, setSelectedAnswer] =
    useState("");

  const [score, setScore] = useState(0);

  const [showResult, setShowResult] =
    useState(false);

  const [timeLeft, setTimeLeft] =
    useState(QUESTION_TIME);

  // Current Question
  const currentQuestion = useMemo(() => {
    return quiz?.questions[
      currentQuestionIndex
    ];
  }, [quiz, currentQuestionIndex]);

  // Fetch Quiz
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `/api/quizzes/${params.id}`
        );

        if (!res.ok) {
          throw new Error(
            "Failed to fetch quiz"
          );
        }

        const data = await res.json();

        setQuiz(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) {
      fetchQuiz();
    }
  }, [params]);

  // Timer Logic
  useEffect(() => {
    if (
      !quiz ||
      showResult ||
      !currentQuestion
    ) {
      return;
    }

    if (timeLeft <= 0) {
      // eslint-disable-next-line react-hooks/immutability
      handleNextQuestion();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [
    timeLeft,
    quiz,
    showResult,
    currentQuestion,
  ]);

  // Save Score + XP
  const saveResults = async (
    finalScore: number
  ) => {
    try {
      // Save Score
      await fetch("/api/scores", {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          userId:
            session?.user?.email,

          userName:
            session?.user?.name,

          quizTitle: quiz?.title,

          score: finalScore,

          totalQuestions:
            quiz?.questions.length,
        }),
      });

      // Update XP
      await fetch("/api/users/xp", {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          email:
            session?.user?.email,

          earnedXP: finalScore * 50,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Next Question
  const handleNextQuestion =
    async () => {
      if (!currentQuestion || !quiz)
        return;

      let updatedScore = score;

      // Correct Answer
      if (
        selectedAnswer ===
        currentQuestion.correctAnswer
      ) {
        updatedScore += 1;

        setScore(updatedScore);
      }

      // Reset Selection
      setSelectedAnswer("");

      // More Questions
      if (
        currentQuestionIndex + 1 <
        quiz.questions.length
      ) {
        setCurrentQuestionIndex(
          (prev) => prev + 1
        );

        setTimeLeft(QUESTION_TIME);

        return;
      }

      // Quiz Finished
      await saveResults(updatedScore);

      setShowResult(true);
    };

  // Loading State
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        
        <h1 className="animate-pulse text-4xl font-black text-white">
          Loading Quiz...
        </h1>
      </div>
    );
  }

  // Empty State
  if (
    !quiz ||
    !quiz.questions ||
    quiz.questions.length === 0
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black p-6">
        
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
          
          <h1 className="text-4xl font-black text-white">
            No Quiz Found 😢
          </h1>

          <p className="mt-4 text-gray-400">
            This quiz may have been deleted
            or has no questions.
          </p>
        </div>
      </div>
    );
  }

  // Result Screen
  if (showResult) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black p-6">
        
        <ResultCard
          score={score}
          total={
            quiz.questions.length
          }
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6">
      
      <div className="mx-auto max-w-4xl">
        
        {/* Top Section */}
        <div className="mb-6 flex items-center justify-between">
          
          <Timer time={timeLeft} />

          <div className="rounded-full bg-white/5 px-5 py-3 text-white backdrop-blur-xl">
            Question{" "}
            {currentQuestionIndex + 1}
            {" / "}
            {quiz.questions.length}
          </div>
        </div>

        {/* Progress */}
        <ProgressBar
          progress={
            ((currentQuestionIndex + 1) /
              quiz.questions.length) *
            100
          }
        />

        {/* Quiz Title */}
        <div className="mt-8">
          
          <h1 className="text-4xl font-black text-white md:text-5xl">
            {quiz.title}
          </h1>

          <p className="mt-2 text-gray-400">
            Answer carefully before time
            runs out ⏳
          </p>
        </div>

        {/* Question */}
<div className="mt-8">
  
  {currentQuestion && (
    <QuestionCard
      question={
        currentQuestion.question
      }
      options={
        currentQuestion.options
      }
      selectedAnswer={
        selectedAnswer
      }
      onSelect={
        setSelectedAnswer
      }
    />
  )}
</div>

        {/* Next Button */}
        <button
          onClick={
            handleNextQuestion
          }
          disabled={!selectedAnswer}
          className="
            mt-8
            rounded-2xl
            bg-white
            px-8
            py-4
            font-bold
            text-black
            transition-all
            duration-300
            hover:scale-105
            hover:bg-gray-200
            active:scale-95
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {currentQuestionIndex + 1 ===
          quiz.questions.length
            ? "Finish Quiz"
            : "Next Question"}
        </button>
      </div>
    </div>
  );
};

export default QuizPage;