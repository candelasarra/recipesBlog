import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import LanguageSwitch from "./header"
import { makeStyles } from '@material-ui/core/styles';
import LangSwitch from './LangSwitch';
import { IconButton, Typography, Card } from '@material-ui/core';
import { Link } from 'gatsby';
import { useLanguage } from '../commons/functions';
import usFlag from "../images/usflag.jpg"
import esFlag from "../images/esFlag1.jpg"
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
}));

function MenuMobile({ url, urlText }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const { checked, language, setLanguage, setChecked } = useLanguage()
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

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

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  // React.useEffect(() => {
  //   // if (prevOpen.current === true && open === false) {
  //     anchorRef.current.focus();
  //   // }
  //   // console.log("in use effect")
  //   // prevOpen.current = open;
  // }, [open]);

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
        <Popper open={open} anchorEl={anchorRef.current} transition disablePortal placement="bottom-end" style={{zIndex: 999  }}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Card raised>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} style={{ outline: 'none' }}>
                    <MenuItem style={{ padding: 'unset', display: 'flex', justifyContent: 'center' }} ><LangSwitch checked={checked} setLanguage={setLanguage} setChecked={setChecked}  esFlag={esFlag} usFlag={usFlag}  /> </MenuItem>
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