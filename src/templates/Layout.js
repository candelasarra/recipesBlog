import React, { useState } from "react"

import { graphql } from "gatsby"

const Layout = ({ children }) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  )
}

export default Layout
