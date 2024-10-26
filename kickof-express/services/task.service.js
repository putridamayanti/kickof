const {TaskModel} = require("../models/task.model");
const {ProjectService} = require("./project.service");
const {WorkspaceService} = require("./workspace.service");
const {UserService} = require("./user.service");
const {ProjectModel} = require("../models/project.model");
const {WorkspaceModel} = require("../models/workspace.model");
const {UserModel} = require("../models/user.model");
const {TaskLabelModel} = require("../models/tasklabel.model");

const GetTasks = async (filter, projection = null, options = null, relations = []) => {
    const {limit, page, skip, sort, query} = filter;
    const result = await TaskModel
        .find(query, projection, options)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .lean();
    const counts = await TaskModel.countDocuments(query);

    const resultData = [];
    for (const item of result) {
        if (relations.includes('project')) {
            item.project = await ProjectModel.findOne({id: item.projectId}, null, null).lean();
        }

        if (relations.includes('workspace')) {
            item.workspace = await WorkspaceModel.findOne({id: item.workspaceId}, null, null).lean();
        }

        if (relations.includes('assignees')) {
            item.assignees = await UserModel.find({id: { $in: item.assignees }}, null, null).lean();
        }

        if (relations.includes('labels')) {
            item.labels = await TaskLabelModel.find({id: {$in: item.labelIds}}, null, null).lean();
        }

        resultData.push(item);
    }

    return {
        data: resultData,
        pagination: {
            perPage: limit, current: page, counts, pages: Math.ceil(counts/limit)
        },
        query
    }
};

const GetTask = async (filter, projection = null, options = null, relations = []) => {
    const task = TaskModel.findOne(filter, projection, options).lean();

    if (relations.includes('project')) {
        task.project = await ProjectService.GetProject({id: task.projectId});
    }

    if (relations.includes('workspace')) {
        task.workspace = await WorkspaceService.GetWorkspace({id: task.workspaceId});
    }

    if (relations.includes('assignees')) {
        task.assignees = await UserService.GetUsers({id: { $in: task.assignees }})
    }

    return task;
};

const CreateTask = async (params) => {
    const result = await TaskModel.create(params, null);
    if (!result) {
        return {error: 'Failed to proceed data.'};
    }

    return {data: result};
};

const UpdateTask = async (filter, params) => {
    return TaskModel.findOneAndUpdate(filter,params, null);
};

const DeleteTask = async (filter) => {
    const result = await TaskModel.deleteMany(filter, null);
    if (!result) {
        return {error: 'Failed to proceed data.'};
    }

    return {data: result};
};

exports.TaskService = {
    GetTasks,
    GetTask,
    CreateTask,
    UpdateTask,
    DeleteTask
};