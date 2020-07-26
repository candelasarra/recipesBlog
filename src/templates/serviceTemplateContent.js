import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/styles"
import { Typography } from "@material-ui/core"
import { navigate } from "gatsby"
import Cookies from "../vectors/cookies.svg"
import Cakes from "../vectors/twoCakes.svg"
import Cupcakes from "../vectors/cupcakes.svg"
import Dessert from "../vectors/desserts.svg"
import Breakfast from "../vectors/breakfast.svg"
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
  category: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
  },
  color: {
    transition: "filter 0.9s",
    filter: "brightness(0%) grayscale(0) contrast(100%)",
    "&:hover": {
      filter: "brightness(100%) grayscale(0) contrast(100%) blur(0px);",
    },
  },
}))
const imageStyle = {
  //width: "fit-content",
  maxHeight: "500px",
  display: "inline-block",
  padding: 10,
  width: "100%",
}
const images = {
  cookies: <Cookies style={imageStyle} />,
  cakes: <Cakes style={imageStyle} />,
  desserts: <Dessert style={imageStyle} />,
  cupcakes: <Cupcakes style={imageStyle} />,
  breakfast: <Breakfast style={imageStyle} />,
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
          <div
            className={`${classes.category} ${
              classes.color
            } shadow ${category.toLowerCase()}`}
            onClick={() => navigate(`${path}/${category.toLowerCase()}`)}
          >
            {/* <div style={{ width: "fit-content", margin: "0px auto" }}> */}
            <Typography
              variant="h3"
              style={{ width: "fit-content", margin: 20 }}
            >
              {category}
            </Typography>
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
      <div
        className={`${classes.categoriesContainer} categoriesContainer shadow`}
        style={{}}
      >
        {cards}
      </div>
    </div>
  )
}
export default ServiceTemplateContent
