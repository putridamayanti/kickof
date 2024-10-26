const {WorkspaceModel} = require("../models/workspace.model");
const {UserModel} = require("../models/user.model");

const GetWorkspaces = async (filter, projection = null, options = null) => {
    const {limit, page, skip, sort, query} = filter;
    const result = await WorkspaceModel
        .find(query, projection, options)
        .skip(skip)
        .limit(limit)
        .sort(sort);
    const counts = await WorkspaceModel.countDocuments(query);

    return {
        error: null,
        data: {
            data: result,
            pagination: {
                perPage: limit, current: page, counts, pages: Math.ceil(counts/limit)
            },
            query
        }
    }
};

const GetWorkspace = async (filter, projection = null, options = null, relations = []) => {
    const data = await WorkspaceModel.findOne(filter, projection, options).lean();

    if (relations.includes('members')) {
        data.users = await UserModel.find({id: { $in: data.userIds }}, {password: 0})
    }

    return data;
};

const CreateWorkspace = async (params) => {
    const result = await WorkspaceModel.create(params, null);
    if (!result) {
        return {error: 'Failed to proceed data.'};
    }

    return {data: result};
};

const UpdateWorkspace = async (filter, params) => {
    const result = await WorkspaceModel.findOneAndUpdate(filter,params, null);
    if (!result) {
        return {error: 'Failed to proceed data.'};
    }

    return {data: result};
};

const DeleteWorkspace = async (filter) => {
    const result = await WorkspaceModel.deleteMany(filter, null);
    if (!result) {
        return {error: 'Failed to proceed data.'};
    }

    return {data: result};
};

exports.WorkspaceService = {
    GetWorkspaces,
    GetWorkspace,
    CreateWorkspace,
    UpdateWorkspace,
    DeleteWorkspace
};