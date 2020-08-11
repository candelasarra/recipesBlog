import { Link, useStaticQuery } from "gatsby"
import React, { useContext } from "react"
import { Typography, makeStyles, Hidden } from "@material-ui/core"
import { graphql } from "gatsby"
import paperImage from "../images/paperImage.jpg"
import Title from "../vectors/title2.svg"

import HeaderSymbol from "./headerSymbol"
import { localizeStringWithSlug } from "../commons/functions"
import LanguageContext from "../templates/LanguageContext"

const useStyles = makeStyles(theme => ({
  mainDiv: {
    display: "flex",
    backgroundImage: `url(${paperImage})`,
  },
  headerTitle: {
    padding: "10px 0px",
    flex: 7,
    [theme.breakpoints.down(800)]: {
      flex: "auto",
    },
  },
  title: {
    transition: "color 1s",
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.main,
    "&:hover": {
      color: theme.palette.secondary.dark,
    },
    fontFamily: " 'Barrio', cursive",
  },
  doc: {
    color: theme.palette.primary.contrastText,
  },
  links: {
    textDecoration: "none",
    color: theme.palette.primary.main,
    margin: theme.spacing(1),
  },
  linksContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    textAlign: "center",
    margin: theme.spacing(3),
    [theme.breakpoints.down(900)]: {
      display: "none",
    },
  },
  activeLink: {
    color: theme.palette.secondary.main,
  },
  divider: {
    marginBottom: theme.spacing(2),
  },
  headerCherryLogo: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    margin: "20px 0px 10px 0px",
    cursor: "pointer",
    display: "flex",
    [theme.breakpoints.down(800)]: {
      display: "none",
    },
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

const Header = ({ titleStyle }) => {
  const classes = useStyles()
  const date = new Date()
  const { language } = useContext(LanguageContext)
  const day = date.toDateString().split(" ")[2]
  const month = MONTHS[date.getMonth()]
  const year = date.getFullYear()
  const weekDay = WEEK_DAYS[date.getDay()]

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
  const see = localizeStringWithSlug(language, query.strings.edges, "see")
  const all = localizeStringWithSlug(language, query.strings.edges, "all")
  const recipes = localizeStringWithSlug(
    language,
    query.strings.edges,
    "recipes"
  )
  return (
    <div className={`${classes.mainDiv} header shadow`}>
      <div className={`${classes.headerCherryLogo} headerCherryLogo`}>
        <HeaderSymbol />
      </div>
      <div className={`${classes.headerTitle} headerTitle shadow`}>
        <Typography
          style={{
            width: "fit-content",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {weekDay}, {month} {day}, {year}
        </Typography>
        <Link to="/" replace style={{ textDecoration: "none" }}>
          <Title style={{ margin: "20px 10px 10px 10px" }} />
        </Link>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Typography style={{ width: "fit-content" }}>PLANT</Typography>
          <Typography style={{ width: "fit-content" }}>BASED</Typography>
          <Typography style={{ width: "fit-content" }}>RECIPES</Typography>
        </div>
      </div>
      <div className={`${classes.linksContainer} linksContainer shadow`}>
        <Link
          to="/posts"
          className={classes.links}
          activeClassName={classes.activeLink}
        >
          <Typography>{see}</Typography>
          <Typography>{all}</Typography>
          <Typography>{recipes}</Typography>
        </Link>
      </div>
    </div>
  )
}

export default Header
