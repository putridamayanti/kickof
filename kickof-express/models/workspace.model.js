const mongoose = require("mongoose");

const WorkspaceSchema = new mongoose.Schema({
    id: String,
    name: String,
    code: String,
    userIds: Array, // userId
    endpoint: {type: String},
    size: {
        type: String,
        enum: ['1', '2-20', '21-200', '200+']
    },
    createdBy: {type: String, index: true}, // WorkspaceId
}, { timestamps: true })

exports.WorkspaceModel = mongoose.model("Workspace", WorkspaceSchema)