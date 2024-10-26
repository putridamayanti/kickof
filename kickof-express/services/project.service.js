const {ProjectModel} = require("../models/project.model");

const GetProjects = async (filter, projection = null, options = null) => {
    const {limit, page, skip, sort, query} = filter;
    const result = await ProjectModel
        .find(query, projection, options)
        .skip(skip)
        .limit(limit)
        .sort(sort);
    const counts = await ProjectModel.countDocuments(query);

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

const GetProject = async (filter, projection = null, options = null) => {
    return ProjectModel.findOne(filter, projection, options).lean();
};

const CreateProject = async (params) => {
    const result = await ProjectModel.create(params, null);
    if (!result) {
        return {error: 'Failed to proceed data.'};
    }

    return {data: result};
};

const UpdateProject = async (filter, params) => {
    const result = await ProjectModel.findOneAndUpdate(filter,params, null);
    if (!result) {
        return {error: 'Failed to proceed data.'};
    }

    return {data: result};
};

const DeleteProject = async (filter) => {
    const result = await ProjectModel.deleteMany(filter, null);
    if (!result) {
        return {error: 'Failed to proceed data.'};
    }

    return {data: result};
};

exports.ProjectService = {
    GetProjects,
    GetProject,
    CreateProject,
    UpdateProject,
    DeleteProject
};