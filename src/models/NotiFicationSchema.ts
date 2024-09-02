import mongoose from "mongoose";
const NotificationModel = new mongoose.Schema({
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },  // user who will receive the notification
      taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tasks' },  // task related to the notification
      message: String,  // notification message
      isRead: { type: Boolean, default: false },  // notification status
}, { timestamps: true })

const NotificationSchema = mongoose.model("Notifications", NotificationModel)
export default NotificationSchema