const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const apiSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  endPoint: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  postedBy: {
    type: ObjectId,
    ref: "UserData",
  },
});

const API = mongoose.model("API", apiSchema);

module.exports = API;
