'use client'

import {
    Card,
    CardContent,
    CardHeader,
    Grid2, Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography, useTheme
} from "@mui/material";
import {useParams} from "next/navigation";
import useSWR from "swr";
import ProjectService from "services/ProjectService";
import TaskService from "services/TaskService";
import {useSelector} from "store";
import CustomChip from "components/chip/CustomChip";
import React from "react";

export default function Home() {
    const params = useParams();
    const theme = useTheme();
    const { workspace } = useSelector(state => state.app);

    const { data: resProjects } = useSWR(workspace?.id ? '/api/project' : null,
        () => ProjectService.getProjectsByQuery({workspace: workspace?.id}));
    const { data: resTasks } = useSWR(workspace?.id ? '/api/task' : null,
        () => TaskService.getTasksByQuery({workspace: workspace?.id}));
    const { data: resAssigned } = useSWR(workspace?.id ? '/api/task/assigned' : null,
        () => TaskService.getTasksByQuery({workspace: workspace?.id, assigned: true, limit: 5}))
    const { data: resCompleted } = useSWR(workspace?.id ? '/api/task/completed' : null,
        () => TaskService.getTasksByQuery({workspace: workspace?.id, completed: true, limit: 5}))

    return (
        <>
            <Grid2 container spacing={4}>
                <Grid2 size={{ xs: 12, md: 3, lg: 3}}>
                    <Card>
                        <CardContent>
                            <Typography variant="h1">{resProjects?.data?.pagination?.count}</Typography>
                            <Typography>Projects</Typography>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 3, lg: 3}}>
                    <Card>
                        <CardContent>
                            <Typography variant="h1">{resTasks?.data?.pagination?.count}</Typography>
                            <Typography>Task Completed</Typography>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 3, lg: 3}}>
                    <Card>
                        <CardContent>
                            <Typography variant="h1">{resAssigned?.data?.pagination?.count}</Typography>
                            <Typography>Task Assigned</Typography>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 3, lg: 3}}>
                    <Card>
                        <CardContent>
                            <Typography variant="h1">{resAssigned?.data?.pagination?.count}</Typography>
                            <Typography>Task Ongoing</Typography>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 size={{ xs: 12, lg: 6 }}>
                    <Card>
                        <CardHeader title="Ongoing Task"/>
                        <CardContent>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Label</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {resAssigned?.data?.data?.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={2}>
                                                No Task
                                            </TableCell>
                                        </TableRow>
                                        ) : resAssigned?.data?.data?.map((e, i) => (
                                        <TableRow key={i}>
                                            <TableCell>{e.title}</TableCell>
                                            <TableCell>
                                                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
                                                    {e.labels?.map(label => (
                                                        <CustomChip
                                                            key={i}
                                                            color={label.color !== '' ? label.color : theme.palette.primary.main}
                                                            label={label.label}
                                                            size="small"
                                                            sx={{
                                                                height: 18,
                                                                '.MuiChip-label': {
                                                                    fontSize: 10,
                                                                    fontWeight: 500
                                                                }
                                                            }}/>
                                                    ))}
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 size={{ xs: 12, lg: 6 }}>
                    <Card>
                        <CardHeader title="Completed Task"/>
                        <CardContent>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Label</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {resCompleted?.data?.data?.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={2}>
                                                No Task
                                            </TableCell>
                                        </TableRow>
                                    ) : resCompleted?.data?.data?.map((e, i) => (
                                        <TableRow key={i}>
                                            <TableCell>{e.title}</TableCell>
                                            <TableCell>
                                                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
                                                    {e.labels?.map(label => (
                                                        <CustomChip
                                                            key={i}
                                                            color={label.color !== '' ? label.color : theme.palette.primary.main}
                                                            label={label.label}
                                                            size="small"
                                                            sx={{
                                                                height: 18,
                                                                '.MuiChip-label': {
                                                                    fontSize: 10,
                                                                    fontWeight: 500
                                                                }
                                                            }}/>
                                                    ))}
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </Grid2>
            </Grid2>
        </>

    )
}