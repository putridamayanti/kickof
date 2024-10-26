const {GenerateQuery} = require("../utils/helper");
const {TaskLabelService} = require("../services/tasklabel.service");
const {v4: uuid} = require("uuid");
const {GeneratePassword} = require("../utils/jwt");
const {ProjectService} = require("../services/project.service");
const {TaskService} = require("../services/task.service");

const GetTaskLabelsByQuery = async (req, res) => {
    const { limit, page, skip, sort } = GenerateQuery(req.query);
    const query = {};

    if (req.query?.keyword) query.label = { '$regex': '.*' + req.query?.keyword + '.*', '$options': '$i' };
    if (req.query?.project) {
        const project = await ProjectService.GetProject({code: req.query?.project});
        req.query.projectId = project.id;
    }

    const result = await TaskLabelService.GetTaskLabels({limit, page, skip, sort, query});

    return res.status(200).send({data: result});
};

const CreateTaskLabel = async (req, res) => {
    const params = req.body;
    params.id = uuid(null, null, null);

    const result = await TaskLabelService.CreateTaskLabel(params);
    if (!result) {
        return res.status(400).send({data: 'Something wrong!'});
    }

    return res.status(200).send({data: 'Success'});
};

const GetTaskLabelById = async (req, res) => {
    const {id} = req.params;

    const result = await TaskLabelService.GetTaskLabel({id});
    if (result.error) {
        return res.status(result?.status || 400).send({data: result.error});
    }

    return res.status(200).send({data: result.data});
};

const UpdateTaskLabel = async (req, res) => {
    const params = req.body;
    const {id} = req.params;

    if (params.password) {
        params.password = GeneratePassword(params.password);
    }

    const result = await TaskLabelService.UpdateTaskLabel({id}, params);
    if (result.error) {
        return res.status(result?.status || 400).send({data: result.error});
    }

    return res.status(200).send({data: result.data});
};

const DeleteTaskLabel = async (req, res) => {
    const ids = req.params.id.split(',');

    const result = await TaskLabelService.DeleteTaskLabel({ id: ids });
    if (result.error) {
        return res.status(result?.status || 400).send({data: result.error});
    }

    return res.status(200).send({data: result.data});
};

exports.TaskLabelController = {
    GetTaskLabelsByQuery,
    CreateTaskLabel,
    GetTaskLabelById,
    UpdateTaskLabel,
    DeleteTaskLabel
};