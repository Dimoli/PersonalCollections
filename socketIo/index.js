const socketIo = require("socket.io");

const socket = (server) => {
  const io = socketIo(server);

  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("updateItemComments", (comments) =>
      updateItemComments(socket, comments)
    );

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};

const updateItemComments = (socket, comments) => {
  socket.emit("updateItemComments", comments);
};

module.exports = socket;
