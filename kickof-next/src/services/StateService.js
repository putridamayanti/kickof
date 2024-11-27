import Api from "utils/api";

const getStatesByQuery = (query) => {
    return Api.Instance.get('/state', {params: query})
        .then(res => res.data);
};

const createState = (params) => {
    return Api.Instance.post('/state', params);
};

const StateService = {
    getStatesByQuery,
    createState
};

export default StateService;