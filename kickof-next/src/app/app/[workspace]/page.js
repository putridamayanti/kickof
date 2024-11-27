'use client'

import {
    Card,
    CardContent,
    CardHeader,
    Grid2,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {useParams} from "next/navigation";
import useSWR from "swr";
import ProjectService from "services/ProjectService";
import TaskService from "services/TaskService";

export default function Home() {
    const params = useParams();
    const { data: resProjects } = useSWR(params?.workspace ? '/api/project' : null,
        () => ProjectService.getProjectsByQuery({workspace: params?.workspace}));
    const { data: resTasks } = useSWR(params?.workspace ? '/api/task' : null,
        () => TaskService.getTasksByQuery({workspace: params?.workspace}));
    const { data: resAssigned } = useSWR(params?.workspace ? '/api/task' : null,
        () => TaskService.getTasksByQuery({workspace: params?.workspace, assigned: true, limit: 5}))

    return (
        <>
            <Grid2 container spacing={4}>
                <Grid2 size={{ xs: 12, md: 3, lg: 3}}>
                    <Card>
                        <CardContent>
                            <Typography variant="h1">{resProjects?.data?.pagination?.counts}</Typography>
                            <Typography>Projects</Typography>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 3, lg: 3}}>
                    <Card>
                        <CardContent>
                            <Typography variant="h1">{resTasks?.data?.pagination?.counts}</Typography>
                            <Typography>Task Completed</Typography>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 3, lg: 3}}>
                    <Card>
                        <CardContent>
                            <Typography variant="h1">{resAssigned?.data?.pagination?.counts}</Typography>
                            <Typography>Task Assigned</Typography>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 3, lg: 3}}>
                    <Card>
                        <CardContent>
                            <Typography variant="h1">{resAssigned?.data?.pagination?.counts}</Typography>
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
                                    {resAssigned?.data?.data?.map((e, i) => (
                                        <TableRow key={i}>
                                            <TableCell>{e.title}</TableCell>
                                            <TableCell>
                                                {e.labels?.map(label => label.label).join(' ')}
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
                                    {resAssigned?.data?.data?.map((e, i) => (
                                        <TableRow key={i}>
                                            <TableCell>{e.title}</TableCell>
                                            <TableCell>
                                                {e.labels?.map(label => label.label).join(' ')}
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