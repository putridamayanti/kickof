'use client'

import {Avatar, Box, Card, CardContent, CardHeader, styled, Typography} from "@mui/material";
import MuiTimeline from '@mui/lab/Timeline'
import {DocumentScannerRounded, FormatListBulletedRounded, Grid3x3Rounded} from "@mui/icons-material";
import OptionMenu from "components/menu/OptionMenu";
import {TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator} from "@mui/lab";

const Timeline = styled(MuiTimeline)({
    '& .MuiTimelineItem-root': {
        width: '100%',
        '&:before': {
            display: 'none'
        }
    }
})

export default function ProfileActivity() {
    return (
        <Card>
            <CardHeader
                title='Activity Timeline'
                sx={{ '& .MuiCardHeader-avatar': { mr: 3 } }}
                titleTypographyProps={{ sx: { color: 'text.primary' } }}
                avatar={<FormatListBulletedRounded/>}
                action={
                    <OptionMenu
                        iconButtonProps={{ size: 'small', sx: { color: 'text.disabled' } }}
                        options={['Share timeline', 'Suggest edits', { divider: true }, 'Report bug']}
                    />
                }
            />
            <CardContent>
                <Timeline>
                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineDot color='warning' />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ mt: 0, mb: theme => `${theme.spacing(2)} !important` }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Typography variant='h6' sx={{ mr: 2 }}>
                                    Client Meeting
                                </Typography>
                                <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                                    Today
                                </Typography>
                            </Box>
                            <Typography variant='body2' sx={{ mb: 3 }}>
                                Project meeting with john @10:15am
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar src='/images/avatar.svg' sx={{ mr: 3, width: 38, height: 38 }} />
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant='body2' sx={{ fontWeight: 500, color: 'text.primary' }}>
                                        Lester McCarthy (Client)
                                    </Typography>
                                    <Typography variant='caption'>CEO of Infibeam</Typography>
                                </Box>
                            </Box>
                        </TimelineContent>
                    </TimelineItem>

                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineDot color='primary' />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ mt: 0 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Typography variant='h6' sx={{ mr: 2 }}>
                                    Create a new project for client
                                </Typography>
                                <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                                    2 Days Ago
                                </Typography>
                            </Box>
                            <Typography variant='body2'>Add files to new design folder</Typography>
                        </TimelineContent>
                    </TimelineItem>

                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineDot color='info' />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ mt: 0, mb: theme => `${theme.spacing(2)} !important` }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Typography variant='h6' sx={{ mr: 2 }}>
                                    Shared 2 New Project Files
                                </Typography>
                                <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                                    6 Days Ago
                                </Typography>
                            </Box>
                            <Typography variant='body2' sx={{ mb: 3 }}>
                                Sent by Mollie Dixon
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ mr: 3, display: 'flex', alignItems: 'center', '& svg': { color: 'warning.main' } }}>
                                    <DocumentScannerRounded/>
                                    <Typography variant='body2' sx={{ ml: 2, fontWeight: 500, color: 'text.primary' }}>
                                        App Guidelines
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { color: 'success.main' } }}>
                                    <Grid3x3Rounded/>
                                    <Typography variant='body2' sx={{ ml: 2, fontWeight: 500, color: 'text.primary' }}>
                                        Testing Results
                                    </Typography>
                                </Box>
                            </Box>
                        </TimelineContent>
                    </TimelineItem>

                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineDot color='secondary' />
                        </TimelineSeparator>
                        <TimelineContent sx={{ mt: 0 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Typography variant='h6' sx={{ mr: 2 }}>
                                    Project status updated
                                </Typography>
                                <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                                    10 Days Ago
                                </Typography>
                            </Box>
                            <Typography variant='body2'>Woocommerce iOS App Completed</Typography>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>
            </CardContent>
        </Card>
    )
}