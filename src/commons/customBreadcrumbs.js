import React, { useEffect, useState } from "react"
import { Breadcrumbs, useTheme, Typography } from "@material-ui/core"
import { NavigateNext } from "@material-ui/icons"
import { Link } from "gatsby"

const CustomBreadcrumbs = ({ array }) => {
  const theme = useTheme()
  const [breadcrumbs, setBreadcrumbs] = useState([])
  const [stateArray, setStateArray] = useState([])
  useEffect(() => {
    setStateArray(array)
  }, [array])

  useEffect(() => {
    if (stateArray.length) {
      const items = stateArray.map((item, index) => {
        if (index !== stateArray.length - 1) {
          return (
            <Link
              color="inherit"
              to={item.link}
              replace
              style={{
                textDecoration: "none",
                color: theme.palette.primary.main,
              }}
            >
              <Typography variant={item.variant ? item.variant : "body1"}>
                {" "}
                {item.label}
              </Typography>
            </Link>
          )
        } else {
          return (
            <Typography
              variant={item.variant ? item.variant : "body1"}
              style={{ color: theme.palette.secondary.dark }}
            >
              {item.label}
            </Typography>
          )
        }
      })
      setBreadcrumbs(items)
    }
  }, [stateArray.length])

  return (
    <Breadcrumbs
      separator={<NavigateNext fontSize="small" />}
      aria-label="breadcrumb"
      style={{
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        color: theme.palette.primary.contrastText,
      }}
    >
      {breadcrumbs}
    </Breadcrumbs>
  )
}

export default CustomBreadcrumbs
