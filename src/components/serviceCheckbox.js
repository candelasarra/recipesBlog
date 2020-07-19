import React from "react"
import {
  FormControlLabel,
  Checkbox,
  useTheme,
  makeStyles,
} from "@material-ui/core"
const useStyles = makeStyles(theme => ({
  checkboxRoot: {
    display: "none",
  },
}))
const ServiceCheckbox = ({ checked, handleCheckbox, name, label }) => {
  const theme = useTheme()
  const classes = useStyles()
  return (
    <FormControlLabel
      style={{
        color: theme.palette.primary.main,
        marginLeft: 0,
        marginRight: 16,
      }}
      control={
        <Checkbox
          checked={checked || false}
          onChange={handleCheckbox}
          name={name}
          color="secondary"
          classes={{ root: classes.checkboxRoot }}
        />
      }
      label={
        // <img
        //   src={src}
        //   key={name + "service"}
        //   className="profile-img"
        //   width="20px"
        //   height="auto"
        //   //    style={{ marginRight: "5px" }}
        // />
        label
      }
      labelPlacement="start"
    />
  )
}

export default ServiceCheckbox
