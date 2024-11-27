import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";

export default function DeleteConfirmation(props) {
    const { open, onClose, onSubmit } = props;

    return (
        <Dialog
            fullWidth
            maxWidth="xs"
            open={open}
            onClose={onClose}>
            <DialogTitle>Delete Confirmation</DialogTitle>
            <DialogContent>
                <Typography>Are you sure want to delete this data?</Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    color="default"
                    onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    color="error"
                    variant="contained"
                    onClick={onSubmit}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}