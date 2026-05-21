"use client";

import { socket } from "@/lib/socket";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function RoomPage() {
  const params = useParams();

  const roomId = params.roomId as string;

  const [players, setPlayers] = useState<any[]>([]);
  const [question, setQuestion] = useState<any>(null);
  const [quizStarted, setQuizStarted] =
    useState(false);

  const [gameEnded, setGameEnded] =
    useState(false);

  useEffect(() => {
    socket.on("players-update", (updatedPlayers) => {
      setPlayers(updatedPlayers);
    });

    socket.on("quiz-started", () => {
      setQuizStarted(true);
    });

    socket.on("question-update", (q) => {
      setQuestion(q);
    });

    socket.on("quiz-ended", (finalPlayers) => {
      setPlayers(finalPlayers);

      setGameEnded(true);
    });

    return () => {
      socket.off("players-update");
      socket.off("quiz-started");
      socket.off("question-update");
      socket.off("quiz-ended");
    };
  }, []);

  const submitAnswer = (option: string) => {
    socket.emit("submit-answer", {
      roomId,
      answer: option,
    });
  };

  const nextQuestion = () => {
    socket.emit("next-question", {
      roomId,
    });
  };

  const startQuiz = () => {
    socket.emit("start-quiz", {
      roomId,
    });
  };

  return (
    <div className="min-h-screen p-10">

      {/* PLAYERS */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Players
        </h2>

        <div className="space-y-3">
          {players.map((player) => (
            <div
              key={player.id}
              className="p-4 rounded bg-gray-100 flex justify-between"
            >
              <span>{player.username}</span>

              <span>
                {player.score} XP
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* START BUTTON */}
      {!quizStarted && (
        <button
          onClick={startQuiz}
          className="bg-blue-500 text-white px-6 py-3 rounded"
        >
          Start Quiz
        </button>
      )}

      {/* QUESTION */}
      {question && !gameEnded && (
        <div className="mt-10">

          <h1 className="text-3xl font-bold mb-6">
            {question.question}
          </h1>

          <div className="grid grid-cols-2 gap-4">
            {question.options.map(
              (option: string) => (
                <button
                  key={option}
                  onClick={() =>
                    submitAnswer(option)
                  }
                  className="p-4 rounded bg-purple-500 text-white"
                >
                  {option}
                </button>
              )
            )}
          </div>

          <button
            onClick={nextQuestion}
            className="mt-8 bg-black text-white px-6 py-3 rounded"
          >
            Next Question
          </button>
        </div>
      )}

      {/* GAME END */}
      {gameEnded && (
        <div className="mt-10">
          <h1 className="text-4xl font-bold mb-6">
            Quiz Finished 🎉
          </h1>

          <div className="space-y-4">
            {[...players]
              .sort((a, b) => b.score - a.score)
              .map((player, index) => (
                <div
                  key={player.id}
                  className="p-4 bg-yellow-100 rounded flex justify-between"
                >
                  <span>
                    #{index + 1}{" "}
                    {player.username}
                  </span>

                  <span>
                    {player.score} XP
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}