const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
dotenv.config();

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB: ", err.message);
  });

app.post("/api/register", async (req, res) => {
  console.log(req.body);

  const { name, email, password: plainTextPassword } = req.body;

  if (!name || typeof name !== "string") {
    return res.json({ status: "error", error: "Invalid username" });
  }
  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }
  if (plainTextPassword.length < 5) {
    return res.json({
      status: "error",
      error: "Password too small. Should be atleast 6 characters",
    });
  }

  const password = await bcrypt.hash(plainTextPassword, 10);

  try {
    const response = await User.create({
      name,
      email,
      password,
    });
    console.log("User created successfully: ", response);
  } catch (err) {
    console.log(JSON.stringify(err));
    if (err.code === 11000) {
      //duplicate key
      return res.json({ status: "error", error: "Duplicate email" });
    }
    throw err;
  }
  res.json({ status: "ok" });
});

app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        name: req.body.name,
        email: req.body.email,
      },
      "secret123",
    );
    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: "false" });
  }
  // res.json({ status: "ok" });
});

app.listen(process.env.PORT, () => {
  console.log(`Backend server is running on port ` + process.env.PORT);
});
