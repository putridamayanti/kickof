const express = require('express');
const {UserController} = require("../controllers/user.controller");
const {RoleController} = require("../controllers/role.controller");
const {SettingController} = require("../controllers/setting.controller");
const {WorkspaceController} = require("../controllers/workspace.controller");
const {TaskController} = require("../controllers/task.controller");
const {ProjectController} = require("../controllers/project.controller");
const {ColumnController} = require("../controllers/column.controller");
const {TaskLabelController} = require("../controllers/tasklabel.controller");
const router = express.Router();

module.exports = app => {
    router.get('/column', ColumnController.GetColumnsByQuery);
    router.get('/column/:id', ColumnController.GetColumnById)
    router.post('/column', ColumnController.CreateColumn);
    router.patch('/column/:id', ColumnController.UpdateColumn);
    router.delete('/column/:id', ColumnController.DeleteColumn);

    router.get('/project', ProjectController.GetProjectsByQuery);
    router.get('/project/:id', ProjectController.GetProjectById);
    router.get('/project/code/:code', ProjectController.GetProjectByCode);
    router.post('/project', ProjectController.CreateProject);
    router.patch('/project/:id', ProjectController.UpdateProject);
    router.delete('/project/:id', ProjectController.DeleteProject);

    router.get('/task', TaskController.GetTasksByQuery);
    router.get('/task/:id', TaskController.GetTaskById)
    router.post('/task', TaskController.CreateTask);
    router.patch('/task/:id', TaskController.UpdateTask);
    router.delete('/task/:id', TaskController.DeleteTask);

    router.get('/task-label', TaskLabelController.GetTaskLabelsByQuery);
    router.get('/task-label/:id', TaskLabelController.GetTaskLabelById)
    router.post('/task-label', TaskLabelController.CreateTaskLabel);
    router.patch('/task-label/:id', TaskLabelController.UpdateTaskLabel);
    router.delete('/task-label/:id', TaskLabelController.DeleteTaskLabel);
    
    router.get('/role', RoleController.GetRolesByQuery);
    router.get('/role/:id', RoleController.GetRoleById)
    router.post('/role', RoleController.CreateRole);
    router.patch('/role/:id', RoleController.UpdateRole);
    router.delete('/role/:id', RoleController.DeleteRole);

    router.get('/setting', SettingController.GetSettingsByQuery);
    router.get('/setting/:id', SettingController.GetSettingById)
    router.post('/setting', SettingController.CreateSetting);
    router.patch('/setting/:id', SettingController.UpdateSetting);
    router.delete('/setting/:id', SettingController.DeleteSetting);
    
    router.get('/user', UserController.GetUsersByQuery);
    router.get('/user/:id', UserController.GetUserById)
    router.post('/user', UserController.CreateUser);
    router.patch('/user/:id', UserController.UpdateUser);
    router.delete('/user/:id', UserController.DeleteUser);

    router.get('/workspace', WorkspaceController.GetWorkspacesByQuery);
    router.get('/workspace/:id', WorkspaceController.GetWorkspaceById)
    router.post('/workspace', WorkspaceController.CreateWorkspace);
    router.patch('/workspace/:id', WorkspaceController.UpdateWorkspace);
    router.delete('/workspace/:id', WorkspaceController.DeleteWorkspace);
    router.get('/workspace/members/:id', WorkspaceController.GetWorkspaceMembers);
    router.post('/workspace/invite', WorkspaceController.InviteMemberToWorkspace);

    app.use('/api', router);
};