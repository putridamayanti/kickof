'use client'

import {
    Avatar,
    Badge,
    Box,
    Button,
    Icon,
    IconButton,
    Menu,
    MenuItem,
    styled,
    Typography,
    useMediaQuery
} from "@mui/material";
import {Fragment, useState} from "react";
import CustomChip from "components/chip/CustomChip";
import {NotificationsRounded} from "@mui/icons-material";

const ScrollWrapper = styled(Box)(() => ({
    height: 385,
    overflowY: 'auto'
}));

const MenuItemTitle = styled(Typography)({
    fontWeight: 500,
    flex: '1 1 100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
})

const MenuItemSubtitle = styled(Typography)({
    flex: '1 1 100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
})

const notifications = [
    {
        meta: 'Today',
        avatarAlt: 'Flora',
        title: 'Congratulation Flora! 🎉',
        avatarImg: '/images/avatars/4.png',
        subtitle: 'Won the monthly best seller badge'
    },
    {
        meta: 'Yesterday',
        avatarColor: 'primary',
        subtitle: '5 hours ago',
        avatarText: 'Robert Austin',
        title: 'New user registered.'
    },
    {
        meta: '11 Aug',
        avatarAlt: 'message',
        title: 'New message received 👋🏻',
        avatarImg: '/images/avatars/5.png',
        subtitle: 'You have 10 unread messages'
    },
    {
        meta: '25 May',
        title: 'Paypal',
        avatarAlt: 'paypal',
        subtitle: 'Received Payment',
        avatarImg: '/images/misc/paypal.png'
    },
    {
        meta: '19 Mar',
        avatarAlt: 'order',
        title: 'Received Order 📦',
        avatarImg: '/images/avatars/3.png',
        subtitle: 'New order received from John'
    },
    {
        meta: '27 Dec',
        avatarAlt: 'chart',
        subtitle: '25 hrs ago',
        avatarImg: '/images/misc/chart.png',
        title: 'Finance report has been generated'
    }
]

const shortcuts = [
    {
        title: 'Calendar',
        url: '/apps/calendar',
        icon: 'tabler:calendar',
        subtitle: 'Appointments'
    },
    {
        title: 'Invoice App',
        url: '/apps/invoice/list',
        icon: 'tabler:file-invoice',
        subtitle: 'Manage Accounts'
    },
    {
        title: 'User App',
        icon: 'tabler:users',
        url: '/apps/user/list',
        subtitle: 'Manage Users'
    },
    {
        url: '/apps/roles',
        icon: 'tabler:lock',
        subtitle: 'Permissions',
        title: 'Role Management'
    },
    {
        subtitle: 'CRM',
        title: 'Dashboard',
        url: '/dashboards/crm',
        icon: 'tabler:device-analytics'
    },
    {
        title: 'Settings',
        icon: 'tabler:settings',
        subtitle: 'Account Settings',
        url: '/pages/account-settings/account'
    },
    {
        icon: 'tabler:help',
        title: 'Help Center',
        url: '/pages/help-center',
        subtitle: 'FAQs & Articles'
    },
    {
        title: 'Dialogs',
        icon: 'tabler:square',
        subtitle: 'Useful Popups',
        url: '/pages/dialog-examples'
    }
]

export default function NotificationDropdown() {
    const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))
    const [anchorEl, setAnchorEl] = useState(null)

    return (
        <Fragment>
            <IconButton color='inherit' aria-haspopup='true' onClick={(e) => setAnchorEl(e.currentTarget)} aria-controls='customized-menu'>
                <Badge
                    color='error'
                    variant='dot'
                    invisible={!notifications.length}
                    sx={{
                        '& .MuiBadge-badge': { top: 4, right: 4, boxShadow: theme => `0 0 0 2px ${theme.palette.background.paper}` }
                    }}
                >
                    <NotificationsRounded fontSize='1.625rem' icon='tabler:bell' />
                </Badge>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
                <MenuItem
                    disableRipple
                    disableTouchRipple
                    sx={{ cursor: 'default', userSelect: 'auto', backgroundColor: 'transparent !important' }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <Typography variant='h5' sx={{ cursor: 'text' }}>
                            Notifications
                        </Typography>
                        <CustomChip skin='light' size='small' color='primary' label={`${notifications.length} New`} />
                    </Box>
                </MenuItem>
                <ScrollWrapper>
                    {notifications.map((notification, index) => (
                        <MenuItem key={index} disableRipple disableTouchRipple onClick={() => setAnchorEl(null)}>
                            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                <Avatar
                                    src={notification.avatar}
                                    alt={notification.avatar}
                                    sx={{width: 48, height: 48,}}/>
                                <Box sx={{ mr: 4, ml: 2.5, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                                    <MenuItemTitle>{notification.title}</MenuItemTitle>
                                    <MenuItemSubtitle variant='body2'>{notification.subtitle}</MenuItemSubtitle>
                                </Box>
                                <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                                    {notification.meta}
                                </Typography>
                            </Box>
                        </MenuItem>
                    ))}
                </ScrollWrapper>
                <MenuItem
                    disableRipple
                    disableTouchRipple
                    sx={{
                        borderBottom: 0,
                        cursor: 'default',
                        userSelect: 'auto',
                        backgroundColor: 'transparent !important',
                        borderTop: theme => `1px solid ${theme.palette.divider}`
                    }}
                >
                    <Button fullWidth variant='contained' onClick={() => setAnchorEl(null)}>
                        Read All Notifications
                    </Button>
                </MenuItem>
            </Menu>
        </Fragment>
    )
}