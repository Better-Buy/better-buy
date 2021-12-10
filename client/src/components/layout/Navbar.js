import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './Navbar.css'
import { Grid } from '@mui/material'
import Logo from '../../assets/img/Logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faShoppingCart,
  faUser,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Auth from '../../utils/auth'
import { logout } from '../../actions/userActions'

const shoppingCart = <FontAwesomeIcon icon={faShoppingCart} />
const user = <FontAwesomeIcon icon={faUser} />
const caret = <FontAwesomeIcon icon={faCaretDown} />

export default function Navbar() {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const logoutHandler = () => {
    dispatch(logout())
    Auth.logout()
  }

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <Grid
          container
          item
          xs={12}
          sm={6}
          md={6}
          lg={6}
          className="navlinks"
          justifyContent="flex-end"
        >
          <div>
            <Button
              variant="text"
              sx={{
                color: 'black',
                fontFamily: 'now bold',
                ':hover': {
                  color: '#FFB75A',
                },
              }}
            >
              <Link to="/cart">Cart{shoppingCart}</Link>
            </Button>
            <Button
              id="basic-button"
              aria-controls="basic-menu"
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{
                color: 'black',
                fontFamily: 'now bold',
                ':hover': {
                  color: '#FFB75A',
                },
              }}
            >
              {userInfo.firstName}
              {caret}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem>
                <a href="/" onClick={() => logoutHandler()}>
                  Logout
                </a>
              </MenuItem>
            </Menu>
          </div>
        </Grid>
      )
    } else {
      return (
        <Grid
          container
          item
          xs={12}
          sm={6}
          md={6}
          lg={6}
          className="navlinks"
          justifyContent="flex-end"
        >
          <Button
            variant="text"
            sx={{
              color: 'black',
              fontFamily: 'now bold',
              ':hover': {
                color: '#FFB75A',
              },
            }}
          >
            <Link to="/cart">Cart{shoppingCart}</Link>
          </Button>
          <Button
            variant="text"
            sx={{
              color: 'black',
              fontFamily: 'now bold',
              ':hover': {
                color: '#FFB75A',
              },
            }}
          >
            <Link className="login-link" to="/login">
              Login
              {user}
            </Link>
          </Button>
        </Grid>
      )
    }
  }
  return (
    <Grid
      container
      className="navbar2"
      justifyContent="space-between"
      direction="row"
      alignItems="Center"
    >
      <Grid
        container
        className="logo-container"
        item
        xs={12}
        sm={6}
        md={6}
        lg={6}
        justifyContent="flex-start"
        alignItems="Center"
      >
        <Link to="/" item>
          <img className="logo" src={Logo} alt="Brand Logo"></img>
        </Link>
        <Link to="/" item className="logo-text">
          etter Buy
        </Link>
      </Grid>
      {showNavigation()}
    </Grid>
  )
}
