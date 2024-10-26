'use client'

import {Typography} from "@mui/material";
import {useParams} from "next/navigation";

export default function Home() {
    const params = useParams();

    return (
        <Typography>
            {params?.workspace}
        </Typography>
    )
}