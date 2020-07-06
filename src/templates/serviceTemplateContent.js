import React from "react"
import { makeStyles } from "@material-ui/styles"
import { Slide, Card, Typography } from "@material-ui/core"
import { navigate } from "gatsby"
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
}))

const ServiceTemplateContent = ({ data, path }) => {
  const classes = useStyles()
  console.log(path)
  const serviceCards = data.map(category => {
    return (
      <Slide in direction="up">
        <Card
          className={classes.serviceContainer}
          role="presentation"
          onClick={() => navigate(`${path}/${category.toLowerCase()}`)}
        >
          <Typography variant="h5">{category}</Typography>
        </Card>
      </Slide>
    )
  })

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      {serviceCards}
    </div>
  )
}
export default ServiceTemplateContent
