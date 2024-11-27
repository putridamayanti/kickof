import {Box, styled} from "@mui/material";
import {useEffect, useState} from "react";
import AppNavbar from "layouts/app/components/navbar";
import Sidebar from "layouts/app/components/sidebar";
import {useDispatch, useSelector} from "store";
import {ThemeActions} from "store/slices/ThemeSlice";
import useSWR from "swr";
import WorkspaceService from "services/WorkspaceService";
import {AppActions} from "store/slices/AppSlice";
import {useParams, useRouter} from "next/navigation";
import ProjectService from "services/ProjectService";
import AuthService from "services/AuthService";
import {ProfileActions} from "store/slices/ProfileSlice";

const LayoutWrapper = styled(Box)(({ theme }) => ({
    // height: '100%',
    display: 'flex',
    backgroundColor: theme.palette.background.default
}));

const MainContentWrapper = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    minWidth: 0,
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column'
}));

const ContentWrapper = styled('main')(({ theme }) => ({
    flexGrow: 1,
    width: '100%',
    padding: theme.spacing(6),
    transition: 'padding .25s ease-in-out',
    [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4)
    }
}))

export default function AppLayout(props) {
    const { children } = props;
    const router = useRouter();
    const { isSidebarCollapsed } = useSelector(state => state.theme);
    const dispatch = useDispatch();
    const params = useParams();
    const { workspaces, workspace, project } = useSelector(state => state.app);
    const toggleNavVisibility = () => dispatch(ThemeActions.setSidebarCollapse(!isSidebarCollapsed));
    const contentHeightFixed = true;

    const { data: resProfile } = useSWR('/api/profile', () => AuthService.getProfile());

    const { data: resData, isLoading: loading } = useSWR(
        (workspaces?.length === 0 && resProfile?.data) ? '/api/workspace' : null,
        () => WorkspaceService.getWorkspacesByQuery({
            user: resProfile?.data?.id
        }));

    const { data: resProject } = useSWR(
        (!project?.id && params.code) ? '/api/project' : null,
        () => ProjectService.getProjectByCode(params.code));

    useEffect(() => {
        if (resData?.data?.data?.length > 0) {
            dispatch(AppActions.setWorkspace(resData?.data?.data[0]));
            dispatch(AppActions.setWorkspaces(resData?.data?.data));
        }

        if (resProject?.data?.id) {
            dispatch(AppActions.setProject(resProject?.data));
        }

        if (resProfile?.data?.id) {
            dispatch(ProfileActions.setProfile(resProfile?.data));
        }
    }, [dispatch, resData?.data, resProject?.data, resProfile?.data]);

    useEffect(() => {
        if (workspace?.code && params.workspace !== workspace.code) {
            router.push(`/app/${workspace.code}`);
        }
    }, [workspace, params, router]);

    return (
        <>
            <LayoutWrapper>
                <Sidebar/>
                <MainContentWrapper
                    sx={{
                        ...(contentHeightFixed && { maxHeight: '100vh' }),
                        ...(isSidebarCollapsed && { width: '100vw' }),
                    }}>
                    <AppNavbar
                        toggleNavVisibility={toggleNavVisibility}/>
                    <ContentWrapper>
                        {children}
                    </ContentWrapper>
                </MainContentWrapper>
            </LayoutWrapper>
        </>
    )
}