const {GenerateQuery} = require("../utils/helper");
const {WorkspaceService} = require("../services/workspace.service");
const {v4: uuid} = require("uuid");
const {GeneratePassword} = require("../utils/jwt");

const GetWorkspacesByQuery = async (req, res) => {
    const { limit, page, skip, sort } = GenerateQuery(req.query);
    const query = {};

    if (req.query?.keyword) query.name = { '$regex': '.*' + req.query?.keyword + '.*', '$options': '$i' };

    const result = await WorkspaceService.GetWorkspaces({limit, page, skip, sort, query});

    return res.status(200).send({...result.data});
};

const CreateWorkspace = async (req, res) => {
    const params = req.body;
    params.id = uuid(null, null, null);

    const result = await WorkspaceService.CreateWorkspace(params);
    if (result.error) {
        return res.status(result?.status || 400).send({data: result.error});
    }

    return res.status(200).send({data: 'Success'});
};

const GetWorkspaceById = async (req, res) => {
    const {id} = req.params;

    const result = await WorkspaceService.GetWorkspace({id});
    if (result.error) {
        return res.status(result?.status || 400).send({data: result.error});
    }

    return res.status(200).send({data: result.data});
};

const UpdateWorkspace = async (req, res) => {
    const params = req.body;
    const {id} = req.params;

    if (params.password) {
        params.password = GeneratePassword(params.password);
    }

    const result = await WorkspaceService.UpdateWorkspace({id}, params);
    if (result.error) {
        return res.status(result?.status || 400).send({data: result.error});
    }

    return res.status(200).send({data: result.data});
};

const DeleteWorkspace = async (req, res) => {
    const ids = req.params.id.split(',');

    const result = await WorkspaceService.DeleteWorkspace({ id: ids });
    if (result.error) {
        return res.status(result?.status || 400).send({data: result.error});
    }

    return res.status(200).send({data: result.data});
};

const GetWorkspaceMembers = async (req, res) => {
    const id = req.params.id;

    const result = await WorkspaceService.GetWorkspace({id: id}, null, null, ['members']);

    return res.status(200).send({data: result.users});
};

const InviteMemberToWorkspace = async (req, res) => {
    const params = req.body;

    const workspace = await WorkspaceService.GetWorkspace({id: params.workspaceId});
    if (!workspace) {
        return res.status(404).send({data: 'Workspace not found'});
    }
};

const JoinWorkspaceFromInvitation = async (req, res) => {

};

exports.WorkspaceController = {
    GetWorkspacesByQuery,
    CreateWorkspace,
    GetWorkspaceById,
    UpdateWorkspace,
    DeleteWorkspace,
    GetWorkspaceMembers,
    InviteMemberToWorkspace
};