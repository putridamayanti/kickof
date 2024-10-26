const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
    id: String,
    name: String,
    code: String
}, { timestamps: true })

exports.RoleModel = mongoose.model("Role", RoleSchema)