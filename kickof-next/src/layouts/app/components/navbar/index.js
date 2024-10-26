import {Box, Button, FormLabel, IconButton, Select, Stack, styled, useTheme} from "@mui/material";
import MuiAppBar from '@mui/material/AppBar'
import MuiToolbar from '@mui/material/Toolbar'
import {HexToRGBA} from "utils/theme";
import AppNavbarContent from "layouts/app/components/navbar/AppNavbarContent";
import MenuItem from "@mui/material/MenuItem";
import {useDispatch, useSelector} from "store";
import {AppActions} from "store/slices/AppSlice";
import {useParams, useRouter} from "next/navigation";
import {useEffect} from "react";
import AppNavbarWorkspaceSelect from "layouts/app/components/navbar/AppNavbarWorkspaceSelect";
import {ArrowRightRounded, ChevronRightRounded} from "@mui/icons-material";
import AppNavbarProjectSelect from "layouts/app/components/navbar/AppNavbarProjectSelect";

const AppBar = styled(MuiAppBar)(({ theme }) => ({
    transition: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    color: theme.palette.text.primary,
    minHeight: theme.mixins.toolbar.minHeight,
    [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6)
    },
    [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4)
    }
}))

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
    width: '100%',
    marginTop: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    padding: `${theme.spacing(0, 6)} !important`
}))

export default function AppNavbar(props) {
    const { toggleNavVisibility } = props;
    const theme = useTheme();
    const router = useRouter();
    const params = useParams();
    const dispatch = useDispatch();
    const { workspace, workspaces } = useSelector(state => state.app);
    const appBarBlur = true;

    const appBarBlurEffect = {
        '&:after': {
            top: 0,
            left: 0,
            zIndex: -1,
            width: '100%',
            content: '""',
            position: 'absolute',
            backdropFilter: 'blur(10px)',
            height: theme => `calc(${theme.mixins.toolbar.minHeight}px + ${theme.spacing(4)})`,
            mask: theme =>
                `linear-gradient(${theme.palette.background.default}, ${theme.palette.background.default} 18%, transparent 100%)`,
            background: theme =>
                `linear-gradient(180deg,${HexToRGBA(theme.palette.background.default, 0.7)} 44%, ${HexToRGBA(
                    theme.palette.background.default,
                    0.43
                )} 73%, ${HexToRGBA(theme.palette.background.default, 0)})`
        }
    }

    useEffect(() => {
        if (params.workspace) {
            const workspace = workspaces.find(e => e.code === params.workspace);

            dispatch(AppActions.setWorkspace(workspace));

        }
    }, [dispatch, params]);

    const handleWorkspace = (value) => {
        router.push(`/app/${value.code}`);
    }

    return (
        <AppBar
            elevation={0}
            color='default'
            className='layout-navbar'
            sx={{
                transition: theme.transitions.create(['margin', 'width'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                ...appBarBlurEffect
            }}
            position={'sticky'}>
            <Toolbar
                className='navbar-content-container'
                sx={{
                    ...(appBarBlur && { backdropFilter: 'blur(6px)' }),
                    minHeight: theme => `${theme.mixins.toolbar.minHeight}px !important`,
                    backgroundColor: theme => HexToRGBA(theme.palette.background.paper, appBarBlur ? 0.95 : 1),
                    boxShadow: 2,
                    // ...(contentWidth === 'boxed' && {
                    //     '@media (min-width:1440px)': { maxWidth: theme => `calc(1440px - ${theme.spacing(6 * 2)})` }
                    // })
                }}>
                <Stack direction="row" spacing={1}>
                    <IconButton onClick={toggleNavVisibility}>
                        <svg width="20" height="18" viewBox="0 0 20 18" fill={theme.palette.text.secondary} xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_115_9)">
                                <path d="M10.5556 0H1.38889C0.621827 0 0 0.746192 0 1.66667C0 2.58714 0.621827 3.33333 1.38889 3.33333H10.5556C11.3226 3.33333 11.9444 2.58714 11.9444 1.66667C11.9444 0.746192 11.3226 0 10.5556 0Z" fill={theme.palette.text.secondary}/>
                                <path d="M18.6111 7H1.38889C0.621827 7 0 7.74619 0 8.66667C0 9.58714 0.621827 10.3333 1.38889 10.3333H18.6111C19.3782 10.3333 20 9.58714 20 8.66667C20 7.74619 19.3782 7 18.6111 7Z" fill={theme.palette.text.secondary}/>
                                <path d="M14.4444 14H1.38889C0.621827 14 0 14.7462 0 15.6667C0 16.5871 0.621827 17.3333 1.38889 17.3333H14.4444C15.2115 17.3333 15.8333 16.5871 15.8333 15.6667C15.8333 14.7462 15.2115 14 14.4444 14Z" fill={theme.palette.text.secondary}/>
                            </g>
                            <defs>
                                <clipPath id="clip0_115_9">
                                    <rect width="20" height="17.3333" fill={theme.palette.text.secondary}/>
                                </clipPath>
                            </defs>
                        </svg>
                    </IconButton>
                    <Box width={20}/>
                    <AppNavbarWorkspaceSelect
                        workspaces={workspaces}
                        selected={workspace}
                        onSelect={(value) => handleWorkspace(value)}/>
                    {params.project && (
                        <Stack direction="row" alignItems="end">
                            <ChevronRightRounded/>
                            <AppNavbarProjectSelect
                                workspaces={workspaces}
                                selected={workspace}
                                onSelect={(value) => handleWorkspace(value)}/>
                        </Stack>
                    )}
                </Stack>
                <Box flexGrow={1} />
                <AppNavbarContent/>
            </Toolbar>
        </AppBar>
    )
}