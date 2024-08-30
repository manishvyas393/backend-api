import mongoose from "mongoose";

const TaskAsigneeModel = new mongoose.Schema({
      taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tasks' },  // task reference
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },  // user reference
}, { timestamps: true })

const TaskModel = mongoose.model("TasksAsignee", TaskAsigneeModel)

export default TaskModel