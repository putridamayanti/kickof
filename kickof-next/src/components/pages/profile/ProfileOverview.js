import {Box, Card, CardContent, Grid2, Stack, Typography} from "@mui/material";

const data = {
    about: [
        { property: 'Full Name', value: 'John Doe', icon: 'tabler:user' },
        { property: 'Status', value: 'active', icon: 'tabler:check' },
        { property: 'Role', value: 'Developer', icon: 'tabler:crown' },
        { property: 'Country', value: 'USA', icon: 'tabler:flag' },
        { property: 'Language', value: 'English', icon: 'tabler:language' }
    ],
    contacts: [
        { property: 'Contact', value: '(123) 456-7890', icon: 'tabler:phone-call' },
        { property: 'Skype', value: 'john.doe', icon: 'tabler:brand-skype' },
        { property: 'Email', value: 'john.doe@example.com', icon: 'tabler:mail' }
    ],
    teams: [
        { property: 'Backend Developer', value: '(126 Members)', icon: 'tabler:brand-github', color: 'primary' },
        { property: 'React Developer', value: '(98 Members)', icon: 'tabler:brand-react', color: 'info' }
    ],
    overview: [
        { property: 'Task Compiled', value: '13.5k', icon: 'tabler:check' },
        { property: 'Connections', value: '897', icon: 'tabler:users' },
        { property: 'Projects Compiled', value: '146', icon: 'tabler:layout-grid' }
    ],
    connections: [
        {
            isFriend: false,
            connections: '45',
            name: 'Cecilia Payne',
            avatar: '/images/avatars/8.png'
        },
        {
            isFriend: true,
            connections: '1.32k',
            name: 'Curtis Fletcher',
            avatar: '/images/avatars/3.png'
        },
        {
            isFriend: true,
            connections: '125',
            name: 'Alice Stone',
            avatar: '/images/avatars/12.png'
        },
        {
            isFriend: false,
            connections: '456',
            name: 'Darrell Barnes',
            avatar: '/images/avatars/7.png'
        },
        {
            isFriend: false,
            connections: '1.2k',
            name: 'Eugenia Moore',
            avatar: '/images/avatars/6.png'
        }
    ],
    teamsTech: [
        {
            members: 72,
            ChipColor: 'error',
            chipText: 'Developer',
            title: 'React Developers',
            avatar: '/images/icons/project-icons/react-label.png'
        },
        {
            members: 122,
            chipText: 'Support',
            ChipColor: 'primary',
            title: 'Support Team',
            avatar: '/images/icons/project-icons/support-label.png'
        },
        {
            members: 7,
            ChipColor: 'info',
            chipText: 'Designer',
            title: 'UI Designer',
            avatar: '/images/icons/project-icons/figma-label.png'
        },
        {
            members: 289,
            ChipColor: 'error',
            chipText: 'Developer',
            title: 'Vue.js Developers',
            avatar: '/images/icons/project-icons/vue-label.png'
        },
        {
            members: 24,
            chipText: 'Marketing',
            ChipColor: 'secondary',
            title: 'Digital Marketing',
            avatar: '/images/icons/project-icons/twitter-label.png'
        }
    ]
};

const renderList = arr => {
    if (arr && arr.length) {
        return arr.map(({icon: Component, ...item}, index) => {
            return (
                <Box
                    key={index}
                    sx={{
                        display: 'flex',
                        '&:not(:last-of-type)': { mb: 3 },
                        '& svg': { color: 'text.secondary' }
                    }}
                >
                    <Box sx={{ display: 'flex', mr: 2 }}>
                        <Component/>
                    </Box>

                    <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                        <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
                            {`${item.property.charAt(0).toUpperCase() + item.property.slice(1)}:`}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                            {item.value.charAt(0).toUpperCase() + item.value.slice(1)}
                        </Typography>
                    </Box>
                </Box>
            )
        })
    } else {
        return null
    }
}

export default function ProfileOverview(props) {
    const { about, contacts, overview } = data

    return (
        <Stack spacing={6}>
            <Card>
                <CardContent>
                    <Box sx={{ mb: 6 }}>
                        <Typography variant='body2' sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}>
                            About
                        </Typography>
                        {renderList(about)}
                    </Box>
                    <Box sx={{ mb: 6 }}>
                        <Typography variant='body2' sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}>
                            Contacts
                        </Typography>
                        {renderList(contacts)}
                    </Box>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <div>
                        <Typography variant='body2' sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}>
                            Overview
                        </Typography>
                        {renderList(overview)}
                    </div>
                </CardContent>
            </Card>
        </Stack>
    )
}