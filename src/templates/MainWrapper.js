import React, { useState, useEffect } from "react"
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
  makeStyles,
} from "@material-ui/core/styles"
import LanguageContext from "./LanguageContext"
import "../css/global.css"
import paperImage from "../images/paperImage.jpg"
import SEO from "../components/seo"

let theme = createMuiTheme({
  typography: {
    fontFamily: "'Inconsolata', monospace;",
  },
  palette: {
    primary: {
      main: "#000000",
      // main: "rgb(255,69,0)",
    },
    secondary: {
      main: "#e25a5f",
    },
    type: "light",
  },
  overrides: {
    MuiPaper: {
      root: {
        //  backgroundColor: "rgb(24,25,26)",
        backgroundImage: `url(${paperImage})`,
      },
    },
    MuiTypography: {
      h6: {
        fontFamily: "'Shrikhand', cursive;",
      },
      h5: {
        fontFamily: "'Shrikhand', cursive;",
      },
      h4: {
        fontFamily: "'Shrikhand', cursive;",
      },
      h3: {
        fontFamily: "'Shrikhand', cursive;",
      },
      h2: {
        fontFamily: "'Shrikhand', cursive;",
      },
      paragraph: {
        fontFamily: "'Inconsolata', monospace;",
      },
      body1: {
        fontFamily: "'Inconsolata', monospace;",
      },
      body2: {
        fontFamily: "'Inconsolata', monospace;",
      },
      subtitle1: {
        fontFamily: "'Inconsolata', monospace;",
      },
      subtitle2: {
        fontFamily: "'Inconsolata', monospace;",
      },
      caption: {
        fontFamily: "'Inconsolata', monospace;",
      },
    },
  },
})
theme = responsiveFontSizes(theme)

const useStyles = makeStyles(() => ({
  deepDiv: {
    display: "flex",
    flexDirection: "column",
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    paddingLeft: 31,
    paddingRight: 31,
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    marginLeft: `auto`,
    marginRight: `auto`,
    maxWidth: 1247,
    transform: "translateX(-1000px)",
  },
  notLoaded: {
    transform: "translateX(-1000px)",
  },
  loaded: {
    animation: `$slide 1000ms ${theme.transitions.easing.easeInOut}`,
    transform: "translateX(0)",
  },
  "@keyframes slide": {
    "0%": {
      // opacity: 0,
      transform: "translateX(-1000px)",
    },
    "100%": {
      // opacity: 1,
      transform: "translateX(0)",
    },
  },
  nothing: {
    display: "flex",
    flexDirection: "column",
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    paddingLeft: 31,
    paddingRight: 31,
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    marginLeft: `auto`,
    marginRight: `auto`,
    maxWidth: 1247,
    transform: "translateX(0px)",
  },
}))
const MainWrapper = ({ children, animation }) => {
  const classes = useStyles()
  const [loaded, setLoaded] = useState(false)
  function getCookie(name) {
    var nameEQ = name + "="
    var ca = document.cookie.split(";")
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i]
      while (c.charAt(0) == " ") c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
    }
    return null
  }
  const [language, setLanguage] = useState("en-US")
  useEffect(() => {
    const cookie = getCookie("masLang")
    if (cookie) {
      setLanguage(cookie)
    }
  }, [])

  useEffect(() => {
    setLoaded(true)
  }, [])
  const value = { language, setLanguage }
  const returnRightClassName = () => {
    if (typeof window === `undefined`) {
      return null
    } else if (
      window.navigator.userAgent.indexOf("Safari") !== -1 &&
      window.navigator.userAgent.indexOf("Chrome") === -1
    ) {
      return null
    } else if (loaded && animation) {
      return classes.loaded
    } else if (!loaded && animation) {
      return classes.notLoaded
    } else {
      return null
    }
  }
  const returnOtherRightClassName = () => {
    if (typeof window === `undefined`) {
      return classes.nothing
    } else if (
      window.navigator.userAgent.indexOf("Safari") !== -1 &&
      window.navigator.userAgent.indexOf("Chrome") === -1
    ) {
      return classes.nothing
    } else if (loaded && animation) {
      return classes.deepDiv
    } else if (!loaded && animation) {
      return classes.deepDiv
    } else {
      return classes.nothing
    }
  }
  return (
    <div
      style={{
        backgroundImage: `url(${paperImage})`,
        minHeight: "100vh",
      }}
    >
      <LanguageContext.Provider value={value}>
        <ThemeProvider theme={theme}>
          <SEO />
          <div
            className={`${returnOtherRightClassName()} ${returnRightClassName()}`}
          >
            {children}
          </div>
        </ThemeProvider>
      </LanguageContext.Provider>
    </div>
  )
}

export default MainWrapper
