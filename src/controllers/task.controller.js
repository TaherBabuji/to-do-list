import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Task } from "../models/task.model.js";

const addTask = asyncHandler(async (req, res) => {
  const { title, description, priority, category, dueDate } = req.body;

  if ([title, category, dueDate].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "title, category and dueDate are required");
  }

  const existedTask = await Task.find({ title: title });

  if (existedTask.length > 0) {
    throw new ApiError(
      400,
      "Task with this title already exists, Please provide unique title"
    );
  }

  const task = await Task.create({
    title,
    description,
    priority,
    category,
    dueDate,
  });

  if (!task) {
    throw new ApiError(400, "Something went wrong while creating a new task");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, task, "New task created successfully"));
});

const getAllTask = asyncHandler(async (req, res) => {
  const task = await Task.find();

  if (!task) {
    throw new ApiError(400, "Something went wrong while getting all tasks");
  }

  if (task.length === 0) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          null,
          "Your task list is empty, Please add some tasks first"
        )
      );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, task, "All tasks fetched successfully"));
});

const updateTaskStatus = asyncHandler(async (req, res) => {
  const taskId = req.params.id;
  const { status } = req.body;

  if (status.trim() === "") {
    throw new ApiError(400, "Please provide status to update the status");
  }

  const previousStatus = await Task.findById(taskId);

  if (previousStatus.status === "completed" && status === "completed") {
    throw new ApiError(400, "This task is already marked as completed");
  }

  const task = await Task.findByIdAndUpdate(
    taskId,
    { status: status },
    { new: true, runValidators: true }
  );

  if (!task) {
    throw new ApiError(400, "Something went wrong while updating task status");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task status updated successfully"));
});

const updateTask = asyncHandler(async (req, res) => {
  const taskId = req.params.id;
  const { title, description, dueDate, category } = req.body;

  if (!title && !description && !dueDate && !category) {
    throw new ApiError(
      400,
      "Please provide atleast one value to update the task"
    );
  }

  const existedTask = await Task.find({ title: title });

  if (existedTask.length > 0) {
    throw new ApiError(
      400,
      "Task with this title already exists, please provide a unique title"
    );
  }

  const task = await Task.findByIdAndUpdate(
    taskId,
    { title, description, category, dueDate },
    { new: true, runValidators: true }
  );

  if (!task) {
    throw new ApiError(400, "Something went wrong while updating task");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task updated successfully"));
});

const deleteTask = asyncHandler(async (req, res) => {
  const taskId = req.params.id;

  const task = await Task.findByIdAndDelete(taskId);

  if (!task) {
    throw new ApiError(400, "You dont have a task with this id");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Task deleted successfully"));
});

export { addTask, getAllTask, updateTaskStatus, updateTask, deleteTask };
