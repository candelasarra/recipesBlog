import React, { useContext, useEffect, useState } from "react"
import {
  Typography,
  useTheme,
  makeStyles,
  TextField,
  InputAdornment,
  FormGroup,
} from "@material-ui/core"
import LanguageContext from "../templates/LanguageContext"
import { Link } from "gatsby"
import { Search, SentimentVeryDissatisfied } from "@material-ui/icons"
import ServiceCheckbox from "../components/serviceCheckbox"

const useStyles = makeStyles(theme => ({
  postDescriptionText: {
    color: "lightgray",
  },
  postTitle: {
    color: theme.palette.primary.contrastText,
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
    width: "fit-content",
  },
  dateText: {
    color: "lightgray",
  },
  sadFace: {
    alignSelf: "center",
    marginTop: "auto",
    fontSize: 200,
    color: "#80808054",
    position: "relative",
  },
  mainContainer: {
    display: "flex",
    minHeight: "50vh",
    flexDirection: "column",
  },
  searchBar: {
    marginBottom: theme.spacing(5),
    width: "40%",
  },
  searchResults: {
    width: "fit-content",
    alignSelf: "center",
    color: "#80808054",
  },
  formGroup: {
    marginBottom: theme.spacing(5),
  },
}))

const ServicePostsContent = ({
  data,
  usPosts,
  esPosts,
  serviceNow,
  category,
}) => {
  const theme = useTheme()
  const classes = useStyles()
  const { language } = useContext(LanguageContext)
  const [posts, setPosts] = useState(null)
  const [arrayOfPosts, setArrayOfPosts] = useState([])
  const [searched, setSearched] = useState("")
  const [searchedPosts, setSearchedPosts] = useState(null)
  const searchResultString = data.results.edges.filter(
    edge =>
      edge.node.node_locale === language &&
      edge.node.slug === "no-search-results"
  )
  const searchWord = data.results.edges.filter(
    edge => edge.node.node_locale === language && edge.node.slug === "search"
  )

  useEffect(() => {
    if (searched) {
      const array = language === "en-US" ? usPosts : esPosts
      const filteredPosts = array.filter(post => {
        const lcTitle = post.node.blogTitle.toLowerCase()
        const lcDescription = post.node.descriptionOfPost.toLowerCase()
        const searchWord = searched.toLowerCase()
        return (
          lcTitle.includes(searchWord) || lcDescription.includes(searchWord)
        )
      })
      setSearchedPosts(filteredPosts)
    } else {
      language === "en-US" ? setPosts(usPosts) : setPosts(esPosts)
    }
  }, [language, usPosts, esPosts, searched])

  useEffect(() => {
    if (searchedPosts) {
      setPosts(searchedPosts)
    }
  }, [searchedPosts])

  function handleChange({ target }) {
    if (target.value.length !== 0 || target.value.trim()) {
      setSearched(target.value)
    } else if (target.value.length === 0 || !target.value.trim()) {
      setSearched(null)
    }
  }

  useEffect(() => {
    if (posts) {
      const array = posts.map(post => {
        return (
          <div
            key={post.node.slug}
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "60%",
              marginBottom: theme.spacing(6),
            }}
          >
            <Link
              to={`/${serviceNow.toLowerCase()}/${category.toLowerCase()}/${
                post.node.slug
              }`}
              variant="h5"
              style={{
                textDecoration: "none",
                color: "black",
                width: "fit-content",
              }}
            >
              <Typography variant="h5" className={classes.postTitle}>
                {post.node.blogTitle}
              </Typography>
            </Link>

            <Typography variant="caption" className={classes.dateText}>
              {" "}
              {post.node.createdAt}
            </Typography>
            <Typography variant="body1" className={classes.postDescriptionText}>
              {post.node.descriptionOfPost}
            </Typography>
          </div>
        )
      })
      setArrayOfPosts(array)
    }
  }, [
    posts,
    classes.dateText,
    classes.postDescriptionText,
    classes.postTitle,
    theme,
    category,
    serviceNow,
  ])

  return (
    <div className={classes.mainContainer}>
      <div>
        <TextField
          value={searched}
          className={classes.searchBar}
          placeholder={searchWord[0].node.string}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <Search disabled={!searched} style={{ color: "gray" }} />
              </InputAdornment>
            ),
          }}
        />
      </div>
      {searched && searchedPosts && searchedPosts.length === 0 ? (
        <>
          <SentimentVeryDissatisfied className={classes.sadFace} />
          <Typography variant="h4" className={classes.searchResults}>
            {searchResultString[0].node.string}
          </Typography>
        </>
      ) : (
        arrayOfPosts
      )}
    </div>
  )
}

export default ServicePostsContent
