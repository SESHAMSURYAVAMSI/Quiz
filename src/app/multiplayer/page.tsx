import CreateRoom from "@/components/multiplayer/CreateRoom";
import JoinRoom from "@/components/multiplayer/JoinRoom";

export default function MultiplayerPage() {
  return (
    <div className="min-h-screen flex items-center justify-center gap-10">
      <CreateRoom />
      <JoinRoom />
    </div>
  );
}