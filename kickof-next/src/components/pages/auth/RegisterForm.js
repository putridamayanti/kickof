'use client'

import {useState} from "react";
import {
    Box, Button,
    Checkbox, Divider,
    IconButton,
    InputAdornment, styled,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import useSettings from "hooks/useSettings";
import CustomTextField from "components/form/CustomTextField";
import Link from "next/link";
import MuiFormControlLabel from "@mui/material/FormControlLabel";
import {FacebookRounded, GitHub, Google, VisibilityOffRounded, VisibilityRounded, X} from "@mui/icons-material";
import {useFormik} from "formik";
import AuthService from "services/AuthService";
import {useRouter} from "next/navigation";

const LinkStyled = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    color: `${theme.palette.primary.main} !important`
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
    '& .MuiFormControlLabel-label': {
        color: theme.palette.text.secondary
    }
}))

export default function RegisterForm() {
    const theme = useTheme();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false)

    const formik = useFormik({
        initialValues: { name: '', email: '', password: '' },
        onSubmit: values => handleSubmit(values)
    });

    const handleSubmit = (values) => {
        return AuthService.register(values)
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
                    Adventure starts here 🚀
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>Make your app management easy and fun!</Typography>
            </Box>
            <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
                <Box sx={{ mb: 4 }}>
                    <CustomTextField
                        fullWidth
                        label='Full Name'
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        placeholder='admin@vuexy.com'
                        error={Boolean(formik.errors.name)}
                        {...(formik.errors.name && { helperText: formik.errors.name })}
                    />
                </Box>
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
                <FormControlLabel
                    control={<Checkbox />}
                    label={
                        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <Typography sx={{ color: 'text.secondary' }}>I agree to </Typography>
                            <Typography component={LinkStyled} href='/' onClick={e => e.preventDefault()} sx={{ ml: 1 }}>
                                privacy policy & terms
                            </Typography>
                        </Box>
                    }
                />
                <Button fullWidth type='submit' variant='contained' sx={{ mb: 4 }}>
                    Sign up
                </Button>
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Typography sx={{ color: 'text.secondary', mr: 2 }}>Already have an account?</Typography>
                    <Typography
                        component={LinkStyled}
                        href='/pages/auth/login-v2'
                        sx={{ fontSize: theme.typography.body1.fontSize }}
                    >
                        Sign in instead
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