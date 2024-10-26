import Api from "utils/api";

const getTasksByQuery = (query) => {
    return Api.Instance.get('/task', {params: query})
        .then(res => res.data?.data);
};

const createTask = (params) => {
    return Api.Instance.post('/task', params);
};

const updateTask = (id, params) => {
    return Api.Instance.patch(`/task/${id}`, params);
}

const updateColumnTask = async (taskId, columnId) => {
    const data = await Api.Instance.get(`/task/${taskId}`).then(res => res.data);
    if (data.id) {
        data.columnId = columnId;
    }
};

const TaskService = {
    getTasksByQuery,
    createTask,
    updateTask
};

export default TaskService;