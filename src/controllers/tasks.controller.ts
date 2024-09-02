import { Request, Response } from "express";
import TasksSchema from "../models/TasksSchema";
import TaskAsigneeSchema from "../models/TaskAsigneeSchema";

export const createTask = async (req: Request, res: Response) => {
      try {
            const { title, description, priority, dueDate, asignee } = req.body
            const task = await TasksSchema.create({
                  title,
                  description,
                  priority,
                  dueDate,
                  assignee: asignee ? asignee : null,
                  createdBy: req.currentUser?._id
            })
            return res.status(201).json({
                  success: true,
                  task
            })

      } catch (error) {
            const message = (error as Error).message
            return res.status(500).json({
                  success: false,
                  error: message
            })
      }
}

export const getAllTasks = async (req: Request, res: Response) => {
      try {
            const tasks = await TasksSchema.find({})
            return res.status(200).json({
                  success: true,
                  tasks
            })
      } catch (error) {
            const message = (error as Error).message
            return res.status(500).json({
                  success: false,
                  error: message
            })
      }
}
export const getTaskByid = async (req: Request, res: Response) => {
      try {
            const task = await TasksSchema.findById(req.params.id)
            return res.status(200).json({
                  success: true,
                  task
            })
      } catch (error) {
            const message = (error as Error).message
            return res.status(500).json({
                  success: false,
                  error: message
            })
      }
}

export const updateTask = async (req: Request, res: Response) => {
      try {
            const task = await TasksSchema.findByIdAndUpdate(req.params.id, {
                  $set: {
                        ...req.body
                  }
            })
            const updatedTask = await TasksSchema.findById(task?.id)
            return res.status(200).json({
                  success: true,
                  updatedTask
            })
      } catch (error) {
            const message = (error as Error).message
            return res.status(500).json({
                  success: false,
                  error: message
            })
      }
}
export const asignTask = async (req: Request, res: Response) => {
      try {
            const task = await TasksSchema.findById(req.params.id)
            if (!task) {
                  return res.status(404).json({
                        success: false,
                        message: "Task not Found"
                  })
            }
            const taskAsign = await TaskAsigneeSchema.create({
                  userId: req.currentUser?._id,
                  asignee: req.body.asignee,
                  taskId: task.id
            })
            return res.status(201).json({
                  success: true,
                  taskAsign
            })
      } catch (error) {
            const message = (error as Error).message
            return res.status(500).json({
                  success: false,
                  error: message
            })
      }
}
export const deleteTask = async (req: Request, res: Response) => {
      try {
            const deleteTask = await TasksSchema.findByIdAndDelete(req.params.id)
            return res.status(200).json({
                  success: true,
                  deleteTask
            })
      } catch (error) {
            const message = (error as Error).message
            return res.status(500).json({
                  success: false,
                  error: message
            })
      }
}
export const updateTaskStatus = async (req: Request, res: Response) => {
      try {
            const taskStatus = await TasksSchema.findByIdAndUpdate(req.params.id, {
                  $set: {
                        status: req.body.status
                  }
            })
            return res.status(200).json({
                  success: true,
                  taskStatus
            })
      } catch (error) {
            const message = (error as Error).message
            return res.status(500).json({
                  success: false,
                  error: message
            })
      }
}