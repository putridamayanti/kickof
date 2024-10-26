// ** Util Import
import {HexToRGBA} from "utils/theme";

const Backdrop = () => {
  return {
    MuiBackdrop: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor:
            theme.palette.mode === 'light'
              ? `rgba(${theme.palette.background.paper}, 0.7)`
              : HexToRGBA(theme.palette.background.default, 0.7)
        }),
        invisible: {
          backgroundColor: 'transparent'
        }
      }
    }
  }
}

export default Backdrop
