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
import { Slide, Fade } from "@material-ui/core"
import { Location } from "@reach/router"
import {
  TransitionGroup,
  Transition as ReactTransition,
} from "react-transition-group"
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
    paddingTop: theme.spacing(6),
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
const MainWrapper = ({ children, location }) => {
  const classes = useStyles()
  const [loaded, setLoaded] = useState(false)
  const timeout = 500
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

  const getTransitionStyles = {
    entering: {
      position: `absolute`,
      opacity: 0,
    },
    entered: {
      transition: `all ${timeout}ms ease-in-out`,
      opacity: 1,
      transform: "scale(1, 1) rotate(0deg) translate(0px, 0px)",
    },
    exiting: {
      transition: `all ${timeout}ms ease-in-out`,
      opacity: 0,
      transform: "scale(1, 1) rotate(0deg) translate(-15px, 0px)",
    },
  }

  useEffect(() => {
    setLoaded(true)
  }, [])
  const value = { language, setLanguage }

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
          {/* <Fade
            in={loaded}
            //  style={{ transitionDelay: loaded ? "500ms" : "0ms" }}
            timeout={{ enter: 1000, exit: 0 }}
          > */}
          <Location>
            {({ location }) => (
              <TransitionGroup>
                <ReactTransition
                  key={location.key}
                  timeout={{
                    exit: timeout,
                    enter: timeout,
                  }}
                >
                  {status => (
                    <div
                      className={classes.deepDiv}
                      style={{
                        ...getTransitionStyles[status],
                      }}
                    >
                      {children}
                    </div>
                  )}
                </ReactTransition>
              </TransitionGroup>
            )}
          </Location>
          {/* </Fade> */}
        </ThemeProvider>
      </LanguageContext.Provider>
    </div>
  )
}

export default MainWrapper
