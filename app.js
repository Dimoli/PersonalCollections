const express = require("express");
const config = require("config");
const cors = require("cors");
const app = express();

app.use(express.json({ extended: true }));
app.use(cors());

app.use(require("./routes/"));
app.get("/", (req, res) => {
  res.send("Welcome to the club buddy, you are officiently part of band");
});

/* if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} */

require("./mongoDB/")();

const PORT = process.env.port || config.get("port") || 5000;
const server = app.listen(PORT, () =>
  console.log(`App has been started on port ${PORT}...`)
);

require("./socketIo/")(server);
