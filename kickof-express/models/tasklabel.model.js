const mongoose = require("mongoose");

const TaskLabelSchema = new mongoose.Schema({
    id: String,
    workspaceId: {type: String, index: true},
    projectId: {type: String, index: true},
    label: String,
    color: String
}, { timestamps: true })

exports.TaskLabelModel = mongoose.model("TaskLabel", TaskLabelSchema)