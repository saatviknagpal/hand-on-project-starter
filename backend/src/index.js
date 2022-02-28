const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/user.model");
const bcrypt = require("bcryptjs");
const fileUpload = require("express-fileupload");
const axios = require("axios");
const FormData = require("form-data");
const { createTokens, validateToken } = require("./middlewares/authenticate");
const API = require("./models/API");

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

//REGISTER API
app.post("/api/register", async (req, res) => {
  console.log(req.body);
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });
    res.json({ status: "USER REGISTERED" });
  } catch (err) {
    if (err) {
      res.status(400).json({ error: err });
    }
  }
});

//LOGIN API

app.post("/api/login", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({
    email: email,
  });

  if (!user) {
    return res.json({ status: "error", error: "Invalid login" });
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password,
  );

  if (isPasswordValid) {
    const accessToken = createTokens(user);

    return res.json({ status: "ok", user: accessToken });
  } else {
    return res.json({ status: "error", user: false });
  }
});

//BG REMOVER API

app.post("/upload", async (req, res) => {
  const { image } = req.body;
  const imageData = image.substring(image.indexOf(",") + 1);
  const formData = new FormData();
  formData.append("size", "auto");
  formData.append("image_file_b64", imageData);

  axios({
    method: "post",
    url: "https://api.remove.bg/v1.0/removebg",
    data: formData,
    headers: {
      ...formData.getHeaders(),
      "X-Api-Key": process.env.REMOVE_BG_API_KEY,
      Accept: "application/json",
    },
    encoding: null,
  })
    .then((response) => {
      if (response.status != 200)
        return console.error("Error:", response.status, response.statusText);
      // console.log(response.data);
      res.send(response.data.data);
    })
    .catch((error) => {
      return console.error("Request failed:", error);
    });
});

app.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

//CRUD API

app.get("/api", async (req, res) => {
  try {
    const apis = await API.find();
    res.json(apis);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/:id", getAPIs, (req, res) => {
  res.json(res.api);
});

app.post("/api", async (req, res) => {
  const api = new API({
    name: req.body.name,
    endPoint: req.body.endPoint,
    description: req.body.description,
  });

  try {
    const newAPI = await api.save();
    res.status(201).json(newAPI);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.patch("/api/:id", getAPIs, async (req, res) => {
  if (req.body.name != null) {
    res.api.name = req.body.name;
  }
  if (req.body.endPoint != null) {
    res.api.endPoint = req.body.endPoint;
  }
  if (req.body.description != null) {
    res.api.description = req.body.description;
  }

  try {
    const updatedAPI = await res.api.save();
    res.json(updatedAPI);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/api/:id", getAPIs, async (req, res) => {
  try {
    await res.api.remove();
    res.json({ message: "Deleted API" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getAPIs(req, res, next) {
  let api;
  try {
    api = await API.findById(req.params.id);
    if (api == null) {
      return res.status(404).json({ message: "Cannot find API" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.api = api;
  next();
}

app.listen(process.env.PORT, () => {
  console.log(`Backend server is running on port ` + process.env.PORT);
});
