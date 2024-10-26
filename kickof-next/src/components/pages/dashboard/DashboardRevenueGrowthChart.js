'use client'

import {Box, Card, CardContent, Typography, useTheme} from "@mui/material";
import {HexToRGBA} from "utils/theme";
import CustomChip from "components/chip/CustomChip";
import ApexChart from "components/chart/ApexChart";

export default function DashboardRevenueGrowthChart() {
    const theme = useTheme()
    const series = [{ data: [32, 52, 72, 94, 116, 94, 72] }]

    const options = {
        chart: {
            parentHeightOffset: 0,
            toolbar: { show: false }
        },
        plotOptions: {
            bar: {
                borderRadius: 6,
                distributed: true,
                columnWidth: '42%',
                endingShape: 'rounded',
                startingShape: 'rounded'
            }
        },
        legend: { show: false },
        tooltip: { enabled: false },
        dataLabels: { enabled: false },
        colors: [
            HexToRGBA(theme.palette.success.main, 0.16),
            HexToRGBA(theme.palette.success.main, 0.16),
            HexToRGBA(theme.palette.success.main, 0.16),
            HexToRGBA(theme.palette.success.main, 0.16),
            HexToRGBA(theme.palette.success.main, 1),
            HexToRGBA(theme.palette.success.main, 0.16),
            HexToRGBA(theme.palette.success.main, 0.16)
        ],
        states: {
            hover: {
                filter: { type: 'none' }
            },
            active: {
                filter: { type: 'none' }
            }
        },
        grid: {
            show: false,
            padding: {
                top: -4,
                left: -7,
                right: -5,
                bottom: -12
            }
        },
        xaxis: {
            categories: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            axisTicks: { show: false },
            axisBorder: { show: false },
            tickPlacement: 'on',
            labels: {
                style: {
                    colors: theme.palette.text.disabled,
                    fontFamily: theme.typography.fontFamily,
                    fontSize: theme.typography.body2.fontSize
                }
            }
        },
        yaxis: { show: false }
    }

    return (
        <Card>
            <CardContent>
                <Box sx={{ gap: 2, display: 'flex', alignItems: 'stretch', justifyContent: 'space-between' }}>
                    <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                            <Typography variant='h5' sx={{ mb: 2 }}>
                                Revenue Growth
                            </Typography>
                            <Typography variant='body2'>Weekly Report</Typography>
                        </div>
                        <div>
                            <Typography variant='h3' sx={{ mb: 2 }}>
                                $4,673
                            </Typography>
                            <CustomChip rounded size='small' skin='light' color='success' label='+15.2%' />
                        </div>
                    </Box>
                    <ApexChart type='bar' width={160} height={170} series={series} options={options} />
                </Box>
            </CardContent>
        </Card>
    )
}