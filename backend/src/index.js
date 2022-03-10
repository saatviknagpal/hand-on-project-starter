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
const Joi = require("joi");
const validationSchema = Joi.object({
  name: Joi.string().required().min(2),
  endPoint: Joi.string().uri().required().allow(""),
  description: Joi.string().required().min(3),
});

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
  res.json("Authentication Succesful");
});

//CRUD API

app.get("/api", (req, res) => {
  API.find()
    .populate("postedBy", "_id name")
    .then((apis) => {
      res.json({ apis });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

app.get("/api/myapi", validateToken, (req, res) => {
  API.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then((myapi) => {
      res.json({ myapi });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

app.get("/api/myapi/:id", validateToken, (req, res) => {
  API.findById(req.params.id)
    .then((myapi) => {
      res.json({ myapi });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

app.post("/api", validateToken, async (req, res) => {
  const { error } = validationSchema.validate(req.body);

  if (error) {
    return res.send({
      status: 400,
      message: error.details[0].message,
    });
  } else {
    const { name, endPoint, description } = req.body;
    if (!name || !endPoint || !description) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    req.user.password = undefined;
    const api = new API({
      name: name,
      endPoint: endPoint,
      description: description,
      postedBy: req.user,
    });

    try {
      const newAPI = await api.save();
      res.status(201).json({ newAPI, message: "API Added Successfully" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
});

app.put("/api/update/:id", validateToken, async (req, res) => {
  try {
    let api = await API.findOne({ _id: req.params.id });

    const { name, endPoint, description } = req.body;

    if (!name && !endPoint && !description) {
      return res.status(400).json({
        message: "Edit some data to update API",
      });
    }

    if (name) {
      api.name = name;
    }
    if (endPoint) {
      api.endPoint = endPoint;
    }
    if (description) {
      api.description = description;
    }

    await api.save();
    return res.status(200).json({
      message: "Update Successful",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.delete("/api/delete/:id", validateToken, (req, res) => {
  API.findByIdAndDelete(req.params.id)
    .then((api) => {
      if (api) {
        return res.status(404).send({ message: "API does not exist" });
      }
      res.send({ message: "Deleted Successfully" });
    })
    .catch((err) => {
      return res.status(404).send({
        message: "API not found" + err,
      });
    });
});

app.listen(process.env.PORT, () => {
  console.log(`Backend server is running on port ` + process.env.PORT);
});
