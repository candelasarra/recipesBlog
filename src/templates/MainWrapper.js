import React, { useState } from "react"
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles"
import LanguageContext from "./LanguageContext"
import "../css/global.css"
import SEO from "../components/seo"
//greish purple : #644d5b, redhish #c96567, bluish: #324455
// terracota sheme: blue #4186f6, dark red #5c2118, bright red #bc463a, light red #d4a59b, "white" #f3e0dc
let theme = createMuiTheme({
  typography: {
    fontFamily: "'Noticia Text', serif",
  },
  palette: {
    primary: {
      main: "#000000",
      // main: "rgb(255,69,0)",
    },
    secondary: {
      main: "#e25a5f",
    },
    type: "dark",
  },
  overrides: {
    MuiPaper: {
      root: {
        //  backgroundColor: "rgb(24,25,26)",
        backgroundImage:
          'url("https://cdn.inspirationhut.net/wp-content/uploads/2014/09/light-paper-fibers.jpg")',
      },
    },
  },
})
theme = responsiveFontSizes(theme)
const MainWrapper = ({ children }) => {
  const [language, setLanguage] = useState("en-US")
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
          <div
            style={{
              paddingTop: theme.spacing(10),
              paddingBottom: theme.spacing(10),
              paddingLeft: theme.spacing(4),
              paddingRight: theme.spacing(4),
              marginLeft: `auto`,
              marginRight: `auto`,
              maxWidth: theme.spacing(13) * 12,
            }}
          >
            {children}
          </div>
        </ThemeProvider>
      </LanguageContext.Provider>
    </div>
  )
}

export default MainWrapper
