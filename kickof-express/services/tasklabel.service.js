const {TaskLabelModel} = require("../models/tasklabel.model");

const GetTaskLabels = async (filter, projection = null, options = null) => {
    const {limit, page, skip, sort, query} = filter;
    const result = await TaskLabelModel
        .find(query, projection, options)
        .skip(skip)
        .limit(limit)
        .sort(sort);
    const counts = await TaskLabelModel.countDocuments(query);

    return {
        data: result,
        pagination: {
            perPage: limit, current: page, counts, pages: Math.ceil(counts/limit)
        },
        query
    }
};

const GetTaskLabel = async (filter, projection = null, options = null) => {
    return TaskLabelModel.findOne(filter, projection, options).lean();
};

const CreateTaskLabel = async (params) => {
    return TaskLabelModel.create(params, null);
};

const UpdateTaskLabel = async (filter, params) => {
    return TaskLabelModel.findOneAndUpdate(filter,params, null);
};

const DeleteTaskLabel = async (filter) => {
    return TaskLabelModel.deleteMany(filter, null);
};

exports.TaskLabelService = {
    GetTaskLabels,
    GetTaskLabel,
    CreateTaskLabel,
    UpdateTaskLabel,
    DeleteTaskLabel
};