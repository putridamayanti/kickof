import {Box, Button, Checkbox, Divider, IconButton, InputAdornment, styled, Typography, useTheme} from "@mui/material";
import {Alert} from "@mui/lab";
import CustomTextField from "components/form/CustomTextField";
import Link from "next/link";
import {FacebookRounded, GitHub, Google, VisibilityOffRounded, VisibilityRounded, X} from "@mui/icons-material";
import MuiFormControlLabel from "@mui/material/FormControlLabel";
import {useFormik} from "formik";
import {useState} from "react";
import {useRouter} from "next/navigation";
import AuthService from "services/AuthService";

const LinkStyled = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    color: `${theme.palette.primary.main} !important`
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
    '& .MuiFormControlLabel-label': {
        color: theme.palette.text.secondary
    }
}))
export default function LoginForm() {
    const theme = useTheme();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(true)

    const formik = useFormik({
        initialValues: { email: 'admin@kickof.com', password: 'admin' },
        onSubmit: values => handleSubmit(values)
    });

    const handleSubmit = (values) => {
        return AuthService.login(values)
            .then(res => {
                if (res.status === 200) {
                    router.push('/app');
                }
            })
    };

    return (
        <>
            <Box sx={{ my: 6 }}>
                <Typography variant='h3' sx={{ mb: 1.5 }}>
                    {`Welcome to KickOf! 👋🏻`}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                    Please sign-in to your account and start the adventure
                </Typography>
            </Box>
            <Alert icon={false} color="primary" sx={{ py: 3, mb: 6, '& .MuiAlert-message': { p: 0 } }}>
                <Typography variant='body2' sx={{ mb: 2, color: 'primary.main' }}>
                    Admin: <strong>admin@kickof.com</strong> / Pass: <strong>admin</strong>
                </Typography>
                <Typography variant='body2' sx={{ color: 'primary.main' }}>
                    Client: <strong>client@vuexy.com</strong> / Pass: <strong>client</strong>
                </Typography>
            </Alert>
            <form noValidate autoComplete='off' onSubmit={formik.handleSubmit}>
                <Box sx={{ mb: 4 }}>
                    <CustomTextField
                        fullWidth
                        label='Email'
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        placeholder='admin@vuexy.com'
                        error={Boolean(formik.errors.email)}
                        type="email"
                        {...(formik.errors.email && { helperText: formik.errors.email })}
                    />
                </Box>
                <Box sx={{ mb: 1.5 }}>
                    <CustomTextField
                        fullWidth
                        value={formik.values.password}
                        label='Password'
                        name="password"
                        onChange={formik.handleChange}
                        error={Boolean(formik.errors.password)}
                        {...(formik.errors.password && { helperText: formik.errors.password })}
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        edge='end'
                                        onMouseDown={e => e.preventDefault()}
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <VisibilityRounded/> : <VisibilityOffRounded/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        mb: 1.75,
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <FormControlLabel
                        label='Remember Me'
                        control={<Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />}
                    />
                    <Typography component={LinkStyled} href='/forgot-password'>
                        Forgot Password?
                    </Typography>
                </Box>
                <Button fullWidth type='submit' variant='contained' sx={{ mb: 4 }}>
                    Login
                </Button>
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Typography sx={{ color: 'text.secondary', mr: 2 }}>New on our platform?</Typography>
                    <Typography href='/register' component={LinkStyled}>
                        Create an account
                    </Typography>
                </Box>
                <Divider
                    sx={{
                        color: 'text.disabled',
                        '& .MuiDivider-wrapper': { px: 6 },
                        fontSize: theme.typography.body2.fontSize,
                        my: theme => `${theme.spacing(6)} !important`
                    }}
                >
                    or
                </Divider>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconButton href='/' component={Link} sx={{ color: '#497ce2' }} onClick={e => e.preventDefault()}>
                        <FacebookRounded/>
                    </IconButton>
                    <IconButton href='/' component={Link} sx={{ color: '#1da1f2' }} onClick={e => e.preventDefault()}>
                        <X/>
                    </IconButton>
                    <IconButton
                        href='/'
                        component={Link}
                        onClick={e => e.preventDefault()}
                        sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : 'grey.300') }}
                    >
                        <GitHub/>
                    </IconButton>
                    <IconButton href='/' component={Link} sx={{ color: '#db4437' }} onClick={e => e.preventDefault()}>
                        <Google/>
                    </IconButton>
                </Box>
            </form>
        </>
    )
}