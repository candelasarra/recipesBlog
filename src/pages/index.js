import React from "react"
import MainWrapper from "../templates/MainWrapper"
import Header from "../components/header"
import { makeStyles } from "@material-ui/styles"
import {
  Typography,
  Card,
  Slide,
  div,
  createMuiTheme,
  divList,
  divListTile,
} from "@material-ui/core"
import { navigate, useStaticQuery, Link } from "gatsby"
import CustomBreadcrumbs from "../commons/customBreadcrumbs"
import BurgerHome from "../vectors/burgerHome.svg"
import TrendyMilkshake from "../vectors/milkshake.svg"
import Drink from "../vectors/drinks.svg"
import border from "../images/star.svg"
import Spices from "../vectors/spices.svg"
import Typewriter from "../vectors/typewriter.svg"
import outline from "../images/outline.svg"
const useStyles = makeStyles(() => ({
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
    borderImageSource: `url(${border})`,
    borderImageRepeat: "round",
    borderImageWidth: "9px",
    borderImageSlice: "259 fill",
    borderStyle: "solid",
  },
  rowOneItem: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
  },
  color: {
    transitionProperty: "filter",
    transitionDuration: "0.9s",
    transitionTimingFunction: "ease-in",
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
    transform: "translate3d(0,0,0)",
  },
  gridRoot: {
    maxHeight: 2450,
  },
  drinks: {
    flex: 2,
  },
  dozen: {
    padding: 20,
  },
  typewriter: {
    padding: 20,
    display: "flex",
    alignItems: "center",
  },
  typewriterSvg: {
    width: "50%",
  },
  borderDrinks: {
    transform: "translate3d(0,0,0)",
    padding: 20,
    border: "3px solid",
    borderImage: `url(${outline}) 56 round`,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
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

const Index = props => {
  const classes = useStyles()
  const breadcrumbArray = [{ label: "Home" }]
  const rows = {}
  const query = useStaticQuery(
    graphql`
      query {
        site: site {
          siteMetadata {
            menuLinks {
              name
              link
              title
            }
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

  //creating the array of objects with row one data to map over for UI
  const makeRowOneObjects = query.site.siteMetadata.menuLinks.map(item => {
    const { title, link, name } = item
    return {
      title,
      link,
      name,
      image: returnRightSvg(name),
    }
  })

  return (
    <div
      style={{
        backgroundImage:
          'url("https://cdn.inspirationhut.net/wp-content/uploads/2014/09/light-paper-fibers.jpg")',
        transform: "translate3d(0,0,0)",
      }}
    >
      <MainWrapper>
        <div className="mainContainer">
          <div className="headerContainer">
            <Header titleStyle="h3" />
          </div>
          {/* <div className="breadcrumbs"> */}
          <CustomBreadcrumbs
            array={breadcrumbArray}
            location={props.location}
          />
          {/* </div> */}
          <div className="container">
            <>
              {makeRowOneObjects.map(row => {
                const { title, link, name, image } = row
                return (
                  <div
                    onClick={() => navigate(`${link}/`)}
                    key={name}
                    className={`${classes.rowOneItem} ${name} shadow ${classes.color}`}
                  >
                    <div
                      className={`${classes.border} stars ${classes.rowOneItemInside}`}
                    >
                      <Typography
                        style={{
                          color: "#e25a5f",
                          fontFamily: "'Shrikhand', cursive",
                        }}
                        variant="h2"
                      >
                        {title}
                      </Typography>
                      {image}
                    </div>
                  </div>
                )
              })}
            </>
            <div className={`drinks shadow  ${classes.color}`}>
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
            <div className={`${classes.dozen} dozen shadow`}>
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
            <div
              className={`${classes.typewriter} ${classes.color} general shadow`}
            >
              <Typewriter className={classes.typewriterSvg} />
              <div style={{ marginLeft: 20 }}>
                <Typography variant="h5" style={{ textAlign: "center" }}>
                  Let's stay in touch!
                </Typography>
                <Typography variant="h5" style={{ textAlign: "center" }}>
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
                    candela@cherrychronicles.com
                  </a>{" "}
                </Typography>
              </div>
            </div>
            <div className="contactMe shadow">
              <Typography>Bread</Typography>
            </div>
            <div className="buyMeCoffee shadow">
              <Typography>Bread</Typography>
            </div>
            <div className="empty shadow" style={{ display: "flex" }}></div>
          </div>
        </div>
      </MainWrapper>
    </div>
  )
}
export default Index
