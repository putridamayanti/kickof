const mongoose = require("mongoose");

const ColumnSchema = new mongoose.Schema({
    id: String,
    workspaceId: {type: String, index: true},
    projectId: {type: String, index: true},
    name: {type: String},
}, { timestamps: true })

exports.ColumnModel = mongoose.model("Column", ColumnSchema)