// ** Util Import
import {HexToRGBA} from "utils/theme";

const List = () => {
  return {
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          paddingLeft: theme.spacing(5),
          paddingRight: theme.spacing(5),
          '&:hover': {
            backgroundColor: HexToRGBA(theme.palette.primary.main, 0.08),
            '& .MuiListItemIcon-root, & .MuiListItemText-primary, & .MuiListItemText-secondary, & .MuiListItemSecondaryAction-root .MuiIconButton-root':
              {
                // color: theme.palette.primary.main
              }
          },
          // '&.Mui-selected, &.Mui-selected:hover': {
          //   color: theme.palette.common.white,
          //   backgroundColor: theme.palette.primary.main,
          //   '& .MuiListItemIcon-root, & .MuiListItemText-primary, & .MuiListItemText-secondary, & .MuiListItemSecondaryAction-root .MuiIconButton-root':
          //     {
          //       color: theme.palette.common.white
          //     }
          // },
          '&.active': {
            '&, &:hover': {
              boxShadow: `0px 2px 6px ${HexToRGBA(theme.palette.primary.main, 0.2)}`,
              background: `linear-gradient(84.47deg, ${
                  theme.direction === 'ltr' ? theme.palette.primary.main : HexToRGBA(theme.palette.primary.main, 0.7)
              } 22.16%, ${
                  theme.direction === 'ltr' ? HexToRGBA(theme.palette.primary.main, 0.7) : theme.palette.primary.main
              } 76.47%)`,
              '&.Mui-focusVisible': {
                background: `linear-gradient(72.47deg, ${theme.palette.primary.dark} 22.16%, ${HexToRGBA(
                    theme.palette.primary.dark,
                    0.7
                )} 76.47%)`
              }
            },
            '&:hover': {
              background: theme.palette.primary.main,
            },
            '& .MuiTypography-root, & svg': {
              color: `${theme.palette.common.white} !important`
            }
          }
        })
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: ({ theme }) => ({
          minWidth: '0 !important',
          marginRight: theme.spacing(2.25),
          color: theme.palette.text.primary
        })
      }
    },
    MuiListItemAvatar: {
      styleOverrides: {
        root: ({ theme }) => ({
          minWidth: 0,
          marginRight: theme.spacing(4)
        })
      }
    },
    MuiListItemText: {
      styleOverrides: {
        root: ({ theme }) => ({
          marginTop: theme.spacing(0.5),
          marginBottom: theme.spacing(0.5)
        }),
        dense: ({ theme }) => ({
          '& .MuiListItemText-primary': {
            color: theme.palette.text.primary
          }
        })
      }
    },
    MuiListSubheader: {
      styleOverrides: {
        root: ({ theme }) => ({
          textTransform: 'uppercase',
          color: theme.palette.text.disabled
        })
      }
    }
  }
}

export default List
