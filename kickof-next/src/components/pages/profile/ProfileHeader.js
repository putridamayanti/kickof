import {Box, Button, Card, CardContent, CardMedia, styled, Typography} from "@mui/material";
import {CalendarTodayRounded, EditRounded, PlaceRounded, WorkRounded} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";

export default function ProfileHeader() {
    const data = {
        coverImage: '/images/background/profile-header.png',
        avatar: '/images/avatar.svg',
        name: 'Jane Doe',
        designation: 'Admin',
        location: 'East Java, Indonesia',
        joinDate: 'September 2024'
    }

    return (
        <Card>
            <CardMedia
                component='img'
                alt='profile-header'
                image={data.coverImage}
                sx={{
                    height: { xs: 150, md: 250 }
                }}
            />
            <CardContent
                sx={{
                    pt: 0,
                    mt: -8,
                    display: 'flex',
                    alignItems: 'flex-end',
                    flexWrap: { xs: 'wrap', md: 'nowrap' },
                    justifyContent: { xs: 'center', md: 'flex-start' }
                }}
            >
                <Image
                    src={data.avatar}
                    alt="avatar"
                    width={108}
                    height={108}
                    style={{
                        background: '#FFFFFF',
                        borderRadius: 10,
                        border: `4px solid #FFFFFF`
                    }}/>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        ml: { xs: 0, md: 6 },
                        alignItems: 'flex-end',
                        flexWrap: ['wrap', 'nowrap'],
                        justifyContent: ['center', 'space-between']
                    }}
                >
                    <Box sx={{ mb: [6, 0], display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}>
                        <Typography variant='h5' sx={{ mb: 2.5 }}>
                            {data.name}
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: ['center', 'flex-start']
                            }}
                        >
                            <Box sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1.5, color: 'text.secondary' } }}>
                                <WorkRounded/>
                                <Typography sx={{ color: 'text.secondary' }}>{data.designation}</Typography>
                            </Box>
                            <Box sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1.5, color: 'text.secondary' } }}>
                                <PlaceRounded/>
                                <Typography sx={{ color: 'text.secondary' }}>{data.location}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 1.5, color: 'text.secondary' } }}>
                                <CalendarTodayRounded/>
                                <Typography sx={{ color: 'text.secondary' }}>Joined {data.joinDate}</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Link href={'/app/profile/update'}>
                        <Button
                            size="small"
                            variant='contained'
                            sx={{ '& svg': { mr: 2 } }}>
                            <EditRounded/>
                            Edit Profile
                        </Button>
                    </Link>
                </Box>
            </CardContent>
        </Card>
    )
}