import React, { useState } from "react"
import "./layout.css"
import MainWrapper from "../templates/MainWrapper"
import DarkLightThemeContext from "../templates/DarkLightTheme"
import { makeStyles } from "@material-ui/core"
const useStyles = makeStyles(() => ({
  darkTheme: {
    filter: "invert(1) hue-rotate(180deg)",
    transition: "filter 0.6s ease-in",
  },
  lightTheme: {
    filter: "invert(0) hue-rotate(0deg) sepia(0.1)",
    transition: "filter 0.6s ease-in",
  },
}))
const Layout = ({ children, location }) => {
  const classes = useStyles()
  function getCookie(name) {
    if (document && document !== undefined) {
      var nameEQ = name + "="
      var ca = document.cookie.split(";")
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) == " ") c = c.substring(1, c.length)
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
      }
      return null
    }
  }
  const [darkLightTheme, setDarkLightTheme] = useState(
    getCookie("darkTheme") ? getCookie("darkTheme") : "light"
  )
  const valueTheme = { darkLightTheme, setDarkLightTheme }

  const returnRightStyle = () => {
    if (darkLightTheme === "dark") {
      return classes.darkTheme
    } else {
      return classes.lightTheme
    }
  }
  return (
    <div className={returnRightStyle()}>
      <DarkLightThemeContext.Provider value={valueTheme}>
        <MainWrapper location={location}>{children}</MainWrapper>
      </DarkLightThemeContext.Provider>
    </div>
  )
}
export default Layout
