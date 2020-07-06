import React from "react"
import MainWrapper from "../templates/MainWrapper"
import Header from "../components/header"
import { makeStyles } from "@material-ui/styles"
import {
  Typography,
  Card,
  Slide,
  Grid,
  createMuiTheme,
  GridList,
  GridListTile,
} from "@material-ui/core"
import { navigate, useStaticQuery } from "gatsby"
import CustomBreadcrumbs from "../commons/customBreadcrumbs"
import BurgerHome from "../vectors/burgerHome.svg"
import TrendyMilkshake from "../vectors/justMilkshake.svg"
import border from "../images/star.svg"

const useStyles = makeStyles(() => ({
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
    borderImageSource: `url("${border}")`,
    borderImageRepeat: "round",
    borderImageWidth: "9px",
    borderImageSlice: "254 fill",
  },
  rowOneItem: {
    transition: "filter .9s",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
    filter: "brightness(0%) grayscale(0) contrast(100%)",
    "&:hover": {
      filter: "brightness(100%) grayscale(0) contrast(100%);",
    },
  },
  rowOneItemInside: {
    flexDirection: "column",
    height: "100%",
    alignItems: "center",
    padding: 30,
    justifyContent: "space-around",
    maxHeight: 950,
  },
  gridRoot: {
    maxHeight: 2450,
  },
}))

const returnRightSvg = value => {
  switch (value) {
    case "sweets":
      return <TrendyMilkshake style={{ height: "90%" }} />
      break
    case "salty":
      return <BurgerHome style={{ height: "80%" }} />
      break
    default:
      console.log("no value", value)
  }
}

const Index = () => {
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
  const makeRowOneGridItems = makeRowOneObjects.map(row => {
    const { title, link, name, image } = row
    return (
      <Grid
        item
        xs={6}
        container
        onClick={() => navigate(`${link}/`)}
        key={name}
        className={`${classes.rowOneItem}`}
      >
        <Grid
          container
          className={`${classes.border} ${classes.rowOneItemInside}`}
        >
          <Typography style={{ color: "#e25a5f" }}>{title}</Typography>
          {image}
        </Grid>
      </Grid>
    )
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

  return (
    <div
      style={{
        height: "100vh",
        backgroundImage:
          'url("https://cdn.inspirationhut.net/wp-content/uploads/2014/09/light-paper-fibers.jpg")',
      }}
    >
      <MainWrapper>
        <Grid container className={classes.gridRoot}>
          <Grid item xs={12}>
            <Header titleStyle="h3" />
          </Grid>
          <Grid item xs={12} style={{ height: "calc(2vw * 2)" }}>
            <CustomBreadcrumbs array={breadcrumbArray} />
          </Grid>
          <Grid item xs={12} container>
            <Grid item xs={12} container style={{ height: "calc(27vw * 2)" }}>
              {makeRowOneGridItems}
            </Grid>
            <Grid item xs={12} container style={{ height: "calc(15vw * 2)" }}>
              <Grid item xs={8}>
                <Typography>Salty</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>Lettuce</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} container style={{ height: "calc(25vw * 2)" }}>
              <Grid item xs={4}>
                <Typography>Bread</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>Bread</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>Bread</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MainWrapper>
    </div>
  )
}
export default Index
