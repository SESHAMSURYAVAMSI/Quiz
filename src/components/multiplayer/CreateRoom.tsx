"use client";

import { useState } from "react";
import { socket } from "@/lib/socket";
import { useRouter } from "next/navigation";

export default function CreateRoom() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleCreate = () => {
    socket.emit("create-room", { username });

    socket.on("room-created", (roomId) => {
      router.push(`/multiplayer/room/${roomId}`);
    });
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Enter username"
        className="border p-2 rounded"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button
        onClick={handleCreate}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create Room
      </button>
    </div>
  );
}