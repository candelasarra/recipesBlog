import { Link, useStaticQuery } from "gatsby"
import React, { useContext, useEffect, useState } from "react"
import {
  Switch,
  Typography,
  withStyles,
  makeStyles,
  Divider,
  Slide,
  div,
  useTheme,
} from "@material-ui/core"
import LanguageContext from "../templates/LanguageContext"
import usFlag from "../images/usflag.jpg"
import esFlag from "../images/esFlag.png"
import MenuIcon from "@material-ui/icons/Menu"
import IconButton from "@material-ui/core/IconButton"
import NavigateNextIcon from "@material-ui/icons/NavigateNext"
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore"
import { graphql } from "gatsby"
import Symbol from "../vectors/symbol.svg"
import Title from "../vectors/title.svg"
import Eight from "../vectors/eight.svg"
import Hash from "../vectors/hash.svg"
import At from "../vectors/at.svg"
//import Ce from "../vectors/cece.svg"
const symbols = [
  <Symbol style={{ margin: 10 }} />,
  <Eight style={{ margin: 10 }} />,
  <Hash style={{ margin: 10 }} />,
  <At style={{ margin: 10 }} />,
]
const LanguageSwitch = withStyles(theme => ({
  root: {
    //width of entire switch
    width: 46,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      //transform controls the circle thaty moves
      transform: "translateX(20px)",
      color: theme.palette.common.white,
      "& + $track": {
        background: `url(${esFlag})`,
        backgroundSize: 37,
        //   backgroundColor: "#52d869",
        opacity: 1,
        // border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "white",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 24,
    height: 24,
    color: "white",
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.primary.main}`,
    background: `url(${usFlag})`,
    backgroundSize: 80,
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
    height: "unset",
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  )
})

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
    color: theme.palette.secondary.main,
    marginRight: theme.spacing(3),
  },
  linksContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    justifyContent: "space-around",
    flexWrap: "wrap-reverse",
    [theme.breakpoints.up(700)]: {
      flexDirection: "column",
    },
  },
  activeLink: {
    color: theme.palette.primary.main,
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
  const [checked, setChecked] = useState(false)
  const { setLanguage, language } = useContext(LanguageContext)
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
  useEffect(() => {
    if (checked) {
      setLanguage("es-ES")
    } else if (!checked) {
      setLanguage("en-US")
    }
  }, [checked, setLanguage])

  useEffect(() => {
    if (checked) {
      setCookie("masLang", "es-ES", 365)
    } else if (!checked) {
      setCookie("masLang", "en-US", 365)
    }
  }, [checked])

  function setCookie(name, value, days) {
    var expires = ""
    if (days) {
      var date = new Date()
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
      expires = "; expires=" + date.toUTCString()
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/"
  }
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
  const handleSwitch = e => {
    setChecked(e.target.checked)
  }
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
        <LanguageSwitch
          checked={checked}
          onChange={handleSwitch}
          name="checkedA"
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
      </div>
    </div>
  )
}

export default Header
