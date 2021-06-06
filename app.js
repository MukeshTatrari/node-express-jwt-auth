const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { requiredAuth } = require("./authmiddleware/authMiddleware");

const app = express();
const authRoutes = require("./routes/authRoutes");
// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
// view engine
app.set("view engine", "ejs");

// database connection
const dbURI =
  "mongodb+srv://mukesh_tatrari:vR8yHHW2dPxyADaR@cluster0.byos5.mongodb.net/node-auth";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// app.listen(3000)
// routes
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", requiredAuth , (req, res) => res.render("smoothies"));

app.get("/set-cookies", (req, res) => {
  // res.setHeader("Set-Cookies", "newUser=true");
  res.cookie("newUser", false, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
  res.send("u got the cookie");
});

app.get("/read-cookies", (req, res) => {
  const cookies = req.cookies;
  console.log("cookies", cookies);
  res.json(cookies);
});
app.use(authRoutes);
