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
import Walnuts from "../vectors/walnuts.svg"
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
    transition: "filter .9s",
    filter: "brightness(0%) grayscale(0) contrast(100%)",
    "&:hover": {
      filter: "brightness(100%) grayscale(0) contrast(100%);",
    },
  },
  rowOneItemInside: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: 30,
    maxHeight: 950,
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

  console.log(query.site.siteMetadata)

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

  const gridItems = [
    {
      title: "Banana Text",
      cols: 4,
    },
    {
      title: "Sweets",
      cols: 6,
    },
    {
      title: "Salty",
      cols: 5,
    },
    {
      title: "Long",
      cols: 5,
      rows: 2,
    },
    {
      title: "Bread",
      cols: 10,
    },
  ]
  console.log(props)

  return (
    <div
      style={{
        backgroundImage:
          'url("https://cdn.inspirationhut.net/wp-content/uploads/2014/09/light-paper-fibers.jpg")',
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
                      className={`${classes.border} ${classes.rowOneItemInside}`}
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
            <div className="general shadow">
              <Typography>Salty</Typography>
            </div>
            <div className={`drinks shadow ${classes.color}`}>
              <Typography
                variant="h4"
                style={{ fontFamily: "'Shrikhand', cursive" }}
              >
                Drinks
              </Typography>
              <Drink />
            </div>
            <div className={`${classes.dozen} dozen shadow`}>
              <Walnuts className={`walnuts ${classes.color}`} />
              <Typography variant="body1" className="homeTextNuts">
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
            </div>
            <div className="contactMe shadow">
              <Typography>Bread</Typography>
            </div>
            <div className="buyMeCoffee shadow">
              <Typography>Bread</Typography>
            </div>
            <div className="empty shadow" />
          </div>
        </div>
      </MainWrapper>
    </div>
  )
}
export default Index
