import CustomTextField from "components/form/CustomTextField";
import {useFormik} from "formik";
import {Button, Card, CardContent, InputAdornment, Stack} from "@mui/material";
import {WorkspaceSizes} from "constants/constants";
import MenuItem from "@mui/material/MenuItem";
import WorkspaceService from "services/WorkspaceService";
import {useRouter} from "next/navigation";

export default function WorkspaceForm(props) {
    const { redirectUrl } = props
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            name: 'Workspace 1',
            code: 'workspace1',
            endpoint: 'workspace1',
            size: '2-20',
        },
        onSubmit: values => handleSubmit(values)
    });

    const handleSubmit = values => {
        const finalUrl = redirectUrl.replace('{workspace}', values.code);
        console.log(finalUrl)
        return WorkspaceService.createWorkspace(values)
            .then(res => redirectUrl?.includes('{workspace}') ? router.push(finalUrl) : router.back());
    }

    return (
        <Card>
            <CardContent>
                <form onSubmit={formik.handleSubmit}>
                    <Stack spacing={4}>
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
                            label="Endpoint"
                            name="endpoint"
                            value={formik.values.endpoint}
                            onChange={formik.handleChange}
                            error={Boolean(formik.errors.endpoint)}
                            {...(formik.errors.endpoint && {helperText: formik.errors.endpoint})}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {process.env.APP_URL}/
                                    </InputAdornment>
                                )
                            }}
                        />
                        <CustomTextField
                            fullWidth
                            select
                            label="Size (Number of people)"
                            name="size"
                            value={formik.values.size}
                            onChange={formik.handleChange}
                            error={Boolean(formik.errors.size)}
                            {...(formik.errors.size && {helperText: formik.errors.size})}
                        >
                            {WorkspaceSizes.map((e, i) => (
                                <MenuItem key={i} value={e}>
                                    {e}
                                </MenuItem>
                            ))}
                        </CustomTextField>
                        <Button fullWidth type='submit' variant='contained' sx={{ mb: 4 }}>
                            Create Workspace
                        </Button>
                    </Stack>
                </form>
            </CardContent>
        </Card>
    )
}