import React from "react"
import { FormControlLabel, Checkbox, useTheme } from "@material-ui/core"

const ServiceCheckbox = ({ checked, handleCheckbox, name, label }) => {
  const theme = useTheme()
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
          color="primary"
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
