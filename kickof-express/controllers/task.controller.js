const {GenerateQuery} = require("../utils/helper");
const {TaskService} = require("../services/task.service");
const {v4: uuid} = require("uuid");
const {ProjectService} = require("../services/project.service");
const {TaskLabelService} = require("../services/tasklabel.service");
const {ColumnService} = require("../services/column.service");
const {WorkspaceService} = require("../services/workspace.service");

const GetTasksByQuery = async (req, res) => {
    const userId = req.user?.id;
    const { limit, page, skip, sort } = GenerateQuery(req.query);
    const query = {};

    if (req.query?.keyword) query.title = { '$regex': '.*' + req.query?.keyword + '.*', '$options': '$i' };
    if (req.query?.project) {
        const project = await ProjectService.GetProject({code: req.query?.project});
        query.projectId = project.id;
    }
    if (req.query?.workspace) {
        const workspace = await WorkspaceService.GetWorkspace({code: req.query?.workspace});
        query.workspaceId = workspace.id;
    }
    if (req.query?.assigned) {
        query.assignees = { '$in': userId }
    }

    const result = await TaskService.GetTasks({limit, page, skip, sort, query}, null, null, ['labels']);

    return res.status(200).send({data: result});
};

const CreateTask = async (req, res) => {
    const params = req.body;
    params.id = uuid(null, null, null);

    const labelIds = [];
    for (const e of params.labels) {
        if (!e.id) {
            const id = uuid(null, null, null);
            await TaskLabelService.CreateTaskLabel({
                id: id,
                workspaceId: params.workspaceId,
                projectId: params.projectId,
                label: e.label,
                color: ''
            });
            labelIds.push(id);
        } else {
            labelIds.push(e.id);
        }
    }
    params.labels = labelIds;

    const result = await TaskService.CreateTask(params);
    if (result.error) {
        return res.status(result?.status || 400).send({data: result.error});
    }

    const column = await ColumnService.GetColumn({id: params?.columnId});
    column.taskIds = [...column.taskIds, params.id];
    await ColumnService.UpdateColumn({id: column.id}, column)

    return res.status(200).send({data: 'Success'});
};

const GetTaskById = async (req, res) => {
    const {id} = req.params;

    const result = await TaskService.GetTask({id});
    if (result.error) {
        return res.status(result?.status || 400).send({data: result.error});
    }

    return res.status(200).send({data: result.data});
};

const UpdateTask = async (req, res) => {
    const params = req.body;
    const {id} = req.params;

    const result = await TaskService.UpdateTask({id}, params);

    return res.status(200).send({data: result});
};

const DeleteTask = async (req, res) => {
    const ids = req.params.id.split(',');

    const result = await TaskService.DeleteTask({ id: ids });
    if (result.error) {
        return res.status(result?.status || 400).send({data: result.error});
    }

    return res.status(200).send({data: result.data});
};

exports.TaskController = {
    GetTasksByQuery,
    CreateTask,
    GetTaskById,
    UpdateTask,
    DeleteTask
};