const socketIo = require("socket.io");
const Item = require("../models/Items");

const socket = (server) => {
  const io = socketIo(server);

  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("joinToRoom", (room) => socket.join(room));

    socket.on("updateItemComments", (data) =>
      updateItemComments(io, socket, data)
    );

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};

const updateItemComments = async (io, socket, data) => {
  const { itemId, comments } = data;

  const itemById = await Item.findByIdAndUpdate(itemId, { comments });

  io.sockets.in(itemId).emit("updateItemComments", comments);
};

module.exports = socket;
