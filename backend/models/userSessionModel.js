const mongoose = require("mongoose");

const userSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  //   sessionId: { type: String, required: true },
});
