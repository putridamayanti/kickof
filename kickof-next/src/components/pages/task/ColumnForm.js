import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack} from "@mui/material";
import CustomTextField from "components/form/CustomTextField";
import React from "react";
import {useFormik} from "formik";

export default function ColumnForm(props) {
    const { open, onClose, onSubmit } = props;

    const formik = useFormik({
        initialValues: { name: '' },
        onSubmit: values => onSubmit(values)
    });

    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            open={open}
            onClose={onClose}>
            <DialogTitle>Add New Column</DialogTitle>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <Stack spacing={3}>
                        <CustomTextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={Boolean(formik.errors.name)}
                            {...(formik.errors.name && {helperText: formik.errors.name})}
                        />
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
