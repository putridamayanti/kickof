import {usePathname} from "next/navigation";
import {
    Box, Stack,
    styled,
    useMediaQuery
} from "@mui/material";
import Image from "next/image";
import Logo from "components/shared/Logo";
import Link from "next/link";
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import {HexToRGBA} from "utils/theme";

const LeftWrapper = styled(Box)(({ theme }) => ({
    width: '50vw',
    minHeight: '100%',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    borderRadius: '20px',
    justifyContent: 'center',
    backgroundColor: HexToRGBA(theme.palette.primary.main, 0.04),
    margin: theme => theme.spacing(8, 0, 8, 8),
    position: 'relative',
}));

const RightWrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    [theme.breakpoints.up('md')]: {
        maxWidth: 450
    },
    [theme.breakpoints.up('lg')]: {
        maxWidth: 600
    },
    [theme.breakpoints.up('xl')]: {
        maxWidth: 750
    }
}));

export default function AuthLayout(props) {
    const { children } = props;
    const pathname = usePathname();
    const illustration = pathname.includes('register') ? 'auth-register' : 'auth-login';
    const hidden = useMediaQuery(theme => theme.breakpoints.down('md'))

    return (
        <Stack direction="row" sx={{ minHeight: '100vh', backgroundColor: 'background.paper', padding: 5 }}>
            {!hidden ? (
                <LeftWrapper>
                    <Box sx={{
                        width: '55%',
                        height: '100%',
                        position: 'relative' }}>
                        <Image
                            src={`/images/illustrations/${illustration}.png`}
                            alt={illustration}
                            fill
                            style={{ objectFit: "contain"}}/>
                    </Box>
                </LeftWrapper>
            ) : null}
            <RightWrapper>
                <Box
                    sx={{
                        p: [6, 12],
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Box sx={{ width: '100%', maxWidth: 400 }}>
                        <Logo width={180} height={80}/>
                        {children}
                    </Box>
                </Box>
            </RightWrapper>
        </Stack>
    )
}