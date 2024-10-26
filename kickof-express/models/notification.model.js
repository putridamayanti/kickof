const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
    id: String,
    title: String,
    content: String,
    seen: Boolean,
    app: Boolean,
    createdBy: String
}, { timestamps: true })

exports.NotificationModel = mongoose.model("Notification", NotificationSchema)