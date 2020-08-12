import React, { useContext, useEffect } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { makeStyles } from '@material-ui/core/styles';
import LangSwitch from './LangSwitch';
import { IconButton, Typography, Card } from '@material-ui/core';
import { Link } from 'gatsby';
import { useLanguage, useDarkLightTheme } from '../commons/functions';
import usFlag from "../images/usflag.jpg"
import esFlag from "../images/esFlag1.jpg"

import DarkLightThemeContext from '../templates/DarkLightTheme';
import DarkLightThemeSwitch from './DarkLightThemeSwitch';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  activeLink: {
    color: theme.palette.primary.main,
  },
  links: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
  dark: {
    filter: "invert(1) hue-rotate(180deg)",
  },
  light: {
    filter: "unset",
  },
}));

function MenuMobile({ url, urlText }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const { checked, setLanguage, setChecked } = useLanguage()
  const { checkedTheme, setDarkLightTheme, setCheckedTheme, darkLightTheme } = useDarkLightTheme()

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  useEffect(() => {
    if (checkedTheme && darkLightTheme !== "dark") {
      setDarkLightTheme("dark")
      document.body.style.background = "black"
    } else if (!checkedTheme && darkLightTheme !== "light") {
      setDarkLightTheme("light")
      document.body.style.background = "#fffff6"
    }
  }, [checkedTheme, darkLightTheme])

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const returnRightStyle = () => {
    if (darkLightTheme === "dark") {
      return classes.dark
    } else {
      return classes.light
    }
  }

  return (
    <div className={classes.root}>
      <div>
        <IconButton
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          color="primary"
        >
          <MenuBookIcon />
        </IconButton>
        <Popper open={open} anchorEl={anchorRef.current} transition disablePortal placement="bottom-left" style={{ zIndex: 999 }}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Card raised
                className={`${returnRightStyle()}`}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} style={{ outline: 'none' }}>
                    <MenuItem style={{ padding: 'unset', display: 'flex', justifyContent: 'center' }} >
                      <LangSwitch checked={checked} setLanguage={setLanguage} setChecked={setChecked} esFlag={esFlag} usFlag={usFlag} />
                    </MenuItem>
                    <MenuItem style={{ padding: 'unset', display: 'flex', justifyContent: 'center' }} ><DarkLightThemeSwitch checked={checkedTheme} setTheme={setDarkLightTheme} setChecked={setCheckedTheme} /> </MenuItem>
                    <MenuItem style={{ display: 'flex', justifyContent: 'center' }}>
                      <Link
                        to={url}
                        className={classes.links}
                        activeClassName={classes.activeLink}
                      >
                        <Typography variant="button">{urlText}</Typography>
                      </Link>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Card>
            </Grow>
          )}
        </Popper>
      </div>
    </div >
  );
}

export default MenuMobile;