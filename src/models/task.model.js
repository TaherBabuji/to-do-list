import mongoose, { Schema } from "mongoose";
import { ApiError } from "../utils/apiError.js";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "in progress", "completed"],
        message:
          "{VALUE} is not a valid status. Valid options are pending, in progress, or completed.",
      },
      default: "pending",
    },
    category: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          if (value <= new Date()) {
            throw new ApiError(400, "Due date must be in future");
          }
          return true;
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model("Task", taskSchema);
