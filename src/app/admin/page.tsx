"use client";

import { useState } from "react";

import { toast } from "sonner";

import { Question } from "@/types/quiz";

const AdminPage = () => {
  const [loading, setLoading] =
    useState(false);

  const [title, setTitle] =
    useState("");

  const [difficulty, setDifficulty] =
    useState("");

  const [questions, setQuestions] =
    useState<Question[]>([
      {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      },
    ]);

  // Update Question
  const updateQuestion = (
    index: number,
    value: string
  ) => {
    const updated = [...questions];

    updated[index].question = value;

    setQuestions(updated);
  };

  // Update Option
  const updateOption = (
    qIndex: number,
    oIndex: number,
    value: string
  ) => {
    const updated = [...questions];

    updated[qIndex].options[oIndex] =
      value;

    setQuestions(updated);
  };

  // Update Correct Answer
  const updateCorrectAnswer = (
    index: number,
    value: string
  ) => {
    const updated = [...questions];

    updated[index].correctAnswer =
      value;

    setQuestions(updated);
  };

  // Add Question
  const addQuestion = () => {
    setQuestions([
      ...questions,

      {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      },
    ]);
  };

  // Submit Quiz
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "/api/quizzes",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            title,
            difficulty,
            questions,
          }),
        }
      );

      if (!res.ok) {
        toast.error(
          "Failed to create quiz"
        );

        return;
      }

      toast.success(
        "Quiz created successfully"
      );

      setTitle("");
      setDifficulty("");

      setQuestions([
        {
          question: "",
          options: ["", "", "", ""],
          correctAnswer: "",
        },
      ]);
    } catch (error) {
      toast.error(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black p-6">
      
      <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        
        <h1 className="mb-10 text-5xl font-black text-white">
          Create Quiz 🚀
        </h1>

        {/* Quiz Details */}
        <div className="grid gap-5">
          
          <input
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Quiz Title"
            className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white outline-none"
          />

          <input
            value={difficulty}
            onChange={(e) =>
              setDifficulty(
                e.target.value
              )
            }
            placeholder="Difficulty"
            className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white outline-none"
          />
        </div>

        {/* Questions */}
        <div className="mt-10 space-y-10">
          {questions.map(
            (question, qIndex) => (
              <div
                key={qIndex}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                
                <h2 className="mb-5 text-2xl font-bold text-white">
                  Question {qIndex + 1}
                </h2>

                {/* Question */}
                <input
                  value={question.question}
                  onChange={(e) =>
                    updateQuestion(
                      qIndex,
                      e.target.value
                    )
                  }
                  placeholder="Enter question"
                  className="w-full rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none"
                />

                {/* Options */}
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {question.options.map(
                    (
                      option,
                      oIndex
                    ) => (
                      <input
                        key={oIndex}
                        value={option}
                        onChange={(e) =>
                          updateOption(
                            qIndex,
                            oIndex,
                            e.target.value
                          )
                        }
                        placeholder={`Option ${
                          oIndex + 1
                        }`}
                        className="rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none"
                      />
                    )
                  )}
                </div>

                {/* Correct Answer */}
                <input
                  value={
                    question.correctAnswer
                  }
                  onChange={(e) =>
                    updateCorrectAnswer(
                      qIndex,
                      e.target.value
                    )
                  }
                  placeholder="Correct Answer"
                  className="mt-6 w-full rounded-2xl border border-green-500/20 bg-green-500/10 p-4 text-white outline-none"
                />
              </div>
            )
          )}
        </div>

        {/* Actions */}
        <div className="mt-10 flex flex-wrap gap-4">
          
          <button
            onClick={addQuestion}
            className="rounded-2xl bg-white px-6 py-4 font-bold text-black transition hover:bg-gray-200"
          >
            + Add Question
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-2xl bg-purple-500 px-6 py-4 font-bold text-white transition hover:bg-purple-600"
          >
            {loading
              ? "Creating..."
              : "Create Quiz"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage; 