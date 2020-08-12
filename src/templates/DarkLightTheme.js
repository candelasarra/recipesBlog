import React from "react"

const DarkLightThemeContext = React.createContext({
  darkLightTheme: "light",
  setDarkLightTheme: () => {},
})

export default DarkLightThemeContext
