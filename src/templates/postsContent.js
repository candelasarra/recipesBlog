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

const PostsContent = ({ data }) => {
  const theme = useTheme()
  const classes = useStyles()
  const { language } = useContext(LanguageContext)
  const [posts, setPosts] = useState(null)
  const [arrayOfPosts, setArrayOfPosts] = useState([])
  const [searched, setSearched] = useState(null)
  const [searchedPosts, setSearchedPosts] = useState(null)
  const [checked, setChecked] = useState(false)
  const checkboxesData = [
    ...data.site.siteMetadata.menuLinks,
    ...data.usPosts.edges[0].node.tags,
  ]
  console.log(checkboxesData)
  const searchResultString = data.results.edges.filter(
    edge =>
      edge.node.node_locale === language &&
      edge.node.slug === "no-search-results"
  )
  const searchWord = data.results.edges.filter(
    edge => edge.node.node_locale === language && edge.node.slug === "search"
  )
  const handleCheckbox = e => {
    setChecked({ ...checked, [e.target.name]: e.target.checked })
  }

  const checkedValuesTrue = Object.values(checked).filter(
    value => value === true
  )

  useEffect(() => {
    if (searched || checkedValuesTrue.length !== 0) {
      const array =
        language === "en-US" ? data.usPosts.edges : data.esPosts.edges
      const filteredPosts = array.filter(post => {
        const lcTitle = post.node.blogTitle.toLowerCase()
        const lcDescription = post.node.descriptionOfPost.toLowerCase()
        const { tags, service } = post.node
        const searchWord = searched ? searched.toLowerCase() : ""
        if (checkedValuesTrue.length !== 0 && searched) {
          return (
            (service.filter(ser => checked[ser]).length ||
              tags.filter(ser => checked[ser]).length) &&
            (lcTitle.includes(searchWord) || lcDescription.includes(searchWord))
          )
        } else if (checkedValuesTrue.length !== 0) {
          return (
            service.filter(ser => checked[ser.toLowerCase()]).length ||
            tags.filter(ser => checked[ser]).length
          )
        } else if (searched) {
          return (
            lcTitle.includes(searchWord) || lcDescription.includes(searchWord)
          )
        }
        return false
      })
      setSearchedPosts(filteredPosts)
    } else {
      language === "en-US"
        ? setPosts(data.usPosts.edges)
        : setPosts(data.esPosts.edges)
    }
  }, [
    language,
    data.usPosts,
    data.esPosts,
    searched,
    setChecked,
    checked,
    checkedValuesTrue.length,
  ])

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
              to={`/posts/${post.node.slug}`}
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
  ])
  // const checkboxes = checkboxesData.map((value) => {
  //   const label = value.title?  value.title : value;
  //   const name = value.name? value.name : value;
  //  return (
  //  <ServiceCheckbox
  //   checked={checked[name]}
  //   handleCheckbox={handleCheckbox}
  //   name={name}
  //   label={label}
  //   />)
  // })

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
        <FormGroup row className={classes.formGroup}>
          {checkboxesData.length &&
            checkboxesData.map(value => {
              const label = value.title ? value.title : value
              const name = value.name ? value.name : value
              return (
                <ServiceCheckbox
                  checked={checked[name]}
                  handleCheckbox={handleCheckbox}
                  name={name}
                  label={label}
                />
              )
            })}
        </FormGroup>
      </div>
      {(searched || checkedValuesTrue.length !== 0) &&
      searchedPosts &&
      searchedPosts.length === 0 ? (
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

export default PostsContent
