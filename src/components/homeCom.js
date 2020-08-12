import React, { useContext } from "react"
import Header from "./header"
import { makeStyles } from "@material-ui/styles"
import { Typography, Grid, Hidden } from "@material-ui/core"
import { Link } from "gatsby"
import CustomBreadcrumbs from "../commons/customBreadcrumbs"
import BurgerHome from "../vectors/burgerHome.svg"
import TrendyMilkshake from "../vectors/milkshake.svg"
import Drink from "../vectors/drinks.svg"
import Coffee from "../vectors/coffee.svg"
import border from "../images/star.svg"
import Spices from "../vectors/spices.svg"
import Typewriter from "../vectors/typewriter.svg"
import outline from "../images/outline.svg"
import Footer from "./Footer"
import LanguageContext from "../templates/LanguageContext"
const useStyles = makeStyles(theme => ({
  serviceContainer: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
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
    case "salty":
      return <BurgerHome />
    default:
      console.log("no value", value)
  }
}

const HomeComp = ({ props }) => {
  const classes = useStyles()
  const breadcrumbArray = [{ label: "Home" }]
  const { language } = useContext(LanguageContext)
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
          <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
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
                    Drinks recipes: from milkshakes to alcoholic and not
                    alcoholic drinks and milks.
                  </Typography>
                  <Drink style={{ maxHeight: 409 }} />
                </div>
              </div>
            </Link>
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
            <div className={`${classes.dozen}  shadow`}>
              {language === "en-US" ? (
                <Typography
                  variant="body1"
                  className="homeTextNuts"
                  style={{ marginBottom: 20 }}
                >
                  Cherry Chronicles offers an array of plant based recipes in
                  English as well as in Spanish.
                  <br /> From junk food to every day healthy recipes, Cherry
                  Chronicles is where I keep all the recipes I love making and
                  eating. Cherry Chronicles was born from the need to have easy
                  and constant access to my recipes (both in Spanish and
                  English) to share with my friends, as well as to not lose
                  amazing recipes that I would find myself reading from oil
                  stained papers.
                  <br />
                  Cherry Chronicles' recipes are full of little secrets that
                  will help you step by step to make them perfectly on the first
                  try.
                </Typography>
              ) : (
                <Typography
                  variant="body1"
                  className="homeTextNuts"
                  style={{ marginBottom: 20 }}
                >
                  Cherry Chronicles ofrece una variedad de recetas a base de
                  plantas en español tanto como en inglés.
                  <br /> Desde comida chatarra a recetas para todos los días, en
                  Cherry Chronicles guardo todas las recetas que amo hacer y
                  comer. Cherry Chronicles nació desde la necesidad de tener
                  acceso fácil y constante a todas mis recetas (en español e
                  inglés) para compartir con mis amigxs y tambien para no perder
                  recetas increibles que me encontraba leyendo de papeles
                  manchados con aceite.
                  <br />
                  Las recetas de Cherry Chronicles estan llenas de secretitos
                  que te van a ayudar paso por paso para que te salgan perfectas
                  desde el primer intento.
                </Typography>
              )}
              <Spices
                className={` ${classes.color}`}
                style={{ margin: "0px 20px" }}
              />
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
                  <Coffee style={{ height: 150 }} />
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
                    target="_blank"
                    rel="noreferrer"
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
      <Footer />
    </div>
  )
}
export default HomeComp
