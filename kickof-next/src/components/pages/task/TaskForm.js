import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack} from "@mui/material";
import CustomTextField from "components/form/CustomTextField";
import React, {useEffect, useMemo, useRef, useState} from "react";
import {useFormik} from "formik";
import MenuItem from "@mui/material/MenuItem";
import {Autocomplete} from "@mui/lab";
import CustomAutocomplete from "components/form/CustomAutocomplete";
import PropTypes from "prop-types";
import DeleteConfirmation from "components/dialog/DeleteConfirmation";
import TaskService from "services/TaskService";

TaskForm.propTypes = {
    data: PropTypes.any,
    columns: PropTypes.array,
    taskLabels: PropTypes.array,
    members: PropTypes.array,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func
}
export default function TaskForm(props) {
    const { data, states, taskLabels, members, open, onRefresh, onClose, onSubmit } = props;
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    const formik = useFormik({
        initialValues: {
            id: data?.id ?? null,
            title: data?.title ?? '',
            description: data?.description ?? '',
            stateId: data?.stateId ?? '',
            labels: data?.labels ?? [],
            assignees: data?.assignees?.map((e) => ({...e, label: e.name})) ?? [],
        },
        enableReinitialize: true,
        onSubmit: values => onSubmit(values)
    });

    const dataMembers = useMemo(() => {
        return members?.map((e) => ({
            ...e,
            label: e.name
        }))
    }, [members]);

    const handleClose = () => {
        formik.handleReset();
        onClose();
    };

    const handleDelete = () => {
        return TaskService.deleteTask(data?.id)
            .then(() => {
                setDeleteConfirm(false);
                onClose();
                onRefresh();
            })
    };

    return (
        <>
            <Dialog
                fullWidth
                maxWidth="md"
                open={open}
                onClose={handleClose}>
                <DialogTitle>Add New Task</DialogTitle>
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent>
                        <Stack spacing={3}>
                            <CustomTextField
                                fullWidth
                                label="Title"
                                name="title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                error={Boolean(formik.errors.title)}
                                {...(formik.errors.title && {helperText: formik.errors.title})}
                            />
                            <CustomTextField
                                fullWidth
                                multiline
                                rows={6}
                                label="Description"
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                error={Boolean(formik.errors.description)}
                                {...(formik.errors.description && {helperText: formik.errors.description})}
                            />
                            <CustomTextField
                                fullWidth
                                select
                                label="State"
                                name="stateId"
                                value={formik.values.stateId}
                                onChange={formik.handleChange}
                                error={Boolean(formik.errors.stateId)}
                                {...(formik.errors.stateId && {helperText: formik.errors.stateId})}
                            >
                                {states?.map((e, i) => (
                                    <MenuItem key={i} value={e.id}>
                                        {e.name}
                                    </MenuItem>
                                ))}
                            </CustomTextField>
                            <CustomAutocomplete
                                label="Labels"
                                options={taskLabels ?? []}
                                onChange={(newValue) => formik.setFieldValue('labels', newValue)}
                                value={formik.values.labels ?? []}/>
                            <CustomAutocomplete
                                disableCreate
                                label="Assignees"
                                options={dataMembers ?? []}
                                onChange={(newValue) => formik.setFieldValue('assignees', newValue)}
                                value={formik.values.assignees ?? []}/>
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        {data?.id && (
                            <Stack sx={{ flex: 1 }} alignItems="start">
                                <Button
                                    color="error"
                                    onClick={() => setDeleteConfirm(true)}
                                    type="button"
                                    variant="contained">
                                    Delete
                                </Button>
                            </Stack>
                        )}
                        <Button color="default" onClick={handleClose} type="button">
                            Cancel
                        </Button>
                        <Button variant="contained" type="submit">
                            {data?.id ? 'Update' : 'Add'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            <DeleteConfirmation
                open={deleteConfirm}
                onClose={() => setDeleteConfirm(false)}
                onSubmit={handleDelete}/>
        </>
    )
}
