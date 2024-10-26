const express = require('express');
const router = express.Router();

const {UploadMiddleware} = require("../utils/helper");
const {GeneralController} = require("../controllers/general.controller");
const {AuthController} = require("../controllers/auth.controller");

module.exports = app => {
    router.post('/upload', UploadMiddleware(), GeneralController.Upload);

    router.post('/login', AuthController.Login);
    router.post('/register', AuthController.Register);

    app.use('/api', router);
};