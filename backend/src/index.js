const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/user.model");
// const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fileUpload = require("express-fileupload");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");
const authenticate = require("./middlewares/authenticate");

dotenv.config();

const app = express();
const cors = require("cors");
const corsConfig = {
  credentials: true,
  origin: true,
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB: ", err.message);
  });

app.get("/", authenticate, (req, res) => {
  res.send(req.rootUser);
});

app.post("/api/register", async (req, res) => {
  console.log(req.body);
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: "Duplicate email" });
  }
});

app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res.json({ status: "error", error: "Invalid login" });
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password,
  );

  if (isPasswordValid) {
    const token = await user.generateAuthToken();
    console.log(token);
    res.cookie("jwtoken", token, {
      expires: new Date(Date.now() + 2589200000), //cookie expires in 30 days
      httpOnly: true,
    });
    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.post("/api/removebg", async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  const file = req.files.file;
  const localFile = "../frontend/public/uploads/" + file.name;
  file.mv(localFile, function (err) {
    if (err) return res.status(500).send(err);
  });
  const formData = new FormData();
  formData.append("size", "auto");
  formData.append(
    "image_file",
    fs.createReadStream(localFile),
    path.basename(localFile),
  );

  axios({
    method: "post",
    url: "https://api.remove.bg/v1.0/removebg",
    data: formData,
    responseType: "arraybuffer",
    headers: {
      ...formData.getHeaders(),
      "X-Api-Key": process.env.REMOVE_BG_API_KEY,
    },
    encoding: null,
  })
    .then((response) => {
      if (response.status != 200)
        return console.error("Error:", response.status, response.statusText);
      fs.writeFileSync(
        "../frontend/public/uploads/bg-removed" + file.name,
        response.data,
      );
      res.json({
        fileName: file.name,
        filePath: `/uploads/bg-removed` + file.name,
      });
    })
    .catch((error) => {
      return console.error("Request failed:", error);
    });
});

app.listen(process.env.PORT, () => {
  console.log(`Backend server is running on port ` + process.env.PORT);
});
