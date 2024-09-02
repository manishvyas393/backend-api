import mongoose from "mongoose";

const TasksModel = new mongoose.Schema({
      title: String,  // task title
      description: String,  // task description
      priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },  // task priority
      status: { type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo' },  // task status
      dueDate: Date,  // deadline for the task
      assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },  // assigned user (referencing users collection)
      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },  // user who created the task
      comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }],  // references to comments collection
}, { timestamps: true })

const TasksSchema = mongoose.model("Tasks", TasksModel)

export default TasksSchema