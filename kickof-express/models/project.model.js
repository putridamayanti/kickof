const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    id: String,
    workspaceId: String,
    name: {type: String, index: true},
    code: {type: String, index: true},
    description: String,
    image: String,
    userIds: Array, // userid
}, { timestamps: true })

exports.ProjectModel = mongoose.model("Project", ProjectSchema)