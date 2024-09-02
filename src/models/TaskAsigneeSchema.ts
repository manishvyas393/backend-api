import mongoose from "mongoose";

const TaskAsigneeModel = new mongoose.Schema({
      asignee: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
      taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tasks' },  // task reference
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },  // user reference
}, { timestamps: true })

const TaskAsigneeSchema = mongoose.model("TasksAsignee", TaskAsigneeModel)

export default TaskAsigneeSchema