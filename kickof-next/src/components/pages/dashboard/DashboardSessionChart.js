'use client'

import {Box, Card, CardContent, Typography, useTheme} from "@mui/material";
import {HexToRGBA} from "utils/theme";
import ApexChart from "components/chart/ApexChart";

export default function DashboardSessionChart() {
    const theme = useTheme()
    const series = [
        { name: 'Earning', data: [29, 18, 44, 28, 16] },
        { name: 'Expense', data: [-17, -22, -17, -11, -22] }
    ]
    const options = {
        chart: {
            stacked: true,
            parentHeightOffset: 0,
            toolbar: { show: false },
            sparkline: { enabled: true }
        },
        legend: { show: false },
        dataLabels: { enabled: false },
        colors: [HexToRGBA(theme.palette.primary.main, 1), HexToRGBA(theme.palette.success.main, 1)],
        stroke: {
            width: 1,
            curve: 'smooth',
            colors: [theme.palette.background.paper]
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                columnWidth: '40%',
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',
            }
        },
        states: {
            hover: {
                filter: { type: 'none' }
            },
            active: {
                filter: { type: 'none' }
            }
        },
        grid: {
            padding: {
                top: -4,
                right: 1,
                left: -8,
                bottom: -3
            },
            yaxis: {
                lines: { show: false }
            }
        },
        xaxis: {
            labels: { show: false },
            axisTicks: { show: false },
            axisBorder: { show: false }
        },
        yaxis: {
            labels: { show: false }
        },
        responsive: [
            {
                breakpoint: theme.breakpoints.values.xl,
                options: {
                    plotOptions: {
                        bar: { columnWidth: '40%' }
                    }
                }
            },
            {
                breakpoint: 1300,
                options: {
                    plotOptions: {
                        bar: { columnWidth: '50%' }
                    }
                }
            },
            {
                breakpoint: theme.breakpoints.values.lg,
                options: {
                    plotOptions: {
                        bar: { columnWidth: '20%' }
                    }
                }
            },
            {
                breakpoint: theme.breakpoints.values.md,
                options: {
                    plotOptions: {
                        bar: { columnWidth: '25%' }
                    }
                }
            },
            {
                breakpoint: 700,
                options: {
                    plotOptions: {
                        bar: { columnWidth: '30%' }
                    }
                }
            },
            {
                breakpoint: theme.breakpoints.values.sm,
                options: {
                    plotOptions: {
                        bar: { columnWidth: '35%' }
                    }
                }
            }
        ]
    }

    return (
        <Card>
            <CardContent>
                <Typography variant='h5'>Sessions</Typography>
                <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                    This Month
                </Typography>
                <ApexChart type='bar' height={96} series={series} options={options} />
                <Box sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant='h4'>45.1k</Typography>
                    <Typography variant='body2' sx={{ color: 'success.main' }}>
                        +9.41%
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}