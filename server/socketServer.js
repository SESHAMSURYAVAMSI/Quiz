// eslint-disable-next-line @typescript-eslint/no-require-imports
const { createServer } = require("http");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { Server } = require("socket.io");

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const rooms = {};

const quizQuestions = [
  {
    question: "What is React?",
    options: [
      "Library",
      "Database",
      "Framework",
      "Language",
    ],
    answer: "Library",
  },

  {
    question: "Who created JavaScript?",
    options: [
      "Brendan Eich",
      "Mark Zuckerberg",
      "Elon Musk",
      "Guido",
    ],
    answer: "Brendan Eich",
  },

  {
    question: "What is Next.js?",
    options: [
      "Backend",
      "Database",
      "React Framework",
      "Language",
    ],
    answer: "React Framework",
  },
];

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  // CREATE ROOM
  socket.on("create-room", ({ username }) => {
    const roomId = Math.random().toString(36).substring(2, 8);

    rooms[roomId] = {
      players: [
        {
          id: socket.id,
          username,
        },
      ],
    };

    socket.join(roomId);

    socket.emit("room-created", roomId);

    io.to(roomId).emit("players-update", rooms[roomId].players);
  });

  // JOIN ROOM
  socket.on("join-room", ({ roomId, username }) => {
    if (!rooms[roomId]) {
      socket.emit("error-message", "Room not found");
      return;
    }

    rooms[roomId].players.push({
      id: socket.id,
      username,
    });

    socket.join(roomId);

    io.to(roomId).emit("players-update", rooms[roomId].players);
  });

  socket.on("disconnect", () => {
    for (const roomId in rooms) {
      rooms[roomId].players = rooms[roomId].players.filter(
        (player) => player.id !== socket.id
      );

      io.to(roomId).emit("players-update", rooms[roomId].players);
    }

    console.log("Disconnected:", socket.id);
  });
});

httpServer.listen(4000, () => {
  console.log("Socket Server Running on 4000");
});