'use client'

import CustomTextField from "components/form/CustomTextField";
import {useFormik} from "formik";
import {Button, Card, CardContent, CardHeader, Stack} from "@mui/material";
import {useRouter} from "next/navigation";
import {useSelector} from "store";
import ProjectService from "services/ProjectService";

export default function ProjectForm({ data }) {
    const router = useRouter();
    const { workspace } = useSelector(state => state.app);

    const formik = useFormik({
        initialValues: {
            name: '',
            code: '',
            description: '',
        },
        onSubmit: values => handleSubmit(values)
    });

    const handleSubmit = values => {
        values.workspaceId = workspace.id;

        return ProjectService.createProject(values)
            .then(res => router.back());
    }

    return (
        <Card>
            <CardHeader title={`${data ? 'Update' : 'Create'} Project`}/>
            <CardContent>
                <form onSubmit={formik.handleSubmit}>
                    <Stack spacing={4} alignItems="end">
                        <CustomTextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={Boolean(formik.errors.name)}
                            {...(formik.errors.name && {helperText: formik.errors.name})}
                        />
                        <CustomTextField
                            fullWidth
                            label="Code"
                            name="code"
                            value={formik.values.code}
                            onChange={formik.handleChange}
                            error={Boolean(formik.errors.code)}
                            {...(formik.errors.code && {helperText: formik.errors.code})}
                        />
                        <CustomTextField
                            fullWidth
                            multiline
                            rows={3}
                            label="Description"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={Boolean(formik.errors.description)}
                            {...(formik.errors.description && {helperText: formik.errors.description})}
                        />
                        <Button fullWidth type='submit' variant='contained' sx={{ maxWidth: {lg: 160}, mb: 4 }}>
                            Create Project
                        </Button>
                    </Stack>
                </form>
            </CardContent>
        </Card>
    )
}