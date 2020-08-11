import React, { useEffect, useState, useContext } from "react"
import {
  Breadcrumbs,
  useTheme,
  Typography,
  makeStyles,
} from "@material-ui/core"
import { NavigateNext } from "@material-ui/icons"
import { Link, useStaticQuery } from "gatsby"
import MenuMobile from "../components/MenuMobile"
import { localizeStringWithSlug } from "./functions"
import LanguageContext from "../templates/LanguageContext"
const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}))

const CustomBreadcrumbs = ({ array, location }) => {
  const classes = useStyles()
  const theme = useTheme()
  const { language } = useContext(LanguageContext)

  const url = location.pathname === "/posts" ? "/" : "/posts"
  const [breadcrumbs, setBreadcrumbs] = useState([])

  const query = useStaticQuery(
    graphql`
      query {
        strings: allContentfulStrings {
          edges {
            node {
              string
              slug
              node_locale
            }
          }
        }
      }
    `
  )
  const urlText =
    location.pathname === "/posts"
      ? localizeStringWithSlug(language, query.strings.edges, "categories")
      : localizeStringWithSlug(language, query.strings.edges, "all-1")
  useEffect(() => {
    if (array.length) {
      const items = array.map((item, index) => {
        if (index !== array.length - 1 && item.label) {
          return (
            <Link
              key={item.link}
              color="inherit"
              to={item.link}
              replace
              style={{
                textDecoration: "none",
                color: theme.palette.primary.main,
              }}
            >
              <Typography
                variant={item.variant ? item.variant : "subtitle1"}
                style={{ fontStyle: "italic" }}
              >
                {" "}
                {item.label}
              </Typography>
            </Link>
          )
        } else if (item.label) {
          return (
            <Typography
              key={item.label}
              variant={item.variant ? item.variant : "subtitle1"}
              style={{
                color: theme.palette.primary.main,
                fontWeight: "bold",
                fontStyle: "italic",
              }}
            >
              {item.label}
            </Typography>
          )
        } else {
          return null
        }
      })
      setBreadcrumbs(items)
    }
  }, [array, theme.palette.primary.main])

  return (
    <div className={`${classes.container} shadow`}>
      <Breadcrumbs
        separator={<NavigateNext fontSize="small" />}
        aria-label="breadcrumb"
        style={{
          color: theme.palette.primary.main,
        }}
      >
        {breadcrumbs}
      </Breadcrumbs>

      <div className="langswitch">
        <MenuMobile url={url} urlText={urlText} />
      </div>
    </div>
  )
}

export default CustomBreadcrumbs
