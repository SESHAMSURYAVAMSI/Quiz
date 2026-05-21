"use client";

import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import { useRouter } from "next/navigation";

export default function JoinRoom() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // ROOM NOT FOUND
    socket.on("error-message", (message: string) => {
      setLoading(false);
      alert(message);
    });

    // SUCCESSFULLY JOINED
    socket.on("players-update", () => {
      setLoading(false);
      router.push(`/multiplayer/room/${roomId}`);
    });

    return () => {
      socket.off("error-message");
      socket.off("players-update");
    };
  }, [roomId, router]);

  const handleJoin = () => {
    // VALIDATIONS
    if (!roomId.trim()) {
      alert("Please enter room ID");
      return;
    }

    if (!username.trim()) {
      alert("Please enter username");
      return;
    }

    setLoading(true);

    socket.emit("join-room", {
      roomId: roomId.trim(),
      username: username.trim(),
    });
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-xl space-y-5">

      <div>
        <h2 className="text-2xl font-bold text-white">
          Join Multiplayer Room
        </h2>

        <p className="text-sm text-gray-400 mt-1">
          Enter room code and username
        </p>
      </div>

      {/* ROOM ID */}
      <div className="space-y-2">
        <label className="text-sm text-gray-300">
          Room ID
        </label>

        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) =>
            setRoomId(e.target.value.toUpperCase())
          }
          className="
            w-full
            rounded-xl
            border
            border-white/10
            bg-black/20
            p-3
            text-white
            outline-none
            transition
            focus:border-green-500
          "
        />
      </div>

      {/* USERNAME */}
      <div className="space-y-2">
        <label className="text-sm text-gray-300">
          Username
        </label>

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="
            w-full
            rounded-xl
            border
            border-white/10
            bg-black/20
            p-3
            text-white
            outline-none
            transition
            focus:border-green-500
          "
        />
      </div>

      {/* BUTTON */}
      <button
        onClick={handleJoin}
        disabled={loading}
        className="
          w-full
          rounded-xl
          bg-green-500
          py-3
          font-semibold
          text-white
          transition-all
          hover:scale-[1.02]
          hover:bg-green-600
          disabled:opacity-50
        "
      >
        {loading ? "Joining..." : "Join Room"}
      </button>
    </div>
  );
}