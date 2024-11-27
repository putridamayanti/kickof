import useBackgroundColor from "hooks/useBackgroundColor";
import MuiChip from '@mui/material/Chip'
import {hexToRgb, useTheme} from "@mui/material";
import {HexToRGBA} from "utils/theme";

export default function CustomChip(props) {
    const { rounded, color, sx } = props;
    const theme = useTheme();

    const bgColors = useBackgroundColor()

    const colors = {
        primary: { ...bgColors.primaryLight },
        secondary: { ...bgColors.secondaryLight },
        success: { ...bgColors.successLight },
        error: { ...bgColors.errorLight },
        warning: { ...bgColors.warningLight },
        info: { ...bgColors.infoLight }
    }
    const propsToPass = { ...props }
    propsToPass.rounded = undefined

    return (
        <MuiChip
            {...propsToPass}
            variant='filled'
            className={`${rounded && 'MuiChip-rounded'}`}
            sx={{
                ...(color && {
                    background: HexToRGBA(color, 0.12),
                    color: color
                }),
                ...sx
            }}
            // sx={skin === 'light' && color ? Object.assign(colors[color], sx) : sx}
        />
    )
}