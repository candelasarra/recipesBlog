import React, { useContext } from "react"
import { makeStyles } from "@material-ui/styles"
import { Typography, Grid } from "@material-ui/core"
import { Link, useStaticQuery } from "gatsby"
import Cookies from "../vectors/cookies.svg"
import Cakes from "../vectors/twoCakes.svg"
import Cupcakes from "../vectors/cupcakes.svg"
import Dessert from "../vectors/desserts.svg"
import Breakfast from "../vectors/breakfast.svg"
import LanguageContext from "./LanguageContext"
import { localizeStringWithSlug } from "../commons/functions"
const useStyles = makeStyles(theme => ({
  divSweets: {
    padding: 21,
    // [theme.breakpoints.down("md")]: {
    //   padding: "20px 50px",
    // },
    [theme.breakpoints.down("sm")]: {
      padding: "20px 10px",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "0px",
    },
  },
  font: {
    color: "black",
    [theme.breakpoints.only("md")]: {
      fontSize: "3.1rem",
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "2.7rem",
    },
    [theme.breakpoints.only("xs")]: {
      fontSize: "3rem",
    },
  },

  category: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    height: "100%",
    padding: 20,
  },
  color: {
    transition: "filter 0.9s",
    transform: "translateZ(0)",

    transitionTimingFunction: "linear",
    filter: "brightness(0%) grayscale(0) contrast(100%)",
    "&:hover": {
      filter: "brightness(100%) grayscale(0) contrast(100%)",
    },
  },
  sweetContainer: {
    height: "100%",
  },
  cookieGrid: {
    height: "100%",
    width: "100%",
    [theme.breakpoints.only("md")]: {
      height: "unset",
    },
    [theme.breakpoints.only("sm")]: {
      maxHeight: 500,
    },
    [theme.breakpoints.only("xs")]: {
      height: "unset",
      maxHeight: 450,
    },
  },
}))
const imageStyle = {
  maxHeight: "500px",
  display: "inline-block",
  padding: 10,
  width: "100%",
}

const ServiceTemplateContent = ({ data, path }) => {
  const classes = useStyles()
  const { language } = useContext(LanguageContext)
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
  return (
    <div className={`shadow ${classes.divSweets}  `}>
      <div className={`shadow`}>
        <Grid container spacing={0}>
          <Grid container item xs={12}>
            <Grid item xs={12} sm={6} md={6} style={{ width: "100%" }}>
              <Link to={`${path}/cakes`} style={{ textDecoration: "none" }}>
                <div className={` ${classes.category} ${classes.color} shadow`}>
                  <Typography
                    variant="h2"
                    className={classes.font}
                    style={{ width: "fit-content", margin: 20 }}
                  >
                    {localizeStringWithSlug(
                      language,
                      query.strings.edges,
                      "cakes"
                    )}
                  </Typography>
                  <Cakes style={imageStyle} />
                </div>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={6} style={{ width: "100%" }}>
              <Link to={`${path}/breakfast`} style={{ textDecoration: "none" }}>
                <div className={` ${classes.category} ${classes.color} shadow`}>
                  <Typography
                    variant="h2"
                    className={classes.font}
                    style={{ width: "fit-content", margin: 20 }}
                  >
                    {localizeStringWithSlug(
                      language,
                      query.strings.edges,
                      "breakfast"
                    )}
                  </Typography>
                  <Breakfast style={imageStyle} />
                </div>
              </Link>
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item sm={12} md={4} className={classes.cookieGrid}>
              <Link to={`${path}/cookies`} style={{ textDecoration: "none" }}>
                <div
                  className={`${classes.category}  ${classes.color} shadow `}
                >
                  <Typography
                    variant="h2"
                    className={classes.font}
                    style={{ width: "fit-content", margin: 20 }}
                  >
                    {localizeStringWithSlug(
                      language,
                      query.strings.edges,
                      "cookies"
                    )}
                  </Typography>
                  <Cookies style={imageStyle} />
                  {/* </div> */}
                </div>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={4} style={{ width: "100%" }}>
              <Link to={`${path}/cupcakes`} style={{ textDecoration: "none" }}>
                <div
                  className={`${classes.category}  ${classes.color} shadow `}
                >
                  <Typography
                    variant="h2"
                    className={classes.font}
                    style={{ width: "fit-content", margin: 20 }}
                  >
                    Cupcakes
                  </Typography>
                  <Cupcakes style={imageStyle} />
                </div>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={4} style={{ width: "100%" }}>
              <Link to={`${path}/desserts`} style={{ textDecoration: "none" }}>
                <div
                  className={`${classes.category}  ${classes.color} shadow `}
                >
                  <Typography
                    variant="h2"
                    className={classes.font}
                    style={{ width: "fit-content", margin: 20 }}
                  >
                    {localizeStringWithSlug(
                      language,
                      query.strings.edges,
                      "desserts"
                    )}
                  </Typography>
                  <Dessert style={imageStyle} />
                </div>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
export default ServiceTemplateContent
