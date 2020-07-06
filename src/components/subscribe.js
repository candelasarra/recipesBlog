import React, { useState, useContext } from "react"
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  InputAdornment,
  TextField,
  Button,
  makeStyles,
  Snackbar,
  IconButton,
} from "@material-ui/core"
import MailOutlineIcon from "@material-ui/icons/MailOutline"
import { useStaticQuery } from "gatsby"
import LanguageContext from "../templates/LanguageContext"
import { localizeStringWithSlug } from "../commons/functions"
import { Close } from "@material-ui/icons"
const axios = require("axios")

const useStyles = makeStyles(theme => ({
  cardRoot: {
    minHeight: "200px",
    marginLeft: "auto",
    marginRight: "auto",
    padding: theme.spacing(3),
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "column",
    border: "1px solid rgba(0,0,0,0.0975)",
    //   backgroundColor: "#18191a",
    backgroundImage:
      'url("https://cdn.inspirationhut.net/wp-content/uploads/2014/09/light-paper-fibers.jpg")',
  },
  textfield: {
    width: "100%",
  },
  textfieldAndbutton: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  text: {
    color: theme.palette.primary.main,
  },
  button: {},
  cardContent: {
    width: "45%",
    minWidth: 200,
  },
}))

const Subscribe = () => {
  const classes = useStyles()
  const [email, setEmail] = useState("")
  const { language } = useContext(LanguageContext)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const query = useStaticQuery(
    graphql`
      query {
        strings: allContentfulStrings {
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
  const cardGetNotifiedText = localizeStringWithSlug(
    language,
    query.strings.edges,
    "make-sure-to-get-notified-when-we-post"
  )
  const subscribeStr = localizeStringWithSlug(
    language,
    query.strings.edges,
    "subscribe"
  )
  const loadingStr = localizeStringWithSlug(
    language,
    query.strings.edges,
    "loading"
  )
  const notifySuc = localizeStringWithSlug(
    language,
    query.strings.edges,
    "you-have-successfully-suscribed"
  )
  const invalidEmail = localizeStringWithSlug(
    language,
    query.strings.edges,
    "you-have-entered-an-invalid-email-address"
  )
  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true
    }

    return false
  }
  function handleChange({ target }) {
    setEmail(target.value)
  }
  function handleOpenNotify() {
    setOpen(open => !open)
  }

  async function handleSubscribe(e) {
    if (e.which === 13 || (e.type === "click" && email)) {
      if (ValidateEmail(email)) {
        setLoading(true)
        const emailResponse = await handlePostEmail({ value: email })
        if (emailResponse.data.value) {
          handleOpenNotify()
        }
        setLoading(false)
        setEmail("")
      } else {
        alert(invalidEmail[0].node.string)
        setEmail("")
      }
    }
  }

  const API =
    "https://hocx8gfype.execute-api.us-east-1.amazonaws.com/prd/blog-emails"
  const handlePostEmail = async data => {
    try {
      const res = await axios.post(API, data)
      return res
    } catch (error) {
      // handle server errors
      console.log(error)
    }
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={!!open}
        autoHideDuration={3000}
        onClose={handleOpenNotify}
        ContentProps={{
          "aria-describedby": "message-id",
          style: { backgroundColor: "#5AC18E" },
        }}
        message={
          <div style={{ display: "flex", alignItems: "center" }}>
            <span id="message-id">{notifySuc[0].node.string}</span>
          </div>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            // className={classes.close}
            onClick={handleOpenNotify}
          >
            <Close />
          </IconButton>,
        ]}
      />
      <Card raised="true" className={classes.cardRoot}>
        <Typography className={classes.text} variant="h5" align="center">
          {cardGetNotifiedText[0].node.string}
        </Typography>
        <div className={classes.textfieldAndbutton}>
          <CardContent className={classes.cardContent}>
            <TextField
              className={classes.textfield}
              value={email}
              placeholder="Email"
              onChange={handleChange}
              onKeyDown={handleSubscribe}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <MailOutlineIcon
                      style={{
                        color: !email ? "gray" : "white",
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              disabled={!email || loading}
              onClick={handleSubscribe}
              size="small"
              className={classes.button}
            >
              {loading
                ? loadingStr[0].node.string
                : subscribeStr[0].node.string}
            </Button>
          </CardActions>
        </div>
      </Card>
    </div>
  )
}

export default Subscribe
