import React, { useEffect, useState } from "react"
import {
  Breadcrumbs,
  useTheme,
  Typography,
  makeStyles,
} from "@material-ui/core"
import { NavigateNext } from "@material-ui/icons"
import { Link } from "gatsby"
import MenuMobile from "../components/MenuMobile"
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
  const urlText = location.pathname === "/posts" ? "CATEGORIES" : "ALL"
  const url = location.pathname === "/posts" ? "/" : "/posts"
  const [breadcrumbs, setBreadcrumbs] = useState([])

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
              <Typography variant={item.variant ? item.variant : "subtitle1"}>
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
              style={{ color: theme.palette.primary.main, fontWeight: "bold" }}
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
  }, [array])

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
