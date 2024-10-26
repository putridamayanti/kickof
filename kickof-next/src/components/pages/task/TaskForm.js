import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack} from "@mui/material";
import CustomTextField from "components/form/CustomTextField";
import React, {useEffect, useRef} from "react";
import {useFormik} from "formik";
import MenuItem from "@mui/material/MenuItem";
import {Autocomplete} from "@mui/lab";
import CustomAutocomplete from "components/form/CustomAutocomplete";
import PropTypes from "prop-types";

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
    const { data, columns, taskLabels, members, open, onClose, onSubmit } = props;
    const labels = []

    const formik = useFormik({
        initialValues: {
            title: data?.title ?? 'Task 1',
            description: data?.description ?? 'Task 1',
            columnId: data?.columnId ?? '6131a975-7f11-42e2-ac63-da1c92076fa6',
            labels: data?.labels ?? [],
        },
        onSubmit: values => onSubmit(values)
    });

    const mounted = useRef(false);
    useEffect(() => {
        if (!mounted.current && data) {
            formik.setValues(data);

            mounted.current = true;
        }
    }, [data, formik]);
    console.log(members)
    return (
        <Dialog
            fullWidth
            maxWidth="md"
            open={open}
            onClose={onClose}>
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
                            label="Column"
                            name="columnId"
                            value={formik.values.columnId}
                            onChange={formik.handleChange}
                            error={Boolean(formik.errors.columnId)}
                            {...(formik.errors.columnId && {helperText: formik.errors.columnId})}
                        >
                            {columns?.map((e, i) => (
                                <MenuItem key={i} value={e.id}>
                                    {e.name}
                                </MenuItem>
                            ))}
                        </CustomTextField>
                        <CustomAutocomplete
                            label="Labels"
                            options={taskLabels?.data ?? []}
                            onChange={(newValue) => formik.setFieldValue('labels', newValue)}
                            value={formik.values.labels}/>
                        <CustomAutocomplete
                            label="Assignees"
                            options={members?.data ?? []}
                            onChange={(newValue) => formik.setFieldValue('labels', newValue)}
                            value={formik.values.labels}/>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button color="default" onClick={onClose} type="button">
                        Cancel
                    </Button>
                    <Button variant="contained" type="submit">
                        Add
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}
