import React, { useContext, useEffect, useState } from "react"
import { withStyles } from "@material-ui/styles";
import LanguageContext from "../templates/LanguageContext";
import { Switch } from "@material-ui/core";
import usFlag from "../images/usflag.jpg"
import esFlag from "../images/esFlag1.jpg"
import { useLanguage } from "../commons/functions";
const LanguageSwitch = withStyles(theme => ({
  root: {
    //width of entire switch
    width: 46,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      //transform controls the circle thaty moves
      transform: "translateX(20px)",
      color: theme.palette.common.white,
      "& + $track": {
        background: `url(${esFlag})`,
        backgroundSize: 37,
        //   backgroundColor: "#52d869",
        opacity: 1,
        // border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "white",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 24,
    height: 24,
    color: "white",
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.primary.main}`,
    background: `url(${usFlag})`,
    backgroundSize: 80,
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
    height: "unset",
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
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
})

const LangSwitch = ({ checked, setLanguage, setChecked }) => {

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

    if (e.target.checked) {
      setCookie("masLang", "es-ES", 365)
      setLanguage("es-ES")
    } else if (!e.target.checked) {
      setCookie("masLang", "en-US", 365)
      setLanguage("en-US")
    }
  }

  return (<LanguageSwitch
    checked={checked}
    onChange={handleSwitch}
    name="checkedA"
    inputProps={{ "aria-label": "secondary checkbox" }}
  />)
}


export default LangSwitch;

