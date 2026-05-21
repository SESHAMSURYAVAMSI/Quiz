"use client";

import { useEffect, useState } from "react";

import QuizCard from "@/components/quiz/QuizCard";

interface Quiz {
  _id: string;
  title: string;
  difficulty: string;
  questions: [];
}

const QuizzesPage = () => {
  const [quizzes, setQuizzes] =
    useState<Quiz[]>([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const res = await fetch(
        "/api/quizzes"
      );

      const data = await res.json();

      setQuizzes(data);
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="min-h-screen bg-black p-6">
      
      <h1 className="mb-10 text-5xl font-black text-white">
        Explore Quizzes 🚀
      </h1>

      <div className="grid gap-6 md:grid-cols-3">
        {quizzes.map((quiz) => (
          <QuizCard
            key={quiz._id}
            quiz={{
              id: quiz._id,
              title: quiz.title,
              difficulty:
                quiz.difficulty,
              questions:
                quiz.questions.length,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizzesPage;