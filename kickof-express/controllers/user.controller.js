const {GenerateQuery} = require("../utils/helper");
const {UserService} = require("../services/user.service");
const {v4: uuid} = require("uuid");
const {GeneratePassword} = require("../utils/jwt");

const GetUsersByQuery = async (req, res) => {
    const { limit, page, skip, sort } = GenerateQuery(req.query);
    const query = {};

    if (req.query?.keyword) query.email = { '$regex': '.*' + req.query?.keyword + '.*', '$options': '$i' };

    const result = await UserService.GetUsers({limit, page, skip, sort, query});

    return res.status(200).send({data: result.data});
};

const CreateUser = async (req, res) => {
    const params = req.body;
    params.id = uuid(null, null, null);
    params.password = GeneratePassword(params.password);

    const result = await UserService.CreateUser(params);
    if (result.error) {
        return res.status(result?.status || 400).send({data: result.error});
    }

    return res.status(200).send({data: 'Success'});
};

const GetUserById = async (req, res) => {
    const {id} = req.params;

    const result = await UserService.GetUser({id});
    if (result.error) {
        return res.status(result?.status || 400).send({data: result.error});
    }

    return res.status(200).send({data: result.data});
};

const UpdateUser = async (req, res) => {
    const params = req.body;
    const {id} = req.params;

    if (params.password) {
        params.password = GeneratePassword(params.password);
    }

    const result = await UserService.UpdateUser({id}, params);
    if (result.error) {
        return res.status(result?.status || 400).send({data: result.error});
    }

    return res.status(200).send({data: result.data});
};

const DeleteUser = async (req, res) => {
    const ids = req.params.id.split(',');

    const result = await UserService.DeleteUser({ id: ids });
    if (result.error) {
        return res.status(result?.status || 400).send({data: result.error});
    }

    return res.status(200).send({data: result.data});
};

exports.UserController = {
    GetUsersByQuery,
    CreateUser,
    GetUserById,
    UpdateUser,
    DeleteUser
};