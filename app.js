const express = require("express");
const socketIo = require("socket.io");
const config = require("config");
const mongoose = require("mongoose");

const app = express();

app.use(express.json({ extended: true }));

app.use("/auth", require("./routes/auth"));
app.use("/admin-operations", require("./routes/admin/operations"));
// app.use("/full-text-search", require("./routes/fullTextSearch"));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const start = async () => {
  try {
    await mongoose.connect(config.get("mongoURI"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
};

start();

const PORT = config.get("port") || 5000;
const server = app.listen(PORT, () =>
  console.log(`App has been started on port ${PORT}...`)
);

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

const updateItemComments = (socket, comments) => {
  socket.emit("updateItemComments", comments);
};
