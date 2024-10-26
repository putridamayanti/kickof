import {Stack} from "@mui/material";
import NotificationDropdown from "components/shared/NotificationDropdown";
import Profile from "components/shared/Profile";

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
export default function AppNavbarContent() {
    return (
        <Stack spacing={1} direction="row" alignItems="center">
            {/*<Language />*/}
            <NotificationDropdown notifications={notifications}/>
            <Profile />
            {/*<Mode/>*/}
        </Stack>
    )
}