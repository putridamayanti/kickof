import Api from "utils/api";

const getWorkspacesByQuery = (query) => {
    return Api.Instance.get('/workspace');
};

const createWorkspace = (params) => {
    return Api.Instance.post('/workspace', params);
};

const getWorkspaceMember = (id) => {
    return Api.Instance.get(`/workspace/members/${id}`).then(res => res.data);
};

const WorkspaceService = {
    getWorkspacesByQuery,
    createWorkspace,
    getWorkspaceMember
};

export default WorkspaceService;