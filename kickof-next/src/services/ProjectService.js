import Api from "utils/api";

const getProjectsByQuery = (query) => {
    return Api.Instance.get('/project', {params: query})
        .then(res => res.data);
};

const createProject = (params) => {
    return Api.Instance.post('/project', params);
};

const getProjectByCode = (code) => {
    return Api.Instance.get(`/project/code/${code}`)
        .then(res => res.data);
};

const ProjectService = {
    getProjectsByQuery,
    createProject,
    getProjectByCode
};

export default ProjectService;