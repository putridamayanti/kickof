'use client'

import {useState} from "react";
import {Avatar, Box, Card, CardContent, CardHeader, Tab, Typography, useTheme} from "@mui/material";
import {HexToRGBA} from "utils/theme";
import OptionMenu from "components/menu/OptionMenu";
import {TabContext, TabList, TabPanel} from '@mui/lab';
import {
    AddRounded,
    BarChartRounded,
    CreditCardRounded,
    MoneyRounded,
    PieChartRounded,
    ShoppingCartRounded
} from "@mui/icons-material";
import ApexChart from "components/chart/ApexChart";
import CustomAvatar from "components/CustomAvatar";

const tabData = [
    {
        type: 'orders',
        avatarIcon: ShoppingCartRounded,
        series: [{ data: [28, 10, 45, 38, 15, 30, 35, 28, 8] }]
    },
    {
        type: 'sales',
        avatarIcon: BarChartRounded,
        series: [{ data: [35, 25, 15, 40, 42, 25, 48, 8, 30] }]
    },
    {
        type: 'profit',
        avatarIcon: MoneyRounded,
        series: [{ data: [10, 22, 27, 33, 42, 32, 27, 22, 8] }]
    },
    {
        type: 'income',
        avatarIcon: PieChartRounded,
        series: [{ data: [5, 9, 12, 18, 20, 25, 30, 36, 48] }]
    },
    {
        type: 'expense',
        avatarIcon: CreditCardRounded,
        series: [{ data: [5, 9, 12, 18, 20, 25, 30, 36, 48] }]
    }
]

const renderTabs = (value, theme) => {
    return tabData.map(({avatarIcon: Component, ...item}, index) => {
        const RenderAvatar = item.type === value ? CustomAvatar : Avatar

        return (
            <Tab
                key={index}
                value={item.type}
                label={
                    <Box
                        sx={{
                            width: 110,
                            height: 94,
                            borderWidth: 1,
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: '10px',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            borderStyle: item.type === value ? 'solid' : 'dashed',
                            borderColor: item.type === value ? theme.palette.primary.main : theme.palette.divider
                        }}
                    >
                        <RenderAvatar
                            variant='rounded'
                            {...(item.type === value && { skin: 'light' })}
                            sx={{ mb: 2, width: 34, height: 34, ...(item.type !== value && { backgroundColor: 'action.selected' }) }}
                        >
                            <Component />
                        </RenderAvatar>
                        <Typography sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
                            {item.type}
                        </Typography>
                    </Box>
                }
            />
        )
    })
}

const renderTabPanels = (value, theme, options, colors) => {
    return tabData.map((item, index) => {
        const max = Math.max(...item.series[0].data)
        const seriesIndex = item.series[0].data.indexOf(max)
        const finalColors = colors.map((color, i) => (seriesIndex === i ? HexToRGBA(theme.palette.primary.main, 1) : color))

        return (
            <TabPanel key={index} value={item.type}>
                <ApexChart type='bar' height={263} options={{ ...options, colors: finalColors }} series={item.series} />
            </TabPanel>
        )
    })
}

export default function DashboardEarningChart() {
    const [value, setValue] = useState('orders')
    const theme = useTheme()

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    const colors = Array(9).fill(HexToRGBA(theme.palette.primary.main, 0.16))

    const options = {
        chart: {
            parentHeightOffset: 0,
            toolbar: { show: false }
        },
        plotOptions: {
            bar: {
                borderRadius: 6,
                distributed: true,
                columnWidth: '35%',
                startingShape: 'rounded',
                dataLabels: { position: 'top' }
            }
        },
        legend: { show: false },
        tooltip: { enabled: false },
        dataLabels: {
            offsetY: -15,
            formatter: val => `${val}k`,
            style: {
                fontWeight: 500,
                colors: [theme.palette.text.secondary],
                fontSize: theme.typography.body1.fontSize
            }
        },
        colors,
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
                top: 20,
                left: -5,
                right: -8,
                bottom: -12
            }
        },
        xaxis: {
            axisTicks: { show: false },
            axisBorder: { color: theme.palette.divider },
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            labels: {
                style: {
                    colors: theme.palette.text.disabled,
                    fontFamily: theme.typography.fontFamily,
                    fontSize: theme.typography.body2.fontSize
                }
            }
        },
        yaxis: {
            labels: {
                offsetX: -15,
                formatter: val => `$${val}k`,
                style: {
                    colors: theme.palette.text.disabled,
                    fontFamily: theme.typography.fontFamily,
                    fontSize: theme.typography.body2.fontSize
                }
            }
        },
        responsive: [
            {
                breakpoint: theme.breakpoints.values.sm,
                options: {
                    plotOptions: {
                        bar: { columnWidth: '60%' }
                    },
                    grid: {
                        padding: { right: 20 }
                    }
                }
            }
        ]
    }

    return (
        <Card>
            <CardHeader
                title='Earning Reports'
                subheader='Yearly Earnings Overview'
                action={
                    <OptionMenu
                        options={['Last Week', 'Last Month', 'Last Year']}
                        iconButtonProps={{ size: 'small', sx: { color: 'text.disabled' } }}
                    />
                }
            />
            <CardContent sx={{ '& .MuiTabPanel-root': { p: 0 } }}>
                <TabContext value={value}>
                    <TabList
                        variant='scrollable'
                        scrollButtons='auto'
                        onChange={handleChange}
                        aria-label='earning report tabs'
                        sx={{
                            border: '0 !important',
                            '& .MuiTabs-indicator': { display: 'none' },
                            '& .MuiTab-root': { p: 0, minWidth: 0, borderRadius: '10px', '&:not(:last-child)': { mr: 4 } }
                        }}
                    >
                        {renderTabs(value, theme)}
                    </TabList>
                    {renderTabPanels(value, theme, options, colors)}
                </TabContext>
            </CardContent>
        </Card>
    )
}