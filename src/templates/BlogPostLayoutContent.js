import React, { useState, useEffect, useContext } from "react"
import LanguageContext from "./LanguageContext"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { Typography } from "@material-ui/core"
import { Link } from "gatsby"
import { makeStyles } from "@material-ui/styles"
import { INLINES, BLOCKS } from "@contentful/rich-text-types"

const useStyles = makeStyles(theme => ({
  titleText: {
    color: theme.palette.primary.main,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
    textAlign: "center",
    width: "fit-content",
  },
  createdAtText: {
    display: `block`,
    marginBottom: theme.spacing(1),
    color: "#666565",
    marginLeft: "auto",
    width: "fit-content",
  },
  bodyTextDes: {
    marginTop: theme.spacing(4),
    color: theme.palette.primary.main,
    textAlign: "center",
  },
  footerLink: {
    color: "#666565",
  },
  titleContainerPost: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "90%",
  },
  aTags: {
    textDecoration: "underline",
    color: theme.palette.primary.main,
  },
  ingredientsInstructions: {
    padding: 20,
    minHeight: 500,
  },
  instructionsInd: {
    flex: 1,
    margin: 5,
    borderRadius: 4,
    // [theme.breakpoints.down("sm")]: {
    //   flexDirection: 'column'
    // },
  },
  ingredientsInd: {
    flex: 0.7,
    margin: 5,
    borderRadius: 4,
    [theme.breakpoints.down("sm")]: {
      flex: 1,
    },
  },
  ingInsContainer: {
    borderRadius: 4,
    display: "flex",
    flexWrap: "wrap",
    padding: 20,
    marginTop: theme.spacing(6),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  postImage: {
    maxWidth: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: "4px",
  },
  color: {
    transition: "filter .9s",
    filter: "grayscale(1)",
    "&:hover": {
      filter: "grayscale(0)",
    },
  },
}))

const BlogPostLayoutContent = ({ edges, data }) => {
  const classes = useStyles()
  const [currentEdge, setCurrentEdge] = useState(null)
  const [usPost, setUsPost] = useState(null)
  const [esPost, setEsPost] = useState(null)
  const [slugs, setSlugs] = useState([])
  const [titles, setTitles] = useState([])
  const [nextPost, setNextPost] = useState(null)
  const [nextTitle, setNextTitle] = useState(null)
  const [previousTitle, setPreviousTitle] = useState(null)
  const [previousPost, setPreviousPost] = useState(null)
  const { language } = useContext(LanguageContext)
  const query = data

  const options = {
    renderNode: {
      [INLINES.HYPERLINK]: (node, children) => {
        if (node.data.uri.indexOf("youtube.com") !== -1) {
          return (
            <div
              style={{
                position: "relative",
                width: "100%",
                paddingBottom: "56.25%",
              }}
            >
              <iframe
                title={node.content[0].value}
                frameBorder="0"
                allow="accelometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                src={node.data.uri}
                allowFullScreen
                style={{
                  display: "flex",
                  marginRight: "auto",
                  margin: "auto",
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  left: "0",
                  top: "0",
                }}
              ></iframe>
            </div>
          )
        } else {
          return (
            <a
              href={node.data.uri}
              style={{ color: "white" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          )
        }
      },
      [BLOCKS.EMBEDDED_ASSET]: node => {
        if (node.data.target.fields) {
          let { file } = node.data.target.fields
          return (
            <img
              alt=""
              src={file[language].url}
              className={`${classes.postImage} ${classes.color} shadow`}
            />
          )
        }
      },
    },
  }

  useEffect(() => {
    edges.filter(edge => {
      if (edge.node.node_locale === "en-US") {
        setUsPost(edge)
      } else if (edge.node.node_locale === "es-ES") {
        setEsPost(edge)
      }
      return false
    })
  }, [language, edges])

  useEffect(() => {
    let arrayTitles = []
    if (language === "en-US") {
      query.usTitles.edges.forEach(edge => {
        arrayTitles.push(edge.node.blogTitle)
      })
    } else if (language === "es-ES") {
      query.esTitles.edges.forEach(edge => {
        arrayTitles.push(edge.node.blogTitle)
      })
    } else {
      return false
    }
    if (arrayTitles.length) {
      setTitles(arrayTitles)
    }
  }, [query, language])
  useEffect(() => {
    let arraySlugs = []
    query.data.edges.forEach(edge => {
      arraySlugs.push(edge.node.slug)
    })
    if (arraySlugs.length) {
      setSlugs(arraySlugs)
    }
  }, [query.data.edges])
  useEffect(() => {
    if (slugs.length && currentEdge) {
      const index = slugs.indexOf(currentEdge.node.slug)
      if (index === 0) {
        setNextPost(slugs[index + 1])
        setNextTitle(titles[index + 1])
      } else if (index === slugs.length - 1) {
        setPreviousPost(slugs[slugs.length - 2])
        setPreviousTitle(titles[titles.length - 2])
      } else if (index < slugs.length - 1 && index > 0) {
        setNextPost(slugs[index + 1])
        setNextTitle(titles[index + 1])
        setPreviousPost(slugs[index - 1])
        setPreviousTitle(titles[index - 1])
      }
    }
  }, [slugs, currentEdge, titles])

  useEffect(() => {
    if (usPost && esPost) {
      if (language === "en-US") {
        setCurrentEdge(usPost)
      } else if (language === "es-ES") {
        setCurrentEdge(esPost)
      }
    }
  }, [usPost, esPost, language])

  return (
    <div className="shadow" style={{ padding: 20 }}>
      {currentEdge && (
        <div>
          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography className={classes.createdAtText}>
              {currentEdge.node.createdAt}
            </Typography>
            <header className={classes.titleContainerPost}>
              <Typography variant="h3" className={classes.titleText}>
                {" "}
                {currentEdge.node.blogTitle}
              </Typography>

              <div>
                <a href="#ingredients" className={classes.aTags}>
                  Ingredients
                </a>{" "}
                |{" "}
                <a href="#instructions" className={classes.aTags}>
                  Procedure
                </a>
              </div>
            </header>

            <Typography className={classes.bodyTextDes}>
              {documentToReactComponents(
                currentEdge.node.childContentfulBlogPostBlogPostBodyRichTextNode
                  .json,
                options
              )}
            </Typography>
            <div className={`${classes.ingInsContainer} shadow`}>
              <div
                className={`${classes.ingredientsInstructions} ${classes.ingredientsInd} shadow`}
                id="ingredients"
              >
                <Typography
                  variant="h6"
                  style={{ width: "fit-content", margin: "0px auto" }}
                >
                  Ingredients
                </Typography>
                <div className={classes.bodyText}>
                  {documentToReactComponents(
                    currentEdge.node
                      .childContentfulBlogPostIngredientsRichTextNode.json,
                    options
                  )}
                </div>
              </div>
              <div
                className={`${classes.ingredientsInstructions} ${classes.instructionsInd} shadow`}
                id="instructions"
              >
                <Typography
                  variant="h6"
                  style={{ width: "fit-content", margin: "0px auto" }}
                >
                  Instructions
                </Typography>
                <Typography className={classes.bodyText}>
                  {documentToReactComponents(
                    currentEdge.node
                      .childContentfulBlogPostInstructionsRichTextNode.json,
                    options
                  )}
                </Typography>
              </div>
            </div>
          </div>
          <nav>
            <ul
              style={{
                display: `flex`,
                flexWrap: `wrap`,
                justifyContent: `space-between`,
                listStyle: `none`,
                padding: 0,
                marginLeft: 0,
                marginTop: 50,
                marginBottom: 30,
              }}
            >
              <li style={{ marginRight: "10px" }}>
                {previousPost && (
                  <Link
                    to={`/posts/${previousPost}`}
                    rel="prev"
                    style={{ textDecoration: "none" }}
                  >
                    <Typography className={classes.footerLink}>
                      ← {previousTitle}
                    </Typography>
                  </Link>
                )}
              </li>
              <li style={{ marginLeft: "10px" }}>
                {nextPost && (
                  <Link
                    to={`/posts/${nextPost}`}
                    rel="next"
                    style={{ textDecoration: "none" }}
                  >
                    <Typography className={classes.footerLink}>
                      {nextTitle} →
                    </Typography>
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  )
}

export default BlogPostLayoutContent
