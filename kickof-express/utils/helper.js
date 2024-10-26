'use strict';

const multer = require('multer');
const fs = require('fs');
const path = require('path');

exports.GenerateRandom = (length) => {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

exports.GenerateQuery = query => {
    const { sort, page, limit } = query;
    const queries = {
        page: page ? parseInt(page) : 1,
        sort: { name: -1 },
        limit: 0,
        skip: 0
    };

    if (limit) queries.limit = limit;

    if (page && page > 1 && limit) queries.skip = limit;

    if (sort) {
        const field = sort.split(",");

        queries.sort = {
            [field[0]]: parseInt(field[1])
        };
    }

    return queries;
}

exports.InvoiceGenerator = () => {
    let invoice = 'P-';
    invoice += new Date().getTime();
    invoice += Math.floor(Math.random() * 1000);

    return invoice;
};

exports.UploadMiddleware = () => {
    const FILE_PATH = 'uploads/';

    if (!fs.existsSync(FILE_PATH)) {
        fs.mkdirSync(FILE_PATH);
    }

    const storage = multer.diskStorage({
        destination: (req, file, cb) => cb(null, FILE_PATH),
        filename: (req, file, cb) => {
            cb(null, `${Math.floor(Math.random() * 10000)}-${GenerateRandom(10)}.${path.extname(file.originalname)}`);
        },
    });

    return multer({
        storage: storage
    }).single('file');
};

exports.GetFileUrl = (req, filename) => {
    const port = process.env.PORT || 5000;

    return `${req.protocol}://${req.host}:${port}/uploads/${filename}`
};

exports.DeleteLocalFile = (filename) => {
    fs.unlink(`/uploads/${filename}`);
};

exports.GenerateSlug = name => {
    let slug = name.toLowerCase();
    slug = slug.replace(/\s/g, '-');

    return `${slug}-${Math.floor(Math.random() * 1000)}`
};