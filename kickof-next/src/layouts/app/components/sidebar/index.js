'use client'

import {
    Box,
    Card,
    CardContent,
    Drawer, FormLabel,
    IconButton,
    List,
    ListItem, Select,
    styled,
    Typography,
    useMediaQuery
} from "@mui/material";
import Logo from "components/shared/Logo";
import {useDispatch, useSelector} from "store";
import {CloseRounded} from "@mui/icons-material";
import Link from "next/link";
import Menus, {ProjectMenus} from "constants/menus";
import SidebarItem from "layouts/app/components/sidebar/SidebarItem";
import SidebarGroup from "layouts/app/components/sidebar/SidebarGroup";
import SidebarItems from "layouts/app/components/sidebar/SidebarItems";
import {ThemeActions} from "store/slices/ThemeSlice";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import {useParams, useRouter} from "next/navigation";

const MenuHeaderWrapper = styled(Box)(({ theme, width }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: theme.spacing(3.5),
    paddingLeft: theme.spacing(3.5),
    transition: 'padding .25s ease-in-out',
    minHeight: theme.mixins.toolbar.minHeight
}))
export default function Sidebar() {
    const dispatch = useDispatch();
    const router = useRouter();
    const params = useParams();
    const themeConfig = useSelector(state => state.theme);
    const {project, projects, workspace} = useSelector(state => state.app);
    const smDown = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const { sidebarWidth, isSidebarCollapsed } = useSelector(state => state.theme);
    const variant = isSidebarCollapsed ? 'persistent' : smDown ? 'temporary' : 'permanent';

    return (
        <Drawer
            open={!isSidebarCollapsed}
            variant={variant}
            sx={{
                width: isSidebarCollapsed ? 0 : sidebarWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    border: 'none',
                    boxShadow: 2,
                },
            }}>
            <MenuHeaderWrapper width={sidebarWidth}>
                <Link href={'/'}>
                    <Logo/>
                </Link>
                {smDown && (
                    <IconButton onClick={() => dispatch(ThemeActions.setSidebarCollapse(!isSidebarCollapsed))}>
                        <CloseRounded/>
                    </IconButton>
                )}
            </MenuHeaderWrapper>
            {params?.code && (
                <>
                    <Divider/>
                    <Box sx={{ maxWidth: sidebarWidth, padding: '5px 10px 15px 10px' }}>
                        <FormLabel sx={{ fontSize: 9 }}>Current Project</FormLabel>
                        <Select
                            fullWidth
                            size="small"
                            onChange={(e) =>
                                router.push(`/app/${workspace?.code}/project/${e.target.value}`)}
                            value={params?.code}
                            sx={{
                                // height: 25,
                                borderRadius: 1,
                                fontSize: 13,
                                '& .MuiSelect-select': {
                                    paddingRight: '0 !important'
                                }
                            }}>
                            {projects.map((e, i) => (
                                <MenuItem key={i} value={e.code}>{e.name}</MenuItem>
                            ))}
                        </Select>
                    </Box>
                    <Divider/>
                </>
            )}
            <List sx={{ pt: 3, '& > :first-of-type': { mt: '0' } }}>
                <SidebarItems
                    themeConfig={themeConfig}
                    items={project?.id ? ProjectMenus : Menus}/>
            </List>
        </Drawer>
    )
}