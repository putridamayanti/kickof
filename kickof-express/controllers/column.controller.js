const {GenerateQuery} = require("../utils/helper");
const {ColumnService} = require("../services/column.service");
const {v4: uuid} = require("uuid");
const {GeneratePassword} = require("../utils/jwt");
const {ProjectService} = require("../services/project.service");
const {TaskService} = require("../services/task.service");

const GetColumnsByQuery = async (req, res) => {
    const { limit, page, skip, sort } = GenerateQuery(req.query);
    const query = {};

    if (req.query?.keyword) query.name = { '$regex': '.*' + req.query?.keyword + '.*', '$options': '$i' };
    if (req.query?.project) {
        const project = await ProjectService.GetProject({code: req.query?.project});
        req.query.projectId = project.id;
    }

    const result = await ColumnService.GetColumns({limit, page, skip, sort, query});

    const resultData = [];
    for (const item of result?.data) {
        const taskData = await TaskService.GetTasks(
            {query: {columnId: item.id}},
            null,
            null,
            ['workspace', 'project', 'assignees', 'labels']
        )

        item.tasks = taskData.data;
        resultData.push(item)
    }

    return res.status(200).send({data: resultData});
};

const CreateColumn = async (req, res) => {
    const params = req.body;
    params.id = uuid(null, null, null);

    const result = await ColumnService.CreateColumn(params);
    if (!result) {
        return res.status(400).send({data: 'Something wrong!'});
    }

    return res.status(200).send({data: params});
};

const GetColumnById = async (req, res) => {
    const {id} = req.params;

    const result = await ColumnService.GetColumn({id});
    if (result.error) {
        return res.status(result?.status || 400).send({data: result.error});
    }

    return res.status(200).send({data: result.data});
};

const UpdateColumn = async (req, res) => {
    const params = req.body;
    const {id} = req.params;

    if (params.password) {
        params.password = GeneratePassword(params.password);
    }

    const result = await ColumnService.UpdateColumn({id}, params);
    if (result.error) {
        return res.status(result?.status || 400).send({data: result.error});
    }

    return res.status(200).send({data: result.data});
};

const DeleteColumn = async (req, res) => {
    const ids = req.params.id.split(',');

    const result = await ColumnService.DeleteColumn({ id: ids });
    if (result.error) {
        return res.status(result?.status || 400).send({data: result.error});
    }

    return res.status(200).send({data: result.data});
};

exports.ColumnController = {
    GetColumnsByQuery,
    CreateColumn,
    GetColumnById,
    UpdateColumn,
    DeleteColumn
};