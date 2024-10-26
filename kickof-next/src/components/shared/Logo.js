import {Stack} from "@mui/material";
import Image from "next/image";

export default function Logo() {
    return (
        <Stack justifyContent="center" alignItems="center">
            <Image
                src="/images/logos/logo.svg"
                alt="logo"
                width={140}
                height={50}
                priority/>
        </Stack>
    )
}