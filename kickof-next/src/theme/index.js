import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import components from "theme/components";
import shadows from "theme/shadows";
import typography from "theme/typography";
import palette from "theme/palette";

export default function Theme(props) {
    const { mode, children } = props;
    const options = {
        components: components({skin: 'default'}),
        palette: palette(mode),
        shape: {
            borderRadius: 8
        },
        mixins: {
            toolbar: {
                minHeight: 64
            }
        },
        spacing: factor => `${0.25 * factor}rem`,
        shadows: shadows(mode),
        typography
    };

    const theme = createTheme(options)
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {children}
        </ThemeProvider>
    )
}