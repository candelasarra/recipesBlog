import React from "react"

const LanguageContext = React.createContext({
  language: "en-US",
  setLanguage: () => {},
})

export default LanguageContext
