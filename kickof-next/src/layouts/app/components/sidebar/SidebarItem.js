import {Box, Chip, ListItem, ListItemButton, ListItemIcon, styled, Typography} from "@mui/material";
import {HexToRGBA} from "utils/theme";
import Link from "next/link";
import {useParams, usePathname, useRouter} from "next/navigation";
import {CircleRounded} from "@mui/icons-material";
import {useSelector} from "store";

const MenuNavLink = styled(ListItemButton)(({ theme }) => ({
    width: '100%',
    height: 35,
    paddingY: 0,
    borderRadius: theme.shape.borderRadius,
    transition: 'padding-left .25s ease-in-out, padding-right .25s ease-in-out',
    '&:hover': {
        backgroundColor: theme.palette.action.hover
    },
    '&.Mui-selected, &.Mui-selected:hover': {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.action.hover,
    },
    '& .active': {
        background: HexToRGBA(theme.palette.primary.main, 0.68)
    }
}));

const MenuItemTextMetaWrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    justifyContent: 'space-between',
    transition: 'opacity .25s ease-in-out',
    // ...(themeConfig.menuTextTruncate && { overflow: 'hidden' })
}))

export default function SidebarItem(props) {
    const { item, parent, themeConfig } = props;
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const {project} = useSelector(state => state.app);

    const Icon = item?.icon;
    const href = item.href === undefined ? '/' : project?.id
        ? `/app/${params.workspace}/project/${project?.code}/${item.href}`
        : `/app/${params.workspace}${item.href}`
    const isNavLinkActive = () => {
        return pathname === `/app/${params.workspace}${item.href}`;
    }
    return (
        <ListItem sx={{
            ...(parent ? { p: 0 } : { mt: 0 })
        }}>
            <MenuNavLink
                component={Link}
                {...(item.disabled && { tabIndex: -1 })}
                className={isNavLinkActive() ? 'active' : ''}
                href={href}
                {...(item.openInNewTab ? { target: '_blank' } : null)}
                onClick={e => {
                    if (item.href === undefined) {
                        e.preventDefault()
                        e.stopPropagation()
                    }
                    // if (navVisible) {
                    //     toggleNavVisibility()
                    // }
                }}
                sx={{
                    // py: 2,
                    ...(item.disabled ? { pointerEvents: 'none' } : { cursor: 'pointer' }),
                    ...(parent && { pl: 4, py: 0 }),
                    // px: navCollapsed && !navHover ? (collapsedNavWidth - navigationBorderWidth - 22 - 28) / 8 : 4,
                    '& .MuiTypography-root, & svg': {
                        color: 'text.secondary'
                    }
                }}
            >
                <ListItemIcon
                    sx={{
                        minWidth: themeConfig.sidebarIconWidth,
                        transition: 'margin .25s ease-in-out',
                        // ...(navCollapsed && !navHover ? { mr: 0 } : { mr: 2 }),
                        // ...(parent ? { ml: 1.5, mr: 3.5 } : {}),
                        '& svg': {
                            fontSize: themeConfig.sidebarIconSize,
                            // ...(!parent ? { fontSize: themeConfig.sidebarCircleIconSize } : {}),
                            ...(parent ? { fontSize: themeConfig.sidebarCircleIconSize } : {})
                        }
                    }}>
                    {item.icon ? <Icon/> : <CircleRounded/>}
                </ListItemIcon>
                <MenuItemTextMetaWrapper
                    sx={{
                        // ...(isSubToSub ? { ml: 2 } : {}),
                        // ...(navCollapsed && !navHover ? { opacity: 0 } : { opacity: 1 })
                    }}
                >
                    <Typography noWrap={true} sx={{ fontSize: 13 }}>
                        {item.title}
                    </Typography>
                    {item.badgeContent ? (
                        <Chip
                            size='small'
                            label={item.badgeContent}
                            color={item.badgeColor || 'primary'}
                            sx={{ height: 22, minWidth: 22, '& .MuiChip-label': { px: 1.5, textTransform: 'capitalize' } }}
                        />
                    ) : null}
                </MenuItemTextMetaWrapper>
            </MenuNavLink>
        </ListItem>
    )
}