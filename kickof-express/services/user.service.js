const {UserModel} = require("../models/user.model");

const GetUsers = async (filter, projection = null, options = null) => {
    const {limit, page, skip, sort, query} = filter;
    const result = await UserModel
        .find(query, projection, options)
        .skip(skip)
        .limit(limit)
        .sort(sort);
    const counts = await UserModel.countDocuments(query);

    return {
        data: result,
        pagination: {
            perPage: limit, current: page, counts, pages: Math.ceil(counts/limit)
        },
        query
    }
};

const GetUser = async (filter, projection = null, options = null) => {
    const result = await UserModel.findOne(filter, projection, options).lean();
    if (result === null) {
        return { error: 'Data Not Found', data: null}
    }

    return {data: result} ;
};

const CreateUser = async (params) => {
    const result = await UserModel.create(params, null);
    if (!result) {
        return {error: 'Failed to proceed data.'};
    }

    return {data: result};
};

const UpdateUser = async (filter, params) => {
    const result = await UserModel.findOneAndUpdate(filter,params, null);
    if (!result) {
        return {error: 'Failed to proceed data.'};
    }

    return {data: result};
};

const DeleteUser = async (filter) => {
    const result = await UserModel.deleteMany(filter, null);
    if (!result) {
        return {error: 'Failed to proceed data.'};
    }

    return {data: result};
};

exports.UserService = {
    GetUsers,
    GetUser,
    CreateUser,
    UpdateUser,
    DeleteUser
};