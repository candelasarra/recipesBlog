import React, { useEffect, useState } from "react"
import {
  Breadcrumbs,
  useTheme,
  Typography,
  makeStyles,
} from "@material-ui/core"
import { NavigateNext } from "@material-ui/icons"
import { Link } from "gatsby"
const useStyles = makeStyles(theme => ({
  activeLink: {
    color: theme.palette.primary.main,
  },
  links: {
    textDecoration: "none",
    color: theme.palette.secondary.main,
    marginRight: theme.spacing(3),
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
}))
const WEEK_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]
const CustomBreadcrumbs = ({ array, location }) => {
  const classes = useStyles()
  const theme = useTheme()
  const urlText = location.pathname === "/posts" ? "CATEGORIES" : "ALL"
  const url = location.pathname === "/posts" ? "/" : "/posts"
  const [breadcrumbs, setBreadcrumbs] = useState([])
  const date = new Date()
  const day = date.toDateString().split(" ")[2]
  const month = MONTHS[date.getMonth()]
  const year = date.getFullYear()
  const weekDay = WEEK_DAYS[date.getDay()]
  console.log(location)

  useEffect(() => {
    if (array.length) {
      const items = array.map((item, index) => {
        if (index !== array.length - 1) {
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
              <Typography variant={item.variant ? item.variant : "body1"}>
                {" "}
                {item.label}
              </Typography>
            </Link>
          )
        } else {
          return (
            <Typography
              key={item.label}
              variant={item.variant ? item.variant : "body1"}
              style={{ color: theme.palette.secondary.dark }}
            >
              {item.label}
            </Typography>
          )
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
      <Link
        to={url}
        className={classes.links}
        activeClassName={classes.activeLink}
      >
        <Typography variant="button">{urlText}</Typography>
      </Link>
      <Typography>
        {weekDay}, {month} {day}, {year}
      </Typography>
    </div>
  )
}

export default CustomBreadcrumbs
