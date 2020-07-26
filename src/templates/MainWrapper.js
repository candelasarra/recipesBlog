import React, { useState, useEffect } from "react"
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
  makeStyles,
} from "@material-ui/core/styles"
import LanguageContext from "./LanguageContext"
import "../css/global.css"
import SEO from "../components/seo"
//greish purple : #644d5b, redhish #c96567, bluish: #324455
// terracota sheme: blue #4186f6, dark red #5c2118, bright red #bc463a, light red #d4a59b, "white" #f3e0dc
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
        backgroundImage:
          'url("https://cdn.inspirationhut.net/wp-content/uploads/2014/09/light-paper-fibers.jpg")',
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
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    marginLeft: `auto`,
    marginRight: `auto`,
    maxWidth: theme.spacing(13) * 12,
  },
}))
const MainWrapper = ({ children }) => {
  const classes = useStyles()
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

  const value = { language, setLanguage }

  return (
    <div
      style={{
        backgroundImage:
          'url("https://cdn.inspirationhut.net/wp-content/uploads/2014/09/light-paper-fibers.jpg")',
        minHeight: "100vh",
      }}
    >
      <LanguageContext.Provider value={value}>
        <ThemeProvider theme={theme}>
          <SEO />
          <div className={classes.deepDiv}>{children}</div>
        </ThemeProvider>
      </LanguageContext.Provider>
    </div>
  )
}

export default MainWrapper
