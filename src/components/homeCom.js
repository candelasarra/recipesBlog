import React from "react"
import Header from "./header"
import { makeStyles } from "@material-ui/styles"
import { Typography, Grid, Hidden } from "@material-ui/core"
import { useStaticQuery, Link } from "gatsby"
import CustomBreadcrumbs from "../commons/customBreadcrumbs"
import BurgerHome from "../vectors/burgerHome.svg"
import TrendyMilkshake from "../vectors/milkshake.svg"
import Drink from "../vectors/drinks.svg"
import Coffee from "../vectors/coffee.svg"
import border from "../images/star.svg"
import Spices from "../vectors/spices.svg"
import Typewriter from "../vectors/typewriter.svg"
import outline from "../images/outline.svg"
const useStyles = makeStyles(theme => ({
  font: {
    // fontFamily: " 'Barrio', cursive",
  },
  serviceContainer: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // border: '1px solid white', borderRadius: 2,
    padding: 20,
    width: "100%",
    maxWidth: 100,
    alignSelf: "center",
    cursor: "pointer",
    margin: 20,
    minHeight: 100,
    "&:hover": {
      backgroundColor: "rgba(211, 211, 211, 0.1)",
    },
  },
  border: {
    //271 fill, 19px
    [theme.breakpoints.up("md")]: {
      borderImageSource: `url(${border})`,
      borderImageRepeat: "round",
      borderImageWidth: "9px",
      borderImageSlice: "259 fill",
      borderStyle: "solid",
    },
  },
  rowOneItem: {
    display: "flex",
    flexDirection: "column",
    padding: 0,
    height: "100%",
    [theme.breakpoints.up("md")]: {
      padding: 20,
    },
  },
  color: {
    transitionProperty: "filter",
    contain: "paint",
    transitionDuration: "0.9s",
    transitionTimingFunction: "linear",
    transform: "translateZ(0)",
    filter: "brightness(0%) grayscale(0) contrast(100%) ",
    "&:hover": {
      filter: "brightness(100%) grayscale(0) contrast(100%) ;",
    },
  },
  rowOneItemInside: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: 30,
    maxHeight: 950,
    justifyContent: "space-between",
  },
  gridRoot: {
    maxHeight: 2450,
  },
  drinks: {
    flex: 2,
  },
  dozen: {
    padding: 20,
    height: "100%",
  },
  typewriter: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
  },
  typewriterSvg: {
    width: "50%",
    flex: 1,
  },
  borderDrinks: {
    padding: 20,
    border: "3px solid",
    borderImage: `url(${outline}) 56 round`,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  drinks: {
    height: "100%",
    padding: 20,
  },
}))

const returnRightSvg = value => {
  switch (value) {
    case "sweets":
      return <TrendyMilkshake />
      break
    case "salty":
      return <BurgerHome />
      break
    default:
      console.log("no value", value)
  }
}

const HomeComp = ({ props }) => {
  const classes = useStyles()
  const breadcrumbArray = [{ label: "Home" }]
  const rows = {}

  //creating the array of objects with row one data to map over for UI
  const makeRowOneObjects = props.data.site.siteMetadata.menuLinks.map(item => {
    const { title, link, name } = item
    if (name === "salty" || name === "sweets") {
      return {
        title,
        link,
        name,
        image: returnRightSvg(name),
      }
    } else {
      return {}
    }
  })

  return (
    <div className={`mainContainer ${classes.mainContainerIn}"`}>
      <div className="headerContainer">
        <Header titleStyle="h3" />
      </div>
      {/* <div className="breadcrumbs"> */}
      <CustomBreadcrumbs array={breadcrumbArray} location={props.location} />
      {/* </div> */}
      <div>
        <Grid container spacing={0} className="shadow">
          <>
            {makeRowOneObjects.map(row => {
              const { title, link, name, image } = row
              if (title) {
                return (
                  <Grid item xs={12} sm={6}>
                    <Link to={`${link}/`} style={{ textDecoration: "none" }}>
                      <div
                        key={name}
                        className={`${classes.rowOneItem} shadow   ${classes.color}`}
                      >
                        <div
                          className={`${classes.border} stars ${classes.rowOneItemInside}`}
                        >
                          <Typography
                            style={{
                              color: "#e25a5f",
                            }}
                            variant="h2"
                          >
                            {title}
                          </Typography>
                          {image}
                        </div>
                      </div>
                    </Link>
                  </Grid>
                )
              } else {
                return null
              }
            })}
          </>
          <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
            <Link
              to="/drinks"
              style={{ textDecoration: "none", color: "black" }}
            >
              <div className={` ${classes.drinks}  shadow ${classes.color}`}>
                <div className={` stars ${classes.borderDrinks}`}>
                  <Typography
                    variant="h3"
                    style={{
                      fontFamily: "'Shrikhand', cursive",
                      textAlign: "center",
                      color: "#e25a5f",
                    }}
                  >
                    Drinks
                  </Typography>

                  <Typography style={{ textAlign: "center" }}>
                    Recipes for drinks, from milkshakes to alcoholic drinks and
                    juices. Theres also some nut milk recipes and etc.
                  </Typography>
                  <Drink style={{ maxHeight: 409 }} />
                </div>
              </div>
            </Link>
          </Grid>
          <Hidden only={["xs", "md", "lg", "xl"]}>
            <Grid item xs={5}>
              <div style={{ display: "flex" }}></div>
            </Grid>
          </Hidden>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
            <div className={`${classes.dozen}  shadow`}>
              <Typography variant="body2" className="homeTextNuts">
                djslfkj sdlfdjslfkj sdlfdjslfkjsdl fdjslfkjsdlf
                djslfkjsdlfdjslfkjsdlf djslfkjsdlf djslfkjsdlf djslfkjsdlf
                djslfkjsdlfdjsl fkjsdlfdjslfkj sdlfdjslfkjsdlf djslfkjsdlf
                djslfkjsdlfddjslfkjsdlf djslfkjsdlf djslfkjsdlfjslfkjsd
                lfdjslfkjsdlf djslfkjsdlfdjslfkjsdlf djslfkj sdlfdjslfkj
                sdlfdjslfkjsdl fdjslfkjsdlf djslfkjsdlfdjslfkjsdlf djslfkjsdlf
                djslfkjsdlf djslfkjsdlf djslfkjsdlfdjsl fkjsdlfdjslfkj
                sdlfdjslfkjsdlf djslfkjsdlf djslfkjsdlfddjslfkjsdlf djslfkjsdlf
                djslfkjsdlfjslfkjsd lfdjslfkjsdlf djslfkjsdlfdjslfkjsdlf djslfkj
                sdlfdjslfkj sdlfdjslfkjsdl fdjslfkjsdlf djslfkjsdlfdjslfkjsdlf
                djslfkjsdlf djslfkjsdlf djslfkjsdlf djslfkjsdlfdjsl
                fkjsdlfdjslfkj sdlfdjslfkjsdlf djslfkjsdlf
              </Typography>
              <Spices className={` ${classes.color}`} />
            </div>
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={12} sm={12} md={6}>
              <div className={`${classes.typewriter} ${classes.color} shadow`}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Typewriter className={classes.typewriterSvg} />
                  <div style={{ marginLeft: 20, flex: 2 }}>
                    <Typography variant="h4" style={{ textAlign: "center" }}>
                      Let's stay in touch!
                    </Typography>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: 20,
                    alignItems: "center",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    style={{ textAlign: "center", marginRight: 15 }}
                  >
                    Email me at:
                  </Typography>
                  <Typography
                    style={{
                      fontFamily: "'Barrio', cursive",
                      textAlign: "center",
                    }}
                  >
                    <a
                      href="mailto:candela@cherrychronicles.com"
                      style={{ color: "#e25a5f" }}
                    >
                      {" "}
                      candela@cherrychronicles.com
                    </a>
                  </Typography>
                </div>
              </div>
            </Grid>
            <Grid item container xs={12} sm={12} md={6}>
              <Grid
                item
                xs={12}
                sm={6}
                md={8}
                className={` ${classes.color} shadow`}
                container
              >
                <div
                  style={{
                    padding: 20,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <Coffee style={{ height: "100%", height: 150 }} />
                  <Typography
                    variant="h4"
                    style={{
                      width: "fit-content",
                      textAlign: "center",
                      color: "#e25a5f",
                    }}
                  >
                    get me a coffee
                  </Typography>

                  <a
                    href="https://www.buymeacoffee.com/chronicles"
                    style={{ textDecoration: "underline", color: "black" }}
                  >
                    <Typography variant="h4">here</Typography>
                  </a>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <div></div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
export default HomeComp
