const {verify} = require("jsonwebtoken");
const {UserModel} = require("../models/user.model");

exports.AuthMiddleware = async (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).send({data: "Unauthorized"});
    }

    try {
        const data = verify(token, process.env.JWT_SECRET);
        if (!data) {
            return res.status(500).send({data: "Unable to access feature. Please login again!"});
        }

        const user = await UserModel.findOne({email: data.email}, {password: 0}, null);
        if (!user) {
            return res.status(500).send({data: "Unable to access feature. Please login again!"});
        }

        req.user = user;

        return next();
    } catch (e) {
        return res.status(500).send({data: e});
    }
};