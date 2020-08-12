import { useEffect, useContext, useState } from "react"
import LanguageContext from "../templates/LanguageContext"
import DarkLightThemeContext from "../templates/DarkLightTheme"

export function localizeStringWithSlug(language, array, slug) {
  const string = array.filter(
    item => item.node.node_locale === language && item.node.slug === slug
  )
  if (string && string[0] && string[0].node && string[0].node.string) {
    return string[0].node.string
  } else {
    return null
  }
}

export function localizeString(language, array) {
  const string = array.filter(item => item.node.node_locale === language)

  return string
}
export const useLanguage = () => {
  const [checked, setChecked] = useState(false)
  const { setLanguage, language } = useContext(LanguageContext)

  useEffect(() => {
    const cookie = getCookie("masLang")
    if (cookie) {
      if (cookie === "es-ES") {
        setChecked(true)
        setLanguage("es-ES")
      } else if (cookie === "en-US") {
        setChecked(false)
        setLanguage("en-US")
      }
    }
  }, [setLanguage])
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
  return { checked, language, setLanguage, setChecked }
}
export const useDarkLightTheme = () => {
  const [checkedTheme, setCheckedTheme] = useState(false)
  const { setDarkLightTheme, darkLightTheme } = useContext(
    DarkLightThemeContext
  )

  useEffect(() => {
    const cookie = getCookie("darkTheme")
    if (cookie) {
      if (cookie === "dark") {
        setCheckedTheme(true)
        setDarkLightTheme("dark")
      } else if (cookie === "light") {
        setCheckedTheme(false)
        setDarkLightTheme("light")
      }
    }
  }, [setDarkLightTheme, setCheckedTheme])
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
  return { checkedTheme, darkLightTheme, setDarkLightTheme, setCheckedTheme }
}
export function getCookie(name) {
  var nameEQ = name + "="
  var ca = document.cookie.split(";")
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) == " ") c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}
