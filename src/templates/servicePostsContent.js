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
import Symbol from "../vectors/symbol.svg"
import Pagination from "../components/pagination"
const useStyles = makeStyles(theme => ({
  postDescriptionText: {
    color: theme.palette.primary.main,
  },
  postTitle: {
    color: theme.palette.primary.main,
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
    width: "50%",
    [theme.breakpoints.down("xs")]: {
      width: "80%",
    },
  },
  searchResults: {
    width: "fit-content",
    alignSelf: "center",
    color: "#80808054",
  },
  formGroup: {
    marginBottom: theme.spacing(5),
  },
  postsContainer: {
    margin: "20px 10%",
    flexWrap: "wrap",
    [theme.breakpoints.down("xs")]: {
      margin: "20px 5%",
    },
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
  const [numberOfPages, setNumberOfPages] = useState(0)
  const itemsPerPage = 8
  const [page, setPage] = useState(1)
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
      setNumberOfPages(Math.ceil(posts.length / itemsPerPage))
      const array = posts
        .slice((page - 1) * itemsPerPage, page * itemsPerPage)
        .map(post => {
          return (
            <div style={{ display: "flex", marginBottom: theme.spacing(6) }}>
              <Symbol style={{ width: 30 }} />
              <div
                key={post.node.slug}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: "60%",
                  marginLeft: 20,
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
                <Typography
                  variant="body1"
                  className={classes.postDescriptionText}
                >
                  {post.node.descriptionOfPost}
                </Typography>
              </div>
            </div>
          )
        })
      setArrayOfPosts(array)
    }
  }, [
    posts,
    page,
    itemsPerPage,
    classes.dateText,
    classes.postDescriptionText,
    classes.postTitle,
    theme,
    category,
    serviceNow,
  ])

  return (
    <div className={`${classes.mainContainer} shadow`}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 20,
          justifyContent: "space-around",
        }}
      >
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
      <div className={classes.postsContainer}>
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
      {posts && posts.length > itemsPerPage && (
        <Pagination
          page={page}
          setPage={setPage}
          numberOfPages={numberOfPages}
        />
      )}
    </div>
  )
}

export default ServicePostsContent
