import mongoose from "mongoose";

const CommentsModel = new mongoose.Schema({
      taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tasks' },
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },  // user who commented
      comment: String,  // the comment text
}, { timestamps: true })

const CommentsSchema = mongoose.model("Comments", CommentsModel)
export default CommentsSchema