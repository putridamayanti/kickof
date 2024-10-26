const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    id: String,
    workspaceId: {type: String, index: true},
    projectId: {type: String, index: true},
    columnId: {type: String, index: true},
    title: {type: String},
    description: String,
    labelIds: Array, // taskLabelId
    assignees: Array, // userId
    startDate: Date,
    dueDate: Date,
}, { timestamps: true })

exports.TaskModel = mongoose.model("Task", TaskSchema)