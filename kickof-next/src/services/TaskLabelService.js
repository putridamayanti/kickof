import Api from "utils/api";
const getTaskLabelsByQuery = (query) => {
    return Api.Instance.get('/task-label', {params: query})
        .then(res => res.data?.data);
};

const createTaskLabel = (params) => {
    return Api.Instance.post('/task-label', params);
};

const updateTaskLabel = (id, params) => {
    return Api.Instance.patch(`/task-label/${id}`, params);
};

const TaskService = {
    getTaskLabelsByQuery,
    createTaskLabel,
    updateTaskLabel
};

export default TaskService;