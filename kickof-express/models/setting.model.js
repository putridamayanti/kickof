const mongoose = require("mongoose");

const SettingSchema = new mongoose.Schema({
    id: String,
    code: String,
    name: String,
    setting: Object
}, { timestamps: true })

exports.SettingModel = mongoose.model("Setting", SettingSchema)
