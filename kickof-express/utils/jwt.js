'use strict';

const bcrypt = require('bcryptjs');
const moment = require("moment");
const jwt = require("jsonwebtoken");

exports.GeneratePassword = password => {
    const salt = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
};

exports.GenerateToken = email => {
    const expire = moment().add(1, "d");

    return jwt.sign(
        {email: email},
        process.env.JWT_SECRET,
        {expiresIn: expire.unix()}
    );
};

exports.ValidatePassword = async (password, hashed) => {
    return await bcrypt.compare(
        password,
        hashed
    );
};

exports.VerifyToken = token => {
    return jwt.verify(token, process.env.JWT_SECRET, {});
};