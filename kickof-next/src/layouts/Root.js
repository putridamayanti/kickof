'use client'

import {usePathname} from "next/navigation";
import {useSelector} from "store";
import {CssBaseline, ThemeProvider} from "@mui/material";
import Theme from "theme";
import AppLayout from "layouts/app";
import AuthLayout from "layouts/auth";

export default function RootApp({ children }) {
    const pathname = usePathname();
    const themeSetting = useSelector(state => state.theme);
    // const theme = useMemo(() => BuildTheme(themeSetting.activeMode), [themeSetting.activeMode]);
    //
    let Layout = AppLayout;

    if (pathname === '/' || pathname === '/register') {
        Layout = AuthLayout;
    }

    // useEffect(() => {
    //     getIp();
    // }, []);

    return (
        <Theme mode={themeSetting.mode}>
            <Layout>
                {children}
            </Layout>
        </Theme>
    )
}