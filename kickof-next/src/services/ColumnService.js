import Api from "utils/api";

const getColumnsByQuery = (query) => {
    return Api.Instance.get('/column', {params: query})
        .then(res => res.data);
};

const createColumn = (params) => {
    return Api.Instance.post('/column', params);
};

const ColumnService = {
    getColumnsByQuery,
    createColumn
};

export default ColumnService;