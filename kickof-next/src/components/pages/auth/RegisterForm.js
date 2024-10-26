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
    const [values, setValues] = useState({
        password: '',
        showPassword: false
    })

    const theme = useTheme()
    const { settings } = useSettings()

    const { skin } = settings
    const hidden = useMediaQuery(theme.breakpoints.down('md'))

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value })
    }

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword })
    }
    const imageSource = skin === 'bordered' ? 'auth-v2-register-illustration-bordered' : 'auth-v2-register-illustration'

    return (
        <>
            <Box sx={{ my: 6 }}>
                <Typography variant='h3' sx={{ mb: 1.5 }}>
                    Adventure starts here 🚀
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>Make your app management easy and fun!</Typography>
            </Box>
            <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
                <CustomTextField
                    fullWidth
                    autoFocus
                    id='username'
                    label='Username'
                    placeholder='John.doe'
                    sx={{ display: 'flex', mb: 4 }}
                />
                <CustomTextField
                    fullWidth
                    type='email'
                    label='Email'
                    sx={{ display: 'flex', mb: 4 }}
                    placeholder='john.doe@gmail.com'
                />
                <CustomTextField
                    fullWidth
                    label='Password'
                    value={values.password}
                    placeholder='············'
                    id='auth-register-v2-password'
                    onChange={handleChange('password')}
                    type={values.showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton
                                    edge='end'
                                    onClick={handleClickShowPassword}
                                    onMouseDown={e => e.preventDefault()}
                                    aria-label='toggle password visibility'
                                >
                                    {values.showPassword ? <VisibilityRounded/> : <VisibilityOffRounded/>}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
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