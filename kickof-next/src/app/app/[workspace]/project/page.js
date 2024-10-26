'use client'

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import {Button, Card, CardContent, Stack, Typography} from "@mui/material";
import Image from "next/image";
import {useParams, useRouter} from "next/navigation";
import React from "react";
import useSWR from "swr";
import WorkspaceService from "services/WorkspaceService";
import ProjectService from "services/ProjectService";

const projects = [
    {
        name: 'Project 1',
        code: 'project1',
        description: 'Develop e-commerce'
    }
];

export default function Project() {
    const router = useRouter();
    const params = useParams();

    const { data: resData, isLoading: loading } = useSWR(
        params?.workspace ? '/api/project' : null,
        () => ProjectService.getProjectsByQuery({workspace: params?.workspace}));
    console.log(resData);
    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" marginBottom={2}>
                <Typography variant="h4" gutterBottom sx={{ flex: 1 }}>
                    All Projects
                </Typography>
                <Button variant="contained" onClick={() => router.push(`/app/${params?.workspace}/project/create`)}>
                    Add Project
                </Button>
            </Stack>
            <Grid container spacing={4}>
                {resData?.data?.data?.map((e, i) => (
                    <Grid key={i} size={{ xs: 12, lg: 4 }} sx={{ cursor: 'pointer' }}>
                        <Card onClick={() => router.push(`/app/${params?.workspace}/project/${e.code}`)}>
                            <CardContent>
                                <Box sx={{ width: '100%', height: 160, marginBottom: 3, position: 'relative' }}>
                                    <Image
                                        src={'/images/background/profile-header.png'}
                                        alt={e.code}
                                        fill
                                        style={{ borderRadius: 10, objectFit: 'cover' }}/>
                                </Box>
                                <Typography variant="h5">{e.name}</Typography>
                                <Typography variant="caption">{e.description}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}