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
import ServiceCheckbox from "../components/serviceCheckbox"
import "../css/global.css"
import Pagination from "../components/pagination"
import strawBack from "../images/strawberryBackground.png"
import paperImage from "../images/paperImage.jpg"
import Dog from "../vectors/dog.svg"
import Trace from "../vectors/trace3.svg"
import Trace1 from "../vectors/trace1.svg"
import Trace2 from "../vectors/trace2.svg"

const traces = [
  <Trace
    style={{
      position: "absolute",
      zIndex: 1,
      transform: "translate(-8%, -27%)",
    }}
  />,
  <Trace1
    style={{
      position: "absolute",
      zIndex: 1,
      transform: "translate(-14%, -16%)",
    }}
  />,
  <Trace
    style={{
      position: "absolute",
      zIndex: 1,
      transform: "translate(-8%, -27%)",
    }}
  />,
  <Trace2
    style={{
      position: "absolute",
      zIndex: 1,
      transform: "translate(-7%, -33%)",
    }}
  />,
]
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
    marginBottom: 5,
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
    justifyContent: "center",
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
  // input: {
  //   padding: 0,
  //   color: "red",
  // },
  // color: {
  //   transition: "filter .9s",
  //   filter: "brightness(0%) grayscale(0) contrast(100%)",
  //   "&:hover": {
  //     filter: "brightness(100%) grayscale(0) contrast(100%);",
  //   },
  // },
  noNothing: {
    strokeDashoffset: 900,
    willChange: "stroke-dashoffset",
    transition: "stroke-dashoffset 1s",
    transitionDelay: "0s",
    "&:hover": {
      strokeDashoffset: 0,
    },
  },
  checked: {
    strokeDashoffset: 0,
  },
  unchecked: {
    strokeDashoffset: 900,
    "&:hover": {
      strokeDashoffset: 0,
      transition: "stroke-dashoffset 1s",
      transitionDelay: "0s",
      willChange: "stroke-dashoffset",
    },
  },
}))

const PostsContent = ({ data, tags }) => {
  const theme = useTheme()
  const classes = useStyles()
  const { language } = useContext(LanguageContext)
  const [posts, setPosts] = useState(null)
  const [arrayOfPosts, setArrayOfPosts] = useState([])
  const [searched, setSearched] = useState("")
  const [searchedPosts, setSearchedPosts] = useState(null)
  const [checked, setChecked] = useState(false)
  const [numberOfPages, setNumberOfPages] = useState(0)
  const itemsPerPage = 8
  const [clicked, setClicked] = useState([])
  const [page, setPage] = useState(1)

  const checkboxesData = [...data.site.siteMetadata.menuLinks, ...tags]
  const returnRigthClassName = name => {
    if (!Object.keys(checked).includes(name)) {
      return classes.noNothing
    } else if (checked[name]) {
      return classes.checked
    } else {
      return classes.unchecked
    }
  }
  const tagLabels = {
    "gluten-free": data.results.edges.filter(
      edge =>
        edge.node.node_locale === language && edge.node.slug === "gluten-free"
    ),
    salty: data.results.edges.filter(
      edge => edge.node.node_locale === language && edge.node.slug === "salty"
    ),
    sweets: data.results.edges.filter(
      edge => edge.node.node_locale === language && edge.node.slug === "sweets"
    ),
    drinks: data.results.edges.filter(
      edge => edge.node.node_locale === language && edge.node.slug === "drinks"
    ),
  }
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
        } else {
          return false
        }
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
      setSearched("")
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
              className={`${classes.postDiv} ${classes.color} shadow`}
              // style={{ borderTop: idx === 0 ? "7px double" : "unset" }}
            >
              <Link
                to={`/posts/${post.node.slug}`}
                variant="h5"
                style={{
                  textDecoration: "none",
                  color: "black",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <div>
                  <Typography variant="h4" className={classes.postTitle}>
                    {post.node.blogTitle}
                  </Typography>
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
              </Link>
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
          variant="filled"
          value={searched}
          className={classes.searchBar}
          // InputProps={{
          //   className: classes.input,
          // }}
          inputProps={{
            style: { padding: "5px 10px 5px 10px " },
          }}
          placeholder={searchWord[0].node.string}
          onChange={handleChange}
          InputProps={{ padding: "0px 0px 0px 10px" }}
        />
        <FormGroup row className={classes.formGroup}>
          {!!checkboxesData.length &&
            checkboxesData.map((value, idx) => {
              const label = value.title
                ? value.title.toUpperCase()
                : value.toUpperCase()
              const name = value.name ? value.name : value
              return (
                <div
                  style={{ position: "relative", margin: 10 }}
                  key={name + idx}
                >
                  <span className={returnRigthClassName(name)}>
                    {traces[idx]}
                    <ServiceCheckbox
                      checked={checked[name]}
                      handleCheckbox={handleCheckbox}
                      name={name}
                      label={
                        tagLabels[label.toLowerCase()]
                          ? tagLabels[label.toLowerCase()][0].node.string
                          : label
                      }
                      key={label}
                    />
                  </span>
                </div>
              )
            })}
        </FormGroup>
      </div>
      <div style={{ width: "100%" }}>
        {!!arrayOfPosts.length && (
          <div className={`${classes.postsContainer}`}>{arrayOfPosts}</div>
        )}
      </div>
      {(searched || checkedValuesTrue.length !== 0) &&
        searchedPosts &&
        searchedPosts.length === 0 && (
          <div className="opacityAn">
            <Dog className={`${classes.sadFace}`} />
            {/* <SentimentVeryDissatisfied className={classes.sadFace} /> */}
            <Typography variant="h3" className={classes.searchResults}>
              {searchResultString[0].node.string}
            </Typography>
          </div>
        )}
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
