const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const todoModel = mongoose.model("Todo", todoSchema);

module.exports = {
  todoModel,
};
