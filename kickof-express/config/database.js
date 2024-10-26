const mongoose = require('mongoose');
const {UserModel} = require("../models/user.model");
const {USER_DEFAULT_DATA, ROLE_DEFAULT_DATA, SETTING_DEFAULT_DATA} = require("../data/default");
const {GeneratePassword} = require("../utils/jwt");
const {RoleModel} = require("../models/role.model");
const {SettingModel} = require("../models/setting.model");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
            .then(async () => {
                await mongoose.connect(process.env.MONGODB_URI)
                    .then(async () => {
                        const countRoles = await RoleModel.countDocuments({}).lean();
                        if (countRoles === 0) {
                            await RoleModel.insertMany(ROLE_DEFAULT_DATA, null);
                            console.log('Role default data created.')
                        }

                        const countUsers = await UserModel.countDocuments({}).lean();
                        if (countUsers === 0) {
                            const userData = [];
                            for (const e of USER_DEFAULT_DATA) {
                                e.password = GeneratePassword(e.password);
                                userData.push(e);
                            }
                            await UserModel.insertMany(userData, null)
                            console.log('User default data created.')
                        }

                        const countSettings = await SettingModel.countDocuments({}).lean();
                        if (countSettings === 0) {
                            await SettingModel.insertMany(SETTING_DEFAULT_DATA, null);
                            console.log('Setting default data created.')
                        }
                    });
            });
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;