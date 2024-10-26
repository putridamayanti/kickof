import useBackgroundColor from "hooks/useBackgroundColor";

export default function CustomChip(props) {
    const { sx } = props;

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
}