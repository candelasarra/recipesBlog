import React from "react"
import { Switch, makeStyles } from "@material-ui/core";
import sun from "../images/sunIcon.jpg"
import moon from "../images/moon.jpg"
const useStyles = makeStyles(theme => ({
  root: {
    //width of entire switch
    width: 46,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    transition: "transform 0.6s ease-in",
    "&$checked": {
      //transform controls the circle thaty moves
      transform: "translateX(20px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "black",
        backgroundSize: 24,
        opacity: 1,
      },
    },
    "&$focusVisible $thumb": {
      color: "white",
      border: "6px solid #fff",
    },
  },
  thumb: props => props.checked ? {
    width: 24,
    height: 24,
    color: "white",
    backgroundImage: `url(${moon})`,
    transition: "background-size 9s ease-in",
    backgroundSize: 24,
  } : {
      width: 24,
      height: 24,
      color: "white",
      backgroundImage: `url(${sun})`,
      transition: "background-size 9s ease-in",
      backgroundSize: 24,
    },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.primary.main}`,
    backgroundColor: "#888888",
    backgroundSize: 80,
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
    height: "unset",
  },
  checked: {},
  focusVisible: {},
}))
function ThemeSwitch(props) {
  const classes = useStyles(props)
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  )
}

const DarkLightThemeSwitch = ({ checked, setTheme, setChecked }) => {

  function setCookie(name, value, days) {
    var expires = ""
    if (days) {
      var date = new Date()
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
      expires = "; expires=" + date.toUTCString()
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/"
  }

  const handleSwitch = e => {
    setChecked(e.target.checked)
    // on true dark, on false light
    if (e.target.checked) {
      setCookie("darkTheme", "dark", 365)
      setTheme("dark")
    } else if (!e.target.checked) {
      setCookie("darkTheme", "light", 365)
      setTheme("light")
    }
  }

  return (<ThemeSwitch
    checked={checked}
    onChange={handleSwitch}
    name="checkedA"
    inputProps={{ "aria-label": "secondary checkbox" }}
  />)
}


export default DarkLightThemeSwitch;