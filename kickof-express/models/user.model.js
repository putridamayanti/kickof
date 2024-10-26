const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    id: String,
    roleId: String,
    name: String,
    username: String,
    email: {type: String, index: true, unique: true},
    password: String,
}, { timestamps: true })

exports.UserModel = mongoose.model("User", UserSchema)