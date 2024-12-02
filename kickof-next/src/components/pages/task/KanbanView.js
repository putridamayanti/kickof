'use client'

import React, {useEffect, useRef, useState} from "react";
import {
    Avatar,
    Button, Card,
    Stack,
    styled,
    Typography, useTheme
} from "@mui/material";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import Box from "@mui/material/Box";
import {AvatarGroup} from "@mui/lab";
import ColumnForm from "components/pages/task/ColumnForm";
import StateService from "services/StateService";
import {useSelector} from "store";
import TaskForm from "components/pages/task/TaskForm";
import TaskService from "services/TaskService";
import Divider from "@mui/material/Divider";
import CustomChip from "components/chip/CustomChip";
import TaskCard from "components/pages/task/TaskCard";

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
    overflowY: 'auto'
    // minHeight: 500
}));

export default function KanbanView(props) {
    const { states, taskLabels, members, refresh } = props;
    const theme = useTheme();
    const { workspace, project } = useSelector(state => state.app);
    const [columns, setColumns] = useState([]);
    const [newForm, setNewForm] = useState(false);
    const [taskForm, setTaskForm] = useState({open: false, data: null});

    const mounted = useRef(false);
    useEffect(() => {
        if (!mounted.current && columns?.length === 0 && states?.length > 0) {
            setColumns(states);
            mounted.current = true;
        }
    }, [states, columns?.length]);

    const onDragEnd = async (result) => {
        const { source, destination, draggableId } = result;

        if (!destination) return;

        if (source.droppableId !== destination.droppableId) {
            const destColumn = columns.find(e => e.id === destination.droppableId);
            const destColumnIndex = columns.findIndex(e => e.id === destination.droppableId);
            const sourceColumn = columns.find(e => e.id === source.droppableId);
            const sourceColumnIndex = columns.findIndex(e => e.id === source.droppableId);
            const sourceTask = sourceColumn.tasks[source.index];
            sourceTask.stateId = destination.droppableId;
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

    const addNewTask = (task) => {
        const stateIndex = columns.findIndex(e => e.id === task?.stateId);
        columns[stateIndex].tasks = [task, ...columns[stateIndex].tasks];
    };

    const updateTaskList = (task) => {
        const currentTaskState = columns.find(e => e.tasks.find(item => item.id === task.id))
        const currentTaskStateIndex = columns.findIndex(e => e.tasks.find(item => item.id === task.id))
        const stateIndex = columns.findIndex(e => e.id === task?.stateId);

        if (currentTaskStateIndex === stateIndex) {
            const taskIndex = columns[stateIndex].tasks?.findIndex(e => e.id === task.id);
            columns[stateIndex].tasks[taskIndex] = {...task};
        }
        if (currentTaskState?.id !== task.stateId) {
            columns[stateIndex].tasks = [task, ...columns[stateIndex].tasks];
            columns[currentTaskStateIndex].tasks = columns[currentTaskStateIndex].tasks?.filter(e => e.id !== task.id);
        }
    };

    const handleSubmitColumn = (values) => {
        values.projectId = project?.id;
        values.workspaceId = workspace?.id;

        return StateService.createState(values)
            .then((res) => {
                setColumns([...columns, res?.data?.data])
                refresh();
                setNewForm(false);
            });
    };

    const submit = (values) => {
        if (values?.id) {
            return TaskService.updateTask(values?.id, values);
        }

        return TaskService.createTask(values);
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
        values.assignees = values.assignees.map(e => {
            if (e.id) return e
            else { return {label: e.inputValue} }
        })

        return submit(values).then((res) => {
            if (values?.id) {
                updateTaskList(values);
            } else {
                addNewTask(res?.data?.data);
            }
            setTaskForm({open: false, data: null});
            refresh();
        });
    };

    return (
        <>
            <Stack direction="row" justifyContent="space-between" alignItems="center" marginBottom={5}>
                <Typography variant="h4" gutterBottom sx={{ flex: 1 }}>
                    All Tasks
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" onClick={() => setTaskForm({open: true, data: null})}>
                        Add Task
                    </Button>
                    <Button variant="outlined" onClick={() => setNewForm(true)}>
                        Add State
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
                                                        <Box
                                                            sx={{ maxWidth: '100%' }}
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}>
                                                            <TaskCard
                                                                elevation={0}
                                                                sx={{ p: 2, mb: 2, border: `1px solid ${theme.palette.grey.A200}` }}
                                                                task={task}
                                                                onClick={() => setTaskForm({open: true, data: task})}
                                                            />
                                                        </Box>
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
                states={states}
                taskLabels={taskLabels}
                members={members}
                open={taskForm.open}
                onRefresh={refresh}
                onClose={() => setTaskForm({open: false, data: null})}
                onSubmit={handleSubmitTask}/>
        </>
    );
}