import React from "react"
import "./layout.css"
import MainWrapper from "../templates/MainWrapper"

const Layout = ({ children, location }) => {
  console.log(location)
  return <MainWrapper location={location}>{children}</MainWrapper>
}
export default Layout
