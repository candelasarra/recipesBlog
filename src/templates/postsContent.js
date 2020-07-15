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
import "../css/global.css"
import Symbol from "../vectors/symbol.svg"
import Pagination from "../components/pagination"
import border from "../images/greystars.svg"
import strawBack from "../images/strawberryBackground.svg"
import paperImage from "../images/paperImage.jpg"
const useStyles = makeStyles(theme => ({
  postDescriptionText: {
    color: theme.palette.primary.light,
    fontStyle: "italic",
    textAlign: "center",
    overflow: "scroll",
  },
  postTitle: {
    color: theme.palette.primary.main,
    fontWeight: "500",
    marginBottom: theme.spacing(1),
    width: "fit-content",
    textAlign: "center",
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
    minHeight: "90vh",
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    backgroundImage: `url(${strawBack})`,
    backgroundSize: 600,
  },
  searchBar: {
    marginBottom: theme.spacing(5),
    width: "80%",
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "20px 18%",
    flexWrap: "wrap",
    backgroundImage: `url(${paperImage})`,
    [theme.breakpoints.down("sm")]: {
      margin: "20px 5%",
    },
  },
  postDiv: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderBottom: "7px double",
    padding: 20,
    maxHeight: 155,
    // borderImageSource: `url(${border})`,
    // borderImageRepeat: "round",
    // borderImageWidth: "11px",
    // borderImageSlice: "259 fill",
    // borderStyle: "solid",
    [theme.breakpoints.down("xs")]: {
      width: "95%",
      // border: "none",
    },
  },
  // color: {
  //   transition: "filter .9s",
  //   filter: "brightness(0%) grayscale(0) contrast(100%)",
  //   "&:hover": {
  //     filter: "brightness(100%) grayscale(0) contrast(100%);",
  //   },
  // },
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
  const [numberOfPages, setNumberOfPages] = useState(0)
  const itemsPerPage = 8
  const [page, setPage] = useState(1)

  const checkboxesData = [
    ...data.site.siteMetadata.menuLinks,
    ...data.site.siteMetadata.tags,
  ]
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
            ((service && service.filter(ser => checked[ser]).length) ||
              (tags && tags.filter(ser => checked[ser]).length)) &&
            (lcTitle.includes(searchWord) || lcDescription.includes(searchWord))
          )
        } else if (checkedValuesTrue.length !== 0) {
          return (
            (service &&
              service.filter(ser => checked[ser.toLowerCase()]).length) ||
            (tags && tags.filter(ser => checked[ser]).length)
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
      setNumberOfPages(Math.ceil(posts.length / itemsPerPage))
      const array = posts
        .slice((page - 1) * itemsPerPage, page * itemsPerPage)
        .map((post, idx) => {
          return (
            <div
              key={post.node.slug}
              className={`${classes.postDiv} ${classes.color}`}
              style={{ borderTop: idx === 0 ? "7px double" : "unset" }}
            >
              <div>
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
              </div>
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
    <div className={`${classes.mainContainer} shadow`}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 20,
          justifyContent: "space-around",
          width: "fit-content",
        }}
      >
        <TextField
          variant="outlined"
          value={searched}
          className={classes.searchBar}
          placeholder={searchWord[0].node.string}
          onChange={handleChange}
          // InputProps={{
          //   endAdornment: (
          //     <InputAdornment>
          //       <Search disabled={!searched} style={{ color: "gray" }} />
          //     </InputAdornment>
          //   ),
          // }}
        />
        <FormGroup row className={classes.formGroup}>
          {!!checkboxesData.length &&
            checkboxesData.map(value => {
              const label = value.title
              const name = value.name
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
      <div>
        {!!arrayOfPosts.length && (
          <div className={`${classes.postsContainer} shadow`}>
            {arrayOfPosts}
          </div>
        )}
        {(searched || checkedValuesTrue.length !== 0) &&
          searchedPosts &&
          searchedPosts.length === 0 && (
            <>
              <SentimentVeryDissatisfied className={classes.sadFace} />
              <Typography variant="h4" className={classes.searchResults}>
                {searchResultString[0].node.string}
              </Typography>
            </>
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

export default PostsContent
