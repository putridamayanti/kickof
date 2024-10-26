'use client'

import {Stack, Typography} from "@mui/material";
import useSWR from "swr";
import WorkspaceService from "services/WorkspaceService";
import WorkspaceForm from "components/pages/workspace/WorkspaceForm";
import Box from "@mui/material/Box";
import {useEffect} from "react";
import {useDispatch, useSelector} from "store";
import {AppActions} from "store/slices/AppSlice";

export default function Dashboard() {
    const { workspaces } = useSelector(state => state.app);

    return (
        <>
            {workspaces?.length === 0 ? (
                <Stack alignItems="center">
                    <Typography variant="h2">Create Workspace</Typography>
                    <Typography>
                        You need to create first workspace!
                    </Typography>
                    <Box sx={{ width: { xs: '100%', md: '50%' }}} marginTop={5}>
                        <WorkspaceForm redirectUrl="/app/{workspace}"/>
                    </Box>
                </Stack>
            ) : (
                <Typography>Dashboard</Typography>
            )}
        </>
    )
}
