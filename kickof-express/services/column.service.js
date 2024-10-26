const {ColumnModel} = require("../models/column.model");
const {TaskService} = require("./task.service");

const GetColumns = async (filter, projection = null, options = null) => {
    const {limit, page, skip, sort, query} = filter;
    const result = await ColumnModel
        .find(query, projection, options)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .lean();
    const counts = await ColumnModel.countDocuments(query);

    return {
        data: result,
        pagination: {
            perPage: limit, current: page, counts, pages: Math.ceil(counts/limit)
        },
        query
    }
};

const GetColumn = async (filter, projection = null, options = null) => {
    return ColumnModel.findOne(filter, projection, options).lean() ;
};

const CreateColumn = async (params) => {
    return ColumnModel.create(params, null);
};

const UpdateColumn = async (filter, params) => {
    return ColumnModel.findOneAndUpdate(filter,params, null);
};

const DeleteColumn = async (filter) => {
    return ColumnModel.deleteMany(filter, null);
};

const GetTasksOfColumn = async (taskIds) => {
    const tasks = [];
    for (const taskId of taskIds) {
        const task = await TaskService.GetTask({id: taskId});
        tasks.push(task);
    }

    return tasks;
}

exports.ColumnService = {
    GetColumns,
    GetColumn,
    CreateColumn,
    UpdateColumn,
    DeleteColumn,
    GetTasksOfColumn
};