'use client'

import {
    Button,
    Card,
    CardContent,
    Stack,
    Table,
    TableCell,
    TableRow,
    TableContainer,
    TableHead,
    Typography,
    TableBody, CircularProgress, DialogTitle, DialogContent, DialogActions, Dialog, useTheme
} from "@mui/material";
import React, {useState} from "react";
import {useParams} from "next/navigation";
import useSWR from "swr";
import ProjectService from "services/ProjectService";
import {AppActions} from "store/slices/AppSlice";
import {useSelector} from "store";
import TaskLabelService from "services/TaskLabelService";
import CustomTextField from "components/form/CustomTextField";
import IconButton from "@mui/material/IconButton";
import {DeleteRounded, EditRounded} from "@mui/icons-material";
import {SketchPicker} from "react-color";
import Box from "@mui/material/Box";
import {DefaultSort} from "constants/constants";

export default function TaskLabels() {
    const params = useParams();
    const theme = useTheme();
    const { workspace, project } = useSelector(state => state.app);
    const [form, setForm] = useState({open: false, data: {}});
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const { data: resData, isLoading: loading, mutate } = useSWR(
        (params?.workspace && workspace?.id) ? '/api/task-label' : null,
        () => TaskLabelService.getTaskLabelsByQuery({workspace: workspace?.id, sort: DefaultSort.name.value}));

    const submit = () => {
        form.data.workspaceId = workspace.id;
        form.data.projectId = project.id;

        if (form.data?.id) {
            return TaskLabelService.updateTaskLabel(form?.data?.id, form.data)
        }

        return TaskLabelService.createTaskLabel(form.data);
    };

    const handleSubmit = () => {
        setLoadingSubmit(true);

        return submit().then(() => {
            setForm({open: false, data: {}});
            setLoadingSubmit(false);
            mutate();
        });
    };

    return (
        <>
            <Stack direction="row" justifyContent="space-between" alignItems="center" marginBottom={2}>
                <Typography variant="h4" gutterBottom sx={{ flex: 1 }}>
                    All Task Labels
                </Typography>
                <Button variant="contained" onClick={() => setForm({open: true, data: {}})}>
                    Add Label
                </Button>
            </Stack>
            <Card>
                <CardContent>
                    {loading ? (
                        <CircularProgress/>
                    ) : (
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Label</TableCell>
                                        <TableCell align="right">Option</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {resData?.data?.map((e, i) => (
                                        <TableRow key={i}>
                                            <TableCell>
                                                <Stack direction="row" spacing={4} alignItems="center">
                                                    <Box sx={{
                                                        width: 50,
                                                        height: 20,
                                                        borderRadius: '5px',
                                                        background: e.color !== "" ? e.color : theme.palette.primary.main
                                                    }}/>
                                                    <Typography variant="subtitle2">{e.label}</Typography>
                                                </Stack>
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton onClick={() => setForm({open: true, data: e})}>
                                                    <EditRounded/>
                                                </IconButton>
                                                <IconButton>
                                                    <DeleteRounded/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </CardContent>
            </Card>

            <Dialog
                fullWidth
                maxWidth="sm"
                open={form.open}
                onClose={() => setForm({open: false, data: {}})}>
                <DialogTitle>Add New Column</DialogTitle>
                <DialogContent>
                    <Stack spacing={3}>
                        <CustomTextField
                            fullWidth
                            label="Label"
                            value={form.data?.label}
                            onChange={(e) => setForm({...form, data: {...form.data, label: e.target.value}})}
                        />
                        <>
                            <CustomTextField
                                fullWidth
                                disabled
                                label="Color"
                                value={form.data?.color}
                            />
                            <SketchPicker
                                color={form.data?.color}
                                onChangeComplete={(color) => setForm({...form, data: {...form.data, color: color.hex}})}/>
                        </>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button color="default" onClick={() => setForm({open: false, data: {}})}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleSubmit}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}