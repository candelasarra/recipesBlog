import React, { useContext, useEffect, useState } from "react"
import {
  Typography,
  useTheme,
  makeStyles,
  TextField,
  FormGroup,
} from "@material-ui/core"
import LanguageContext from "../templates/LanguageContext"
import { Link } from "gatsby"
import strawBack from "../images/strawberryBackground.svg"
import Dog from "../vectors/dog.svg"
import Pagination from "../components/pagination"
import paperImage from "../images/paperImage.jpg"
import ServiceCheckbox from "../components/serviceCheckbox"

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
    color: theme.palette.primary.light,
  },
  sadFace: {
    alignSelf: "center",
    marginTop: "auto",
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
    marginTop: theme.spacing(2),
    textAlign: "center",
    color: "#3a3a3a",
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
    //backgroundImage: `url(${paperImage})`,
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
    // borderBottom: "7px double",
    padding: 20,
    height: 200,
    backgroundImage: `url(${paperImage})`,
    marginBottom: theme.spacing(3),
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
}))

const ServicePostsContent = ({
  data,
  usPosts,
  esPosts,
  serviceNow,
  category,
  tags,
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
  const [checked, setChecked] = useState(false)
  const searchResultString = data.results.edges.filter(
    edge =>
      edge.node.node_locale === language &&
      edge.node.slug === "no-search-results"
  )
  const searchWord = data.results.edges.filter(
    edge => edge.node.node_locale === language && edge.node.slug === "search"
  )
  const checkedValuesTrue = Object.values(checked).filter(
    value => value === true
  )
  const handleCheckbox = e => {
    setChecked({ ...checked, [e.target.name]: e.target.checked })
  }

  useEffect(() => {
    if (searched || checkedValuesTrue.length !== 0) {
      const array = language === "en-US" ? usPosts : esPosts
      const filteredPosts = array.filter(post => {
        const lcTitle = post.node.blogTitle.toLowerCase()
        const lcDescription = post.node.descriptionOfPost.toLowerCase()
        const searchWord = searched.toLowerCase()
        const { tags, service } = post.node
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
        } else {
          return false
        }
      })
      setSearchedPosts(filteredPosts)
    } else {
      language === "en-US" ? setPosts(usPosts) : setPosts(esPosts)
    }
  }, [
    language,
    usPosts,
    esPosts,
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
        .map(post => {
          return (
            <div
              key={post.node.slug}
              className={`${classes.postDiv} ${classes.color} shadow`}
            >
              <div>
                <Link
                  to={
                    category
                      ? `/${serviceNow.toLowerCase()}/${category.toLowerCase()}/${
                          post.node.slug
                        }`
                      : `/${serviceNow.toLowerCase()}/${post.node.slug}`
                  }
                  variant="h5"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    width: "fit-content",
                  }}
                >
                  <Typography variant="h4" className={classes.postTitle}>
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
          variant="filled"
          value={searched}
          className={classes.searchBar}
          placeholder={searchWord[0].node.string}
          onChange={handleChange}
          InputProps={{ padding: "0px 0px 0px 10px" }}
          inputProps={{
            style: { padding: "5px 10px 5px 10px " },
          }}
        />
        <FormGroup row className={classes.formGroup}>
          {!!tags.length &&
            tags.map(value => {
              return (
                <ServiceCheckbox
                  checked={checked[value]}
                  handleCheckbox={handleCheckbox}
                  name={value}
                  label={value.toUpperCase()}
                  key={value.toUpperCase()}
                />
              )
            })}
        </FormGroup>
      </div>
      <div style={{ width: "100%" }}>
        <div className={classes.postsContainer}>
          {searched && searchedPosts && searchedPosts.length === 0 ? (
            <div className="opacityAn">
              <Dog className={`${classes.sadFace}`} />
              <Typography variant="h4" className={classes.searchResults}>
                {searchResultString[0].node.string}
              </Typography>
            </div>
          ) : (
            arrayOfPosts
          )}
        </div>
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
