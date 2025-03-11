import { Server } from "socket.io";
import { randomUUID } from "crypto";

const io = new Server({
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  const room = socket.handshake.headers.room;
  const user = socket.handshake.headers.user;

  socket.join(room);

  if (user) {
    socket.on("sendMessage", (message) => {
      io.to(room).emit("message", { user, message, id: randomUUID() });
    });
  }
});

io.listen(4000);
