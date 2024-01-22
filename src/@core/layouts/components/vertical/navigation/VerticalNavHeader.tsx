// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import { styled, useTheme } from '@mui/material/styles'

// ** Type Import
import { LayoutProps } from 'src/@core/layouts/types'

// ** Custom Icon Import
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'
import List from "@mui/material/List";
import {ListItemText, ListSubheader} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import {useState} from "react";
import Collapse from "@mui/material/Collapse";
import {useRouter} from "next/router";

interface Props {
  navHover: boolean
  collapsedNavWidth: number
  hidden: LayoutProps['hidden']
  navigationBorderWidth: number
  toggleNavVisibility: () => void
  settings: LayoutProps['settings']
  saveSettings: LayoutProps['saveSettings']
  navMenuBranding?: LayoutProps['verticalLayoutProps']['navMenu']['branding']
  menuLockedIcon?: LayoutProps['verticalLayoutProps']['navMenu']['lockedIcon']
  menuUnlockedIcon?: LayoutProps['verticalLayoutProps']['navMenu']['unlockedIcon']
}

// ** Styled Components
const MenuHeaderWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  overflow: 'hidden',
  alignItems: 'center',
  marginTop: theme.spacing(3),
  paddingRight: theme.spacing(5),
  justifyContent: 'space-between',
  transition: 'padding .25s ease-in-out',
  minHeight: theme.mixins.toolbar.minHeight
}))

const LinkStyled = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none'
})

type listItem = {
  product: boolean
  category: boolean
}

const VerticalNavHeader = (props: Props) => {
  const [openList, setOpenList] = useState<listItem>({} as listItem)
  const router = useRouter()

  // ** Props
  const {
    hidden,
    navHover,
    settings,
    saveSettings,
    collapsedNavWidth,
    toggleNavVisibility,
    navigationBorderWidth,
    menuLockedIcon: userMenuLockedIcon,
    navMenuBranding: userNavMenuBranding,
    menuUnlockedIcon: userMenuUnlockedIcon
  } = props

  // ** Hooks & Vars
  const theme = useTheme()
  const { skin, direction, navCollapsed } = settings

  const menuCollapsedStyles = navCollapsed && !navHover ? { opacity: 0 } : { opacity: 1 }

  const handleOpenList = (listName: keyof listItem) => {
    setOpenList({...openList, [listName]: !openList[listName]})
  }

  const handleButtonClick = () => {
    if (hidden) {
      toggleNavVisibility()
    } else {
      saveSettings({ ...settings, navCollapsed: !navCollapsed })
    }
  }

  const menuHeaderPaddingLeft = () => {
    if (navCollapsed && !navHover) {
      if (userNavMenuBranding) {
        return 0
      } else {
        return (collapsedNavWidth - navigationBorderWidth - 22) / 8
      }
    } else {
      return 8
    }
  }

  const svgRotationDeg = () => {
    if (navCollapsed) {
      if (direction === 'rtl') {
        if (navHover) {
          return 0
        } else {
          return 180
        }
      } else {
        if (navHover) {
          return 180
        } else {
          return 0
        }
      }
    } else {
      if (direction === 'rtl') {
        return 180
      } else {
        return 0
      }
    }
  }

  return (
    <>
      <MenuHeaderWrapper className='nav-header' sx={{ pl: menuHeaderPaddingLeft() }}>
        {userNavMenuBranding ? (
          userNavMenuBranding(props)
        ) : (
          <LinkStyled href='/'>
            <svg width={22} height={32} viewBox='0 0 55 81' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                fill={theme.palette.primary.main}
                d='M30.1984 0.0144043C24.8945 0.425781 25.2534 6.16968 26.6435 7.65326C22.693 10.3649 13.1875 16.8867 6.76944 21.2803C1.21531 25.0824 -0.842975 34.6064 1.11159 40.8262C3.00952 46.8658 12.4904 51.3615 17.5337 52.7256C17.5337 52.7256 11.7188 56.0269 6.60358 60.0482C1.48831 64.0695 -0.622615 69.3436 3.06836 75.262C6.75933 81.1805 12.725 80.761 17.5257 78.6229C22.3264 76.4848 32.1683 69.1692 37.9402 65.1633C42.7282 61.5411 43.9669 53.6444 41.7631 46.9643C39.9758 41.5468 30.0969 36.4284 25.1792 34.6064C27.1946 33.1595 32.4935 29.4242 37.129 26.0909C38.7184 30.5636 43.9998 30.212 45.6103 27.8209C47.6216 23.4326 51.8339 13.4663 53.9579 8.55175C54.8862 4.81044 52.5639 2.78457 50.2227 2.35938C46.8672 1.75 38.3222 0.960115 30.1984 0.0144043Z'
              />
              <path
                fillOpacity='0.2'
                fill={theme.palette.common.white}
                d='M26.6523 7.65625C24.9492 5.625 25.3239 0.255308 30.2922 0.0105286C33.0074 0.326611 35.7804 0.62685 38.3907 0.909477C43.5904 1.47246 48.1446 1.96556 50.311 2.3748C52.7331 2.83234 54.886 5.06072 53.9543 8.61103C53.2063 10.3418 52.2075 12.6646 51.1482 15.1282C49.1995 19.6601 47.0459 24.6685 45.8717 27.3445C44.7224 29.964 39.111 31.0585 37.1137 26.0951C32.4782 29.4283 27.2884 33.1556 25.273 34.6026C24.931 34.4553 24.3074 34.2381 23.5124 33.9613C20.8691 33.0407 16.331 31.4602 13.9477 29.5966C9.61363 25.5918 11.6259 19.4662 13.1737 16.904C17.8273 13.7183 20.7417 11.7161 23.4984 9.82236C24.5437 9.10427 25.5662 8.40178 26.6523 7.65625Z'
              />
              <path
                fillOpacity='0.2'
                fill={theme.palette.common.white}
                d='M17.543 52.7266C21.2241 53.9875 28.5535 57.0509 30.091 59.101C32.0129 61.6635 33.1576 64.34 29.2527 71.2039C28.5954 71.6481 27.9821 72.0633 27.4069 72.4528C22.1953 75.9817 20.1085 77.3946 16.6243 79.0531C13.5855 80.2464 6.61575 81.7103 2.66559 74.5653C-1.11764 67.7222 3.23818 62.7113 6.5963 60.065L12.1695 56.0339L14.8359 54.3477L17.543 52.7266Z'
              />
            </svg>
            <Typography
              variant='h5'
              sx={{
                lineHeight: 1,
                fontWeight: 700,
                ...menuCollapsedStyles,
                letterSpacing: '-0.45px',
                textTransform: 'lowercase',
                fontSize: '1.75rem !important',
                ...(navCollapsed && !navHover ? {} : { ml: 2 }),
                transition: 'opacity .35s ease-in-out, margin .35s ease-in-out'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </LinkStyled>
        )}

        {userMenuLockedIcon === null && userMenuUnlockedIcon === null ? null : (
          <IconButton
            disableRipple
            disableFocusRipple
            onClick={handleButtonClick}
            sx={{
              p: 1.75,
              right: -19,
              position: 'absolute',
              color: 'text.primary',
              '& svg': { color: 'common.white' },
              transition: 'right .25s ease-in-out',
              backgroundColor: hidden ? 'background.paper' : 'customColors.collapseTogglerBg',
              ...(navCollapsed && !navHover && { display: 'none' }),
              ...(!hidden &&
                skin === 'bordered' && {
                  '&:before': {
                    zIndex: -1,
                    content: '""',
                    width: '105%',
                    height: '105%',
                    borderRadius: '50%',
                    position: 'absolute',
                    border: `1px solid ${theme.palette.divider}`,
                    clipPath: direction === 'rtl' ? 'circle(71% at 100% 50%)' : 'circle(71% at 0% 50%)'
                  }
                })
            }}
          >
            <Box sx={{ display: 'flex', borderRadius: 5, backgroundColor: 'primary.main' }}>
              {userMenuLockedIcon && userMenuUnlockedIcon ? (
                navCollapsed ? (
                  userMenuUnlockedIcon
                ) : (
                  userMenuLockedIcon
                )
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    '& svg': {
                      transform: `rotate(${svgRotationDeg()}deg)`,
                      transition: 'transform .25s ease-in-out .35s'
                    }
                  }}
                >
                  <Icon icon='bx:chevron-left' />
                </Box>
              )}
            </Box>
          </IconButton>
        )}
      </MenuHeaderWrapper>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton onClick={() => handleOpenList('product')}>
          <ListItemIcon>
            <Icon icon='icon-park-outline:ad-product' />
          </ListItemIcon>
          <ListItemText primary="Products" />
          {openList.product ? <Icon width={15} icon='bxs:up-arrow' /> : <Icon width={15} icon='bxs:down-arrow' />}
        </ListItemButton>
        <Collapse in={openList.product} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton onClick={() => router.replace('/products')} sx={{ pl: 4 }}>
              <ListItemIcon>
                <Icon icon='tdesign:list' />
              </ListItemIcon>
              <ListItemText primary="List" />
            </ListItemButton>

            <ListItemButton onClick={() => router.replace('/products?create=true')} sx={{ pl: 4 }}>
              <ListItemIcon>
                <Icon icon='gridicons:create' />
              </ListItemIcon>
              <ListItemText primary="Create" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton onClick={() => handleOpenList('category')}>
          <ListItemIcon>
            <Icon icon='material-symbols:category' />
          </ListItemIcon>
          <ListItemText primary="Categories" />
          {openList.category ? <Icon width={15} icon='bxs:up-arrow' /> : <Icon width={15} icon='bxs:down-arrow' />}
        </ListItemButton>
        <Collapse in={openList.category} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton onClick={() => router.replace('/categories')} sx={{ pl: 4 }}>
              <ListItemIcon>
                <Icon icon='tdesign:list' />
              </ListItemIcon>
              <ListItemText primary="List" />
            </ListItemButton>

            <ListItemButton onClick={() => router.replace('/categories?create=true')} sx={{ pl: 4 }}>
              <ListItemIcon>
                <Icon icon='gridicons:create' />
              </ListItemIcon>
              <ListItemText primary="Create" />
            </ListItemButton>
          </List>
        </Collapse>

      </List>
    </>
  )
}

export default VerticalNavHeader
