'use client'

import {Avatar, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import useSWR from "swr";
import WorkspaceService from "services/WorkspaceService";
import {useSelector} from "store";

export default function Member() {
    const { workspace } = useSelector(state => state.app);

    const { data: resMembers } = useSWR(
        workspace?.id ? '/api/workspace/member' : null,
        () => WorkspaceService.getWorkspaceMember(workspace?.id)
    )

    return (
        <>
        <TableContainer>
            <Table>
                <TableBody>
                    {resMembers?.data?.map((e, i) => (
                        <TableRow key={i}>
                            <TableCell>
                                <Avatar alt={e.name}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    )
}