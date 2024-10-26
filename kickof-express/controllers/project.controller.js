const {GenerateQuery} = require("../utils/helper");
const {ProjectService} = require("../services/project.service");
const {v4: uuid} = require("uuid");
const {GeneratePassword} = require("../utils/jwt");

const GetProjectsByQuery = async (req, res) => {
    const { limit, page, skip, sort } = GenerateQuery(req.query);
    const query = {};

    if (req.query?.keyword) query.name = { '$regex': '.*' + req.query?.keyword + '.*', '$options': '$i' };

    const result = await ProjectService.GetProjects({limit, page, skip, sort, query});

    return res.status(200).send({data: result.data});
};

const CreateProject = async (req, res) => {
    const params = req.body;
    params.id = uuid(null, null, null);
    params.userIds = [req.user.id];

    const result = await ProjectService.CreateProject(params);
    if (result.error) {
        return res.status(result?.status || 400).send({data: result.error});
    }

    return res.status(200).send({data: 'Success'});
};

const GetProjectById = async (req, res) => {
    const {id} = req.params;

    const result = await ProjectService.GetProject({id});
    if (result.error) {
        return res.status(result?.status || 400).send({data: result.error});
    }

    return res.status(200).send({data: result.data});
};

const GetProjectByCode = async (req, res) => {
    const {code} = req.params;

    const result = await ProjectService.GetProject({code});
    if (result.error) {
        return res.status(result?.status || 400).send({data: result.error});
    }

    return res.status(200).send({data: result.data});
};

const UpdateProject = async (req, res) => {
    const params = req.body;
    const {id} = req.params;

    if (params.password) {
        params.password = GeneratePassword(params.password);
    }

    const result = await ProjectService.UpdateProject({id}, params);
    if (result.error) {
        return res.status(result?.status || 400).send({data: result.error});
    }

    return res.status(200).send({data: result.data});
};

const DeleteProject = async (req, res) => {
    const ids = req.params.id.split(',');

    const result = await ProjectService.DeleteProject({ id: ids });
    if (result.error) {
        return res.status(result?.status || 400).send({data: result.error});
    }

    return res.status(200).send({data: result.data});
};

exports.ProjectController = {
    GetProjectsByQuery,
    CreateProject,
    GetProjectById,
    GetProjectByCode,
    UpdateProject,
    DeleteProject
};