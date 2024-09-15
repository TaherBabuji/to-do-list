import express from "express";
import {
  addTask,
  getAllTask,
  updateTaskStatus,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
const router = express.Router();

router.route("/addTask").post(addTask);
router.route("/getAllTasks").get(getAllTask);
router.route("/updateTaskStatus/:id").put(updateTaskStatus);
router.route("/updateTask/:id").put(updateTask);
router.route("/deleteTask/:id").delete(deleteTask);

export default router;
