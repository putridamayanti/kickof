import Api from "utils/api";
const getTaskLabelsByQuery = (query) => {
    return Api.Instance.get('/task-label', {params: query})
        .then(res => res.data);
};

const createTaskLabel = (params) => {
    return Api.Instance.post('/task-label', params);
};

const TaskService = {
    getTaskLabelsByQuery,
    createTaskLabel
};

export default TaskService;