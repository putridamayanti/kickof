import {Fragment, useState} from "react";
import {Avatar, Badge, Box, Divider, IconButton, Menu, MenuItem, styled, Typography} from "@mui/material";
import {useSelector} from "store";
import {useRouter} from "next/navigation";
import {LogoutRounded, PersonRounded, SettingsRounded} from "@mui/icons-material";
import {removeItem} from "utils/storage";

const MenuItemStyled = styled(MenuItem)(({ theme }) => ({
    '&:hover .MuiBox-root, &:hover .MuiBox-root svg': {
        color: theme.palette.primary.main
    }
}));

const ProfileMenus = [
    {
        title: 'Profile',
        icon: PersonRounded,
        href: '/app/profile'
    },
    {
        title: 'Setting',
        icon: SettingsRounded,
        href: '/profile'
    },
];

export default function Profile() {
    const router = useRouter();
    const { email, name, role } = useSelector(state => state.profile);
    const [anchorEl, setAnchorEl] = useState(null)

    const handleDropdownClose = url => {
        if (url) {
            router.push(url)
        }
        setAnchorEl(null)
    }

    const styles = {
        px: 4,
        py: 1.75,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        color: 'text.primary',
        textDecoration: 'none',
        '& svg': {
            mr: 2.5,
            fontSize: '1.5rem',
            color: 'text.secondary'
        }
    }

    const handleLogout = async () => {
        await removeItem('x-token');
        handleDropdownClose();
        router.push('/');
    }

    return (
        <Fragment>
            <IconButton
                color='inherit'
                aria-haspopup='true'
                onClick={(e) => setAnchorEl(e.currentTarget)}
                aria-controls='customized-menu'>
                <Avatar alt={email} src="/images/avatar.svg" />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => handleDropdownClose()}
                sx={{ '& .MuiMenu-paper': { width: 230, mt: 4.75 } }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Box sx={{ py: 1.75, px: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar alt={email} src="/images/avatar.svg" />
                        <Box sx={{ display: 'flex', ml: 2.5, alignItems: 'flex-start', flexDirection: 'column' }}>
                            <Typography sx={{ fontWeight: 500 }}>{name}</Typography>
                            {role?.name && <Typography variant='body2'>{role?.name}</Typography>}
                        </Box>
                    </Box>
                </Box>
                <Divider sx={{ my: theme => `${theme.spacing(2)} !important` }} />
                {ProfileMenus.map(({icon: Component, ...e}, i) => (
                    <MenuItemStyled key={i} sx={{ p: 0 }} onClick={() => handleDropdownClose(e.href)}>
                        <Box sx={styles}>
                            <Component />
                            {e.title}
                        </Box>
                    </MenuItemStyled>
                ))}
                <Divider sx={{ my: theme => `${theme.spacing(2)} !important` }} />
                <MenuItemStyled sx={{ p: 0 }} onClick={handleLogout}>
                    <Box sx={styles}>
                        <LogoutRounded/>
                        Sign Out
                    </Box>
                </MenuItemStyled>
            </Menu>
        </Fragment>
    )
}