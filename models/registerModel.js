const mongoose = require("mongoose");

const registerSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please add your email"],
    },
    password: {
      type: String,
      required: [true, "Please add your password"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Register", registerSchema);
