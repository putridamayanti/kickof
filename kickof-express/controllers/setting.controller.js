const {SettingService} = require("../services/setting.service");
const {v4: uuid} = require("uuid");
const {GenerateQuery} = require("../utils/helper");

const GetSettingsByQuery = async (req, res) => {
    const { limit, page, skip, sort } = GenerateQuery(req.query);
    const query = {};

    if (req.query?.keyword) query.name = { '$regex': '.*' + req.query?.keyword + '.*', '$options': '$i' };

    const result = await SettingService.GetSettings({limit, page, skip, sort, query});

    return res.status(200).send({data: result.data});
};

const CreateSetting = async (req, res) => {
    const params = req.body;
    params.id = uuid(null, null, null);

    const result = await SettingService.CreateSetting(params);
    if (result.error) {
        return res.status(result?.status || 400).send({data: result.error});
    }

    return res.status(200).send({data: 'Success'});
};

const GetSettingById = async (req, res) => {
    const {id} = req.params;

    const result = await SettingService.GetSetting({id});
    if (result.error) {
        return res.status(result?.status || 400).send({data: result.error});
    }

    return res.status(200).send({data: result.data});
};

const UpdateSetting = async (req, res) => {
    const params = req.body;
    const {id} = req.params;

    const result = await SettingService.UpdateSetting({id}, params);
    if (result.error) {
        return res.status(result?.status || 400).send({data: result.error});
    }

    return res.status(200).send({data: result.data});
};

const DeleteSetting = async (req, res) => {
    const ids = req.params.id.split(',');

    const result = await SettingService.DeleteSetting({ id: ids });
    if (result.error) {
        return res.status(result?.status || 400).send({data: result.error});
    }

    return res.status(200).send({data: result.data});
};

exports.SettingController = {
    GetSettingsByQuery,
    CreateSetting,
    GetSettingById,
    UpdateSetting,
    DeleteSetting
};