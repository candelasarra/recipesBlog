import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/styles"
import { Slide, Card, Typography } from "@material-ui/core"
import { navigate } from "gatsby"
import Cookies from "../vectors/cherry.svg"
import Cakes from "../vectors/divorceCake.svg"
import Pies from "../vectors/justMilkshake.svg"
import Drink from "../vectors/drink.svg"
const useStyles = makeStyles(theme => ({
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
  categoriesContainer: {
    columnCount: 3,
    columnGap: 0,
    [theme.breakpoints.down("sm")]: {
      columnCount: 2,
    },
  },
}))
const imageStyle = {
  //width: "fit-content",
  maxHeight: "500px",
  display: "inline-block",
  padding: 20,
  width: "100%",
}
const images = {
  cookies: <Cookies style={imageStyle} />,
  cakes: <Cakes style={imageStyle} />,
  pies: <Pies style={imageStyle} />,
  cupcakes: <Drink style={imageStyle} />,
}

const ServiceTemplateContent = ({ data, path }) => {
  const classes = useStyles()
  const [cards, setCards] = useState(null)
  console.log(path)
  console.log(data)
  useEffect(() => {
    if (data) {
      const serviceCards = data.map(category => {
        return (
          <div className="shadow">
            {/* <div style={{ width: "fit-content", margin: "0px auto" }}> */}
            {images[category.toLowerCase()]}
            {/* </div> */}
          </div>
          // <Slide in direction="up">
          //   <Card
          //     className={classes.serviceContainer}
          //     role="presentation"
          //     onClick={() => navigate(`${path}/${category.toLowerCase()}`)}
          //   >
          //     <Typography variant="h5">{category}</Typography>
          //   </Card>
          // </Slide>
        )
      })
      setCards(serviceCards)
    }
  }, [data, images])

  return (
    // <div
    //   style={{
    //     display: "flex",
    //     flexDirection: "row",
    //     flexWrap: "wrap",
    //     justifyContent: "center",
    //     height: "100%",
    //     width: "100%",
    //   }}
    // >
    <div className="shadow" style={{ padding: 20 }}>
      <div className={`${classes.categoriesContainer} shadow`} style={{}}>
        {cards}
      </div>
    </div>
  )
}
export default ServiceTemplateContent
