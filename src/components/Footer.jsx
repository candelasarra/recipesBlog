import React from "react"
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles(theme => ({

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
  //
  gridItemFooter: {
    padding: 5,
    minHeight: 35
  }
}))

const Footer = () => {
  const classes = useStyles()


  return (
    <Grid container item xs={12} className="shadow">
      <Grid item xs={12} sm={12} md={8} className={`${classes.gridItemFooter} shadow`}>
        <Typography style={{ width: "fit-content", margin: "auto", textAlign: "center" }}>CHERRY CHRONICLES, PLANT BASED RECIPES</Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} className={`${classes.gridItemFooter} shadow`}>
        <a
          href="https://www.candelasarra.com/"
          style={{ textDecoration: "none", color: "black" }}
          target="_blank"
          rel="noreferrer"
        > <Typography style={{ width: "fit-content", margin: "auto" }}>WEBSITE BY CANDELA</Typography></a>
      </Grid>
    </Grid>
  )

}
export default Footer