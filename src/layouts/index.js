import React, { useState, useEffect } from "react"
import "./layout.css"
import MainWrapper from "../templates/MainWrapper"
import DarkLightThemeContext from "../templates/DarkLightTheme"
import { makeStyles } from "@material-ui/core"
import { getCookie } from "../commons/functions"
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
  const [darkLightTheme, setDarkLightTheme] = useState(
    getCookie("darkTheme") ? getCookie("darkTheme") : "light"
  )
  const valueTheme = { darkLightTheme, setDarkLightTheme }

  useEffect(() => {
    if (getCookie("darkTheme")) {
      setDarkLightTheme(getCookie("darkTheme"))
    }
  }, [])

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
