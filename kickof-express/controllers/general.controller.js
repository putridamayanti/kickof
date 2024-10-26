const cloudinary = require('cloudinary').v2;
const {GetFileUrl, DeleteLocalFile} = require("../utils/helper");
const {SettingService} = require("../services/setting.service");

const Upload = async (req, res) => {
    const storage = await SettingService.GetSetting({code: 'storage'});
    if (!storage && storage?.data?.setting?.current === 'cloudinary') {
        const storageSetting = storage?.data?.setting;
        cloudinary.config({
            cloud_name: storageSetting?.cloudinaryCloudName,
            api_key: storageSetting?.cloudinaryApiKey,
            api_secret: storageSetting?.cloudinaryApiSecret,
            secure: true
        });
        const result = await cloudinary.uploader.upload(req.file.path , {
            folder: process.env.APP_NAME,
            resource_type: 'auto',
            use_filename: true
        });

        if (result.secure_url) {
            DeleteLocalFile(req.file.path);
        }
    }

    return res.status(200).send({ data: GetFileUrl(req, req.file.filename)});
}

const GetFile = async (req, res) => {
    const { filename } = req.params;

    return res.status(200).send({
        data: GetFileUrl(req, filename)
    })
};

const DeleteFile = async (req, res) => {
    if (req.query?.filename) {
        DeleteLocalFile(req?.query?.filename);
    }

    return res.status(200).send({ data: 'Success' });
}

exports.GeneralController = {
    Upload,
    GetFile,
    DeleteFile
};