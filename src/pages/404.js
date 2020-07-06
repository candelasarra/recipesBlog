import React from "react"
import MainWrapper from "../templates/MainWrapper"
import Header from "../components/header"
import { Typography } from "@material-ui/core"
import { Link } from "gatsby"

const NotFoundPage = () => {
  return (
    <MainWrapper>
      <Header titleStyle="h3" />
      <h1 style={{ color: "lightgray" }}>NOT FOUND</h1>
      <p style={{ color: "lightgray" }}>
        You just hit a route that doesn&#39;t exist... the sadness.
      </p>
      <Link to="/posts" style={{ textDecoration: "none" }}>
        <Typography variant="h4" style={{ color: "rgb(226,36,36)" }}>
          ← Go back
        </Typography>
      </Link>
    </MainWrapper>
  )
}

export default NotFoundPage
