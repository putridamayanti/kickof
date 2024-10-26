const {SettingModel} = require("../models/setting.model");

const GetSettings = async (filter, projection = null, options = null) => {
    const {limit, page, skip, sort, query} = filter;
    const result = await SettingModel
        .find(query, projection, options)
        .skip(skip)
        .limit(limit)
        .sort(sort);
    const counts = await SettingModel.countDocuments(query);

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

const GetSetting = async (filter, projection = null, options = null) => {
    const result = await SettingModel.findOne(filter, projection, options).lean();
    if (result === null) {
        return { error: 'Data Not Found', data: null}
    }

    return {data: result} ;
};

const CreateSetting = async (params) => {
    const result = await SettingModel.create(params, null);
    if (!result) {
        return {error: 'Failed to proceed data.'};
    }

    return {data: result};
};

const UpdateSetting = async (filter, params) => {
    const result = await SettingModel.findOneAndUpdate(filter,params, null);
    if (!result) {
        return {error: 'Failed to proceed data.'};
    }

    return {data: result};
};

const DeleteSetting = async (filter) => {
    const result = await SettingModel.deleteMany(filter, null);
    if (!result) {
        return {error: 'Failed to proceed data.'};
    }

    return {data: result};
};

exports.SettingService = {
    GetSettings,
    GetSetting,
    CreateSetting,
    UpdateSetting,
    DeleteSetting
};