'use client'

import {
    Avatar,
    Card,
    CardContent,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography
} from "@mui/material";
import useSWR from "swr";
import WorkspaceService from "services/WorkspaceService";
import {useSelector} from "store";
import Box from "@mui/material/Box";

export default function Member() {
    const { workspace } = useSelector(state => state.app);

    const { data: resMembers } = useSWR(
        workspace?.id ? '/api/workspace/member' : null,
        () => WorkspaceService.getWorkspaceMember(workspace?.id)
    )

    return (
        <>
        <Card>
            <CardContent>
                <TableContainer>
                    <Table>
                        <TableBody>
                            {resMembers?.data?.map((e, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        <Stack direction="row" spacing={4}>
                                            <Avatar alt={e.name}/>
                                            <Box>
                                                <Typography variant="subtitle2">{e.name}</Typography>
                                                <Typography variant="caption">{e.email}</Typography>
                                            </Box>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
        </>
    )
}