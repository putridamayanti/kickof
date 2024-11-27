'use client'

import {Typography} from "@mui/material";
import {useParams} from "next/navigation";
import KanbanView from "components/pages/task/KanbanView";
import useSWR from "swr";
import TaskService from "services/TaskService";
import StateService from "services/StateService";
import {useMemo} from "react";
import TaskLabelService from "services/TaskLabelService";
import {DefaultSort} from "constants/constants";
import {useSelector} from "store";
import WorkspaceService from "services/WorkspaceService";

export default function Project() {
    const { workspace, project } = useSelector(state => state.app);

    const { data: resState, isLoading: loadingColumn, mutate } = useSWR(
        project?.id ? '/api/state' : null,
        () => StateService.getStatesByQuery({project: project?.id, sort: DefaultSort.oldest.value})
    )

    const { data: resTaskLabel } = useSWR(
        project?.id ? '/api/task-label' : null,
        () => TaskLabelService.getTaskLabelsByQuery({project: project?.id})
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

    return (
        <KanbanView
            states={resState?.data?.data}
            taskLabels={resTaskLabel?.data}
            members={resMembers?.data}
            refresh={() => mutate('/api/state')}/>
    )
}