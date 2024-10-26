const {RoleService} = require("../services/role.service");
const {v4: uuid} = require("uuid");
const {GenerateQuery} = require("../utils/helper");

const GetRolesByQuery = async (req, res) => {
    const { limit, page, skip, sort } = GenerateQuery(req.query);
    const query = {};

    if (req.query?.keyword) query.name = { '$regex': '.*' + req.query?.keyword + '.*', '$options': '$i' };

    const result = await RoleService.GetRoles({limit, page, skip, sort, query});

    return res.status(200).send({data: result.data});
};

const CreateRole = async (req, res) => {
    const params = req.body;
    params.id = uuid(null, null, null);

    const result = await RoleService.CreateRole(params);
    if (result.error) {
        return res.status(result?.status || 400).send({data: result.error});
    }

    return res.status(200).send({data: 'Success'});
};

const GetRoleById = async (req, res) => {
    const {id} = req.params;

    const result = await RoleService.GetRole({id});
    if (result.error) {
        return res.status(result?.status || 400).send({data: result.error});
    }

    return res.status(200).send({data: result.data});
};

const UpdateRole = async (req, res) => {
    const params = req.body;
    const {id} = req.params;

    const result = await RoleService.UpdateRole({id}, params);
    if (result.error) {
        return res.status(result?.status || 400).send({data: result.error});
    }

    return res.status(200).send({data: result.data});
};

const DeleteRole = async (req, res) => {
    const ids = req.params.id.split(',');

    const result = await RoleService.DeleteRole({ id: ids });
    if (result.error) {
        return res.status(result?.status || 400).send({data: result.error});
    }

    return res.status(200).send({data: result.data});
};

exports.RoleController = {
    GetRolesByQuery,
    CreateRole,
    GetRoleById,
    UpdateRole,
    DeleteRole
};