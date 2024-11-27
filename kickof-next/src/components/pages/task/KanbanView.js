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
        if (!mounted.current && columns.length === 0 && states?.length > 0) {
            setColumns(states);
            mounted.current = true;
        }
    }, [states, columns.length]);

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
            console.log(res)
            setNewForm(false);
            refresh();
        });
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
                                                        <Card
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            elevation={0}
                                                            sx={{ p: 2, mb: 2, border: `1px solid ${theme.palette.grey.A200}` }}
                                                            onClick={() => setTaskForm({open: true, data: task})}
                                                        >
                                                            <Typography>{task.title}</Typography>
                                                            <Stack direction="row" spacing={1} alignItems="center" sx={{ marginTop: 2 }}>
                                                                <AvatarGroup
                                                                    max={4}
                                                                    sx={{
                                                                        '& :first-child.MuiAvatar-root': {
                                                                            width: 20,
                                                                            height: 20,
                                                                            fontSize: 11,
                                                                            backgroundColor: 'secondary.main',
                                                                            color: 'secondary.contrastText'
                                                                        }
                                                                    }}>
                                                                    {task.assignees?.map((e, i) => (
                                                                        <Avatar key={i} alt={e.name}/>
                                                                    ))}
                                                                </AvatarGroup>
                                                                {task.labels?.map((e, i) => (
                                                                    <CustomChip
                                                                        key={i}
                                                                        color={e.color !== '' ? e.color : theme.palette.primary.main}
                                                                        label={e.label}
                                                                        size="small"
                                                                        sx={{
                                                                            height: 18,
                                                                            '.MuiChip-label': {
                                                                                fontSize: 10,
                                                                                fontWeight: 500
                                                                            }
                                                                        }}/>
                                                                ))}
                                                            </Stack>
                                                        </Card>
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