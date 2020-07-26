import { Link, useStaticQuery } from "gatsby"
import React, { useState } from "react"
import { Typography, makeStyles } from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import NavigateNextIcon from "@material-ui/icons/NavigateNext"
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore"
import { graphql } from "gatsby"
import Symbol from "../vectors/symbol.svg"
import Title from "../vectors/title.svg"
import Eight from "../vectors/eight.svg"
import Hash from "../vectors/hash.svg"
import At from "../vectors/at.svg"
import LangSwitch from "./LangSwitch"
//import Ce from "../vectors/cece.svg"
const symbols = [
  <Symbol style={{ margin: 10 }} />,
  <Eight style={{ margin: 10 }} />,
  <Hash style={{ margin: 10 }} />,
  <At style={{ margin: 10 }} />,
]

const useStyles = makeStyles(theme => ({
  mainDiv: {
    //  display: "flex",
    //  justifyContent: "space-between",
    // flexDirection: "column",
    //  marginBottom: theme.spacing(5),

    backgroundImage:
      'url("https://cdn.inspirationhut.net/wp-content/uploads/2014/09/light-paper-fibers.jpg")',
  },
  headerTitle: {
    //   marginBottom: theme.spacing(5)
    padding: "10px 0px",
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
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    textAlign: "center",
    margin: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  activeLink: {
    color: theme.palette.secondary.main,
  },
  divider: {
    marginBottom: theme.spacing(2),
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
  // false means US, true means ES
  const [open, setOpen] = useState(false)
  const [selectedSymbol, setSelectedSymbol] = useState(0)
  const date = new Date()
  const day = date.toDateString().split(" ")[2]
  const month = MONTHS[date.getMonth()]
  const year = date.getFullYear()
  const weekDay = WEEK_DAYS[date.getDay()]
  const query = useStaticQuery(
    graphql`
      query {
        site: site {
          siteMetadata {
            title
          }
        }
        strings: allContentfulStrings(
          filter: { slug: { eq: "documentation" } }
        ) {
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

  //  const handleChange = event => {
  //     setLanguage(event.target.value)
  //     console.log(event.target.value)
  //   }

  return (
    <div className={`${classes.mainDiv} header shadow`}>
      {/* <div style={{ display: "flex", justifyContent: "space-between" }}> */}
      <div
        className="headerCherryLogo"
        onClick={() =>
          selectedSymbol < symbols.length - 1
            ? setSelectedSymbol(state => state + 1)
            : setSelectedSymbol(0)
        }
      >
        {symbols[selectedSymbol]}
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
          {/* <Link
          to="/"
          className={classes.links}
          activeClassName={classes.activeLink}
        >
          <Typography variant="button">HOME</Typography>
        </Link> */}

          {/* <Link
          to="/lasjd"
          className={classes.links}
          activeClassName={classes.activeLink}
        >
          <Typography variant="button">...</Typography>
        </Link> */}
          <Typography>SEE</Typography>
          <Typography>ALL</Typography>
          <Typography>RECIPES</Typography>
        </Link>
      </div>
    </div>
  )
}

export default Header
