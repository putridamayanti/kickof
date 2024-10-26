const {RoleModel} = require("../models/role.model");

const GetRoles = async (filter, projection = null, options = null) => {
    const {limit, page, skip, sort, query} = filter;
    const result = await RoleModel
        .find(query, projection, options)
        .skip(skip)
        .limit(limit)
        .sort(sort);
    const counts = await RoleModel.countDocuments(query);

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

const GetRole = async (filter, projection = null, options = null) => {
    const result = await RoleModel.findOne(filter, projection, options).lean();
    if (result === null) {
        return { error: 'Data Not Found', data: null}
    }

    return {data: result} ;
};

const CreateRole = async (params) => {
    const result = await RoleModel.create(params, null);
    if (!result) {
        return {error: 'Failed to proceed data.'};
    }

    return {data: result};
};

const UpdateRole = async (filter, params) => {
    const result = await RoleModel.findOneAndUpdate(filter,params, null);
    if (!result) {
        return {error: 'Failed to proceed data.'};
    }

    return {data: result};
};

const DeleteRole = async (filter) => {
    const result = await RoleModel.deleteMany(filter, null);
    if (!result) {
        return {error: 'Failed to proceed data.'};
    }

    return {data: result};
};

exports.RoleService = {
    GetRoles,
    GetRole,
    CreateRole,
    UpdateRole,
    DeleteRole
};