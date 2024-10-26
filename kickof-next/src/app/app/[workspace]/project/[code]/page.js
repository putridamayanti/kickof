'use client'

import {Typography} from "@mui/material";
import {useParams} from "next/navigation";
import KanbanView from "components/pages/task/KanbanView";
import useSWR from "swr";
import TaskService from "services/TaskService";
import ColumnService from "services/ColumnService";
import {useMemo} from "react";
import TaskLabelService from "services/TaskLabelService";
import {DefaultSort} from "constants/constants";
import {useSelector} from "store";
import WorkspaceService from "services/WorkspaceService";

export default function Project() {
    const params = useParams();
    const { workspace } = useSelector(state => state.app);

    const { data: resColumn, isLoading: loadingColumn, mutate } = useSWR(
        params?.code ? '/api/column' : null,
        () => ColumnService.getColumnsByQuery({project: params?.code, sort: DefaultSort.oldest.value})
    )

    const { data: resTaskLabel } = useSWR(
        params?.code ? '/api/task-label' : null,
        () => TaskLabelService.getTaskLabelsByQuery({project: params?.code})
    )

    const { data: resMembers } = useSWR(
        workspace?.id ? '/api/workspace/member' : null,
        () => WorkspaceService.getWorkspaceMember(workspace?.id)
    )

    // const { data: resData, isLoading: loading } = useSWR(
    //     params?.code ? '/api/task' : null,
    //     () => TaskService.getTasksByQuery({project: params?.code}));

    // const columns = useMemo(() => {
    //     console.log(resColumn?.data)
    // }, [resColumn?.data]);
    console.log(workspace, resMembers)
    return (
        <KanbanView
            columnData={resColumn?.data}
            taskLabels={resTaskLabel?.data}
            members={resMembers?.data}
            refresh={() => mutate('/api/column')}/>
    )
}