import { Router } from "express";
import { checkAuth } from "../middlewares/checkAuth";
import { asignTask, createTask, deleteTask, getAllTasks, getTaskByid, updateTask, updateTaskStatus } from "../controllers/tasks.controller";

const taskRouter = Router()

taskRouter.get("/", checkAuth, getAllTasks)
taskRouter.post("/", checkAuth, createTask)
taskRouter.get("/:id", checkAuth, getTaskByid)
taskRouter.put("/:id", checkAuth, updateTask)
taskRouter.patch("/:id/asign", checkAuth, asignTask)
taskRouter.delete("/:id", checkAuth, deleteTask)
taskRouter.put("/:id/status", checkAuth, updateTaskStatus)

export default taskRouter