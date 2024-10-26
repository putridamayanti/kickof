import {
    Box,
    Card,
    CardContent,
    Chip,
    Collapse,
    ListItem,
    ListItemButton,
    ListItemIcon,
    styled,
    Typography
} from "@mui/material";
import {useDispatch, useSelector} from "store";
import SidebarItems from "layouts/app/components/sidebar/SidebarItems";
import {ChevronRightRounded} from "@mui/icons-material";
import {ThemeActions} from "store/slices/ThemeSlice";
import {HexToRGBA} from "utils/theme";

const MenuItemTextWrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    justifyContent: 'space-between',
    transition: 'opacity .25s ease-in-out',
    // ...(themeConfig.menuTextTruncate && { overflow: 'hidden' })
}))

const MenuNavLink = styled(ListItemButton)(({ theme }) => ({
    width: '100%',
    height: 45,
    borderRadius: theme.shape.borderRadius,
    transition: 'padding-left .25s ease-in-out, padding-right .25s ease-in-out',
    '&:hover': {
        backgroundColor: theme.palette.action.hover
    },
}));

export default function SidebarGroup(props) {
    const { item, parent, themeConfig } = props;
    const Icon = item?.icon;
    const { groupActive } = useSelector(state => state.theme);
    const dispatch = useDispatch();
    const menuGroupCollapsedStyles = { opacity: 1 };

    const handleGroupClick = () => {
        if (groupActive.includes(item.title)) {
            dispatch(ThemeActions.removeGroupActive(item.title));
        } else {
            dispatch(ThemeActions.addGroupActive(item.title));
        }
        // const openGroup = groupActive
        // if (verticalNavToggleType === 'collapse') {
        //     if (openGroup.includes(item.title)) {
        //         openGroup.splice(openGroup.indexOf(item.title), 1)
        //     } else {
        //         openGroup.push(item.title)
        //     }
        //     setGroupActive([...openGroup])
        // } else {
        //     toggleActiveGroup(item, parent)
        // }
    }

    return (
        <ListItem
            disablePadding
            className='nav-group'
            onClick={handleGroupClick}
            sx={{ mt: 1, px: '16px !important', flexDirection: 'column' }}>
            <MenuNavLink className={`${groupActive.includes(item.title) && 'Mui-selected'}`}>
                <ListItemIcon
                    sx={{
                        minWidth: themeConfig.sidebarIconWidth,
                        transition: 'margin .25s ease-in-out',
                        // ...(parent ? {} : { mr: 2 }),
                        // ...(navCollapsed && !navHover ? { mr: 0 } : {}),
                        '& svg': {
                            fontSize: themeConfig.sidebarIconSize,
                            ...(parent ? { fontSize: themeConfig.sidebarCircleIconSize } : {})
                        },
                        // ...(parent && item.children ? { ml: 1.5, mr: 3.5 } : {})
                    }}
                >
                    <Icon/>
                </ListItemIcon>
                <MenuItemTextWrapper sx={{ ...menuGroupCollapsedStyles }}>
                    <Typography variant="subtitle2" noWrap={true} sx={{ fontSize: 13 }}>
                        {item.title}
                    </Typography>
                    <Box
                        className='menu-item-meta'
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            '& svg': {
                                color: 'text.disabled',
                                transition: 'transform .25s ease-in-out',
                                ...(groupActive.includes(item.title) && {
                                    transform: 'rotate(-90deg)'
                                })
                            }
                        }}
                    >
                        {item.badgeContent ? (
                            <Chip
                                size='small'
                                label={item.badgeContent}
                                color={item.badgeColor || 'primary'}
                                sx={{
                                    mr: 2,
                                    height: 22,
                                    minWidth: 22,
                                    '& .MuiChip-label': { px: 1.5, textTransform: 'capitalize' }
                                }}
                            />
                        ) : null}
                        <ChevronRightRounded/>
                    </Box>
                </MenuItemTextWrapper>
            </MenuNavLink>
            <Collapse
                component='ul'
                onClick={e => e.stopPropagation()}
                in={groupActive.includes(item.title)}
                sx={{
                    pl: 0,
                    pt: 0.5,
                    width: '100%',
                    ...menuGroupCollapsedStyles,
                    transition: 'all 0.25s ease-in-out'
                }}
            >
                <SidebarItems
                    {...props}
                    parent={item}
                    // navVisible={navVisible}
                    items={item.children}
                    // isSubToSub={parent && item.children ? item : undefined}
                />
            </Collapse>
        </ListItem>
    )
}