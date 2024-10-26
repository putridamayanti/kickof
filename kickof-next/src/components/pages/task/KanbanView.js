'use client'

import React, {useEffect, useRef, useState} from "react";
import {
    Avatar,
    Button,
    Paper,
    Stack,
    styled,
    Typography
} from "@mui/material";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import Box from "@mui/material/Box";
import {AvatarGroup} from "@mui/lab";
import ColumnForm from "components/pages/task/ColumnForm";
import ColumnService from "services/ColumnService";
import {useSelector} from "store";
import TaskForm from "components/pages/task/TaskForm";
import TaskService from "services/TaskService";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import {EditRounded} from "@mui/icons-material";

const KanbanWrapper = styled(Box)(({ theme }) => ({
    paddingBottom: '0.95rem',
    overflowX: 'scroll',
    display: 'flex',
    gap: 20,
}));

const ColumnWrapper = styled(Box)(({ theme }) => ({
    minWidth: 300,
}));

const ColumnCard = styled(Box)(({ theme }) => ({
    maxHeight: 'calc(100vh - 220px)',
    paddingRight: '0.975rem',
    overflowY: 'auto'
    // minHeight: 500
}));

export default function KanbanView(props) {
    const { columnData, taskLabels, members, refresh } = props;
    const { workspace, project } = useSelector(state => state.app);
    const [columns, setColumns] = useState([]);
    const [newForm, setNewForm] = useState(false);
    const [taskForm, setTaskForm] = useState({open: false, data: null});

    const mounted = useRef(false);
    useEffect(() => {
        if (!mounted.current && columns.length === 0 && columnData?.length > 0) {
            setColumns(columnData);
            mounted.current = true;
        }
    }, [columnData, columns.length]);

    const onDragEnd = async (result) => {
        const { source, destination, draggableId } = result;

        if (!destination) return;

        if (source.droppableId !== destination.droppableId) {
            const destColumn = columns.find(e => e.id === destination.droppableId);
            const destColumnIndex = columns.findIndex(e => e.id === destination.droppableId);
            const sourceColumn = columns.find(e => e.id === source.droppableId);
            const sourceColumnIndex = columns.findIndex(e => e.id === source.droppableId);
            const sourceTask = sourceColumn.tasks[source.index];
            sourceTask.columnId = destination.droppableId;
            destColumn.tasks?.splice(destination.index, 0, sourceTask);
            columns[destColumnIndex] = destColumn;
            sourceColumn.tasks = sourceColumn.tasks?.filter(e => e.id !== sourceTask.id);
            columns[sourceColumnIndex] = sourceColumn;

            const res = await TaskService.updateTask(draggableId, sourceTask);
            if (res.status === 200) {
                refresh();
            }
        }
    };

    const handleSubmitColumn = (values) => {
        values.projectId = project?.id;
        values.workspaceId = workspace?.id;

        return ColumnService.createColumn(values)
            .then((res) => {
                setColumns([...columns, res?.data?.data])
                refresh();
                setNewForm(false);
            });
    };

    const handleSubmitTask = (values) => {
        values.projectId = project?.id;
        values.workspaceId = workspace?.id;
        values.labels = values.labels.map(e => {
            if (e.id) return e
            else {
                return {label: e.inputValue}
            }
        })

        return TaskService.createTask(values)
            .then(() => setNewForm(false));
    };

    return (
        <>
            <Stack direction="row" justifyContent="space-between" alignItems="center" marginBottom={5}>
                <Typography variant="h4" gutterBottom sx={{ flex: 1 }}>
                    Kanban Board
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" onClick={() => setTaskForm({open: true, data: null})}>
                        Add Task
                    </Button>
                    <Button variant="outlined" onClick={() => setNewForm(true)}>
                        Add Column
                    </Button>
                </Stack>
            </Stack>
            <DragDropContext onDragEnd={onDragEnd}>
                <KanbanWrapper>
                    {columns?.map((column, i) => (
                        <ColumnWrapper key={i}>
                            <Typography variant="h6" gutterBottom>
                                {column.name}
                            </Typography>
                            <Divider sx={{ my: 4 }}/>
                            <ColumnCard>
                                <Droppable droppableId={column.id}>
                                    {(provided) => (
                                        <div {...provided.droppableProps} ref={provided.innerRef} style={{ minHeight: '100px' }}>
                                            {column?.tasks?.map((task, index) => (
                                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                                    {(provided) => (
                                                        <Paper
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            elevation={0}
                                                            sx={{ p: 2, mb: 2 }}
                                                            onClick={() => setTaskForm({open: true, data: task})}
                                                        >
                                                            <Typography>{task.title}</Typography>
                                                            {/*<AvatarGroup*/}
                                                            {/*    max={4}*/}
                                                            {/*    sx={{*/}
                                                            {/*        '& :first-child.MuiAvatar-root': {*/}
                                                            {/*            width: 20,*/}
                                                            {/*            height: 20,*/}
                                                            {/*            fontSize: 11,*/}
                                                            {/*            backgroundColor: 'secondary.main',*/}
                                                            {/*            color: 'secondary.contrastText'*/}
                                                            {/*        }*/}
                                                            {/*    }}>*/}
                                                            {/*    <AssigneeAvatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>*/}
                                                            {/*    <AssigneeAvatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />*/}
                                                            {/*    <AssigneeAvatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />*/}
                                                            {/*    <AssigneeAvatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />*/}
                                                            {/*    <AssigneeAvatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />*/}
                                                            {/*</AvatarGroup>*/}
                                                        </Paper>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </ColumnCard>
                        </ColumnWrapper>
                    ))}
                </KanbanWrapper>
            </DragDropContext>

            <ColumnForm
                open={newForm}
                onClose={() => setNewForm(false)}
                onSubmit={handleSubmitColumn}/>

            <TaskForm
                data={taskForm.data}
                columns={columnData}
                taskLabels={taskLabels}
                members={members}
                open={taskForm.open}
                onClose={() => setTaskForm({open: false, data: null})}
                onSubmit={handleSubmitTask}/>
        </>
    );
}