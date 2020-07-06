import { Link, useStaticQuery } from "gatsby"
import React, { useContext, useEffect, useState } from "react"
import {
  Switch,
  Typography,
  withStyles,
  makeStyles,
  Divider,
  Slide,
  Grid,
} from "@material-ui/core"
import LanguageContext from "../templates/LanguageContext"
import usFlag from "../images/usflag.jpg"
import esFlag from "../images/esFlag.png"
import MenuIcon from "@material-ui/icons/Menu"
import IconButton from "@material-ui/core/IconButton"
import NavigateNextIcon from "@material-ui/icons/NavigateNext"
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore"
import { graphql } from "gatsby"

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
    height: "fit-content",
    width: "60%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    flexWrap: "wrap-reverse",
    marginBottom: "auto",
    marginTop: "auto",
  },
  activeLink: {
    color: theme.palette.primary.main,
  },
  divider: {
    marginBottom: theme.spacing(2),
  },
}))

const Header = ({ titleStyle }) => {
  const classes = useStyles()
  // false means US, true means ES
  const [checked, setChecked] = useState(false)
  const { setLanguage, language } = useContext(LanguageContext)
  const [open, setOpen] = useState(false)
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
    <Grid
      container
      direction="row"
      className={classes.mainDiv}
      style={{ height: "calc(5vw * 2)" }}
    >
      {/* <div style={{ display: "flex", justifyContent: "space-between" }}> */}
      <Grid item xs={2} />
      <Grid item xs={8}>
        <div className={classes.headerTitle}>
          <Link to="/" replace style={{ textDecoration: "none" }}>
            <Typography
              variant={titleStyle}
              color="primary"
              className={classes.title}
            >
              {query.site.siteMetadata.title}
            </Typography>
          </Link>
          <Typography className={classes.doc}></Typography>
        </div>
      </Grid>
      <Grid item xs={2}>
        <div className={classes.linksContainer}>
          <Link
            to="/"
            className={classes.links}
            activeClassName={classes.activeLink}
          >
            <Typography variant="button">HOME</Typography>
          </Link>
          <Link
            to="/posts"
            className={classes.links}
            activeClassName={classes.activeLink}
          >
            <Typography variant="button">ALL</Typography>
          </Link>
          <Link
            to="/lasjd"
            className={classes.links}
            activeClassName={classes.activeLink}
          >
            <Typography variant="button">...</Typography>
          </Link>
          <LanguageSwitch
            checked={checked}
            onChange={handleSwitch}
            name="checkedA"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
        </div>
      </Grid>
    </Grid>
  )
}

export default Header
