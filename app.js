const express = require("express");
const passport = require("passport");
const VKontakteStrategy = require("passport-vkontakte").Strategy;
const config = require("config");
const mongoose = require("mongoose");

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

const app = express();

app.use(express.json({ extended: true }));
app.use(passport.initialize());

passport.use(
  new VKontakteStrategy(
    {
      clientID: config.get("OAuth.vkAuth.clientID"),
      clientSecret: config.get("OAuth.vkAuth.clientSecret"),
      callbackURL: config.get("OAuth.vkAuth.callbackURL"),
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      return done(null, profile);
    }
  )
);

app.use("/auth", require("./routes/OAuth/vkAuth"));
app.use("/auth", require("./routes/auth"));
app.use("/admin-operations", require("./routes/admin/operations"));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = config.get("port") || 5000;

const start = async () => {
  try {
    await mongoose.connect(config.get("mongoURI"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`)
    );
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
};

start();
