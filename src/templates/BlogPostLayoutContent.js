import React, { useState, useEffect, useContext } from "react"
import LanguageContext from "./LanguageContext"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { Typography, useTheme } from "@material-ui/core"
import { useStaticQuery, Link } from "gatsby"
import { makeStyles } from "@material-ui/styles"
import { INLINES, BLOCKS } from "@contentful/rich-text-types"

const useStyles = makeStyles(theme => ({
  titleText: {
    color: theme.palette.primary.main,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  createdAtText: {
    display: `block`,
    marginBottom: theme.spacing(1),
    color: "lightgray",
  },
  bodyText: {
    marginTop: theme.spacing(8),
    minHeight: "100vh",
    color: theme.palette.primary.contrastText,
  },
  footerLink: {
    color: theme.palette.primary.contrastText,
  },
}))

const BlogPostLayoutContent = ({ edges }) => {
  const classes = useStyles()
  const theme = useTheme()
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
  const query = useStaticQuery(graphql`
    query {
      data: allContentfulBlogPost(
        filter: { node_locale: { eq: "en-US" } }
        sort: { fields: createdAt, order: ASC }
      ) {
        edges {
          node {
            blogTitle
            slug
            node_locale
          }
        }
      }
      usTitles: allContentfulBlogPost(
        filter: { node_locale: { eq: "en-US" } }
        sort: { fields: createdAt, order: ASC }
      ) {
        edges {
          node {
            blogTitle
          }
        }
      }
      esTitles: allContentfulBlogPost(
        filter: { node_locale: { eq: "es-ES" } }
        sort: { fields: createdAt, order: ASC }
      ) {
        edges {
          node {
            blogTitle
          }
        }
      }
    }
  `)

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
        console.log(node)
        if (node.data.target.fields) {
          let { file } = node.data.target.fields
          // console.log(file["en-US"].url)
          return (
            <img
              src={file[language].url}
              style={{
                maxWidth: "100%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
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
    <div>
      {currentEdge && (
        <div>
          {/* <Layout location={location} title={siteTitle}> */}
          <div style={{ minHeight: "100vh" }}>
            <header>
              <Typography variant="h3" className={classes.titleText}>
                {" "}
                {currentEdge.node.blogTitle}
              </Typography>
              <Typography className={classes.createdAtText}>
                {currentEdge.node.createdAt}
              </Typography>
            </header>
            <Typography className={classes.bodyText}>
              {documentToReactComponents(
                currentEdge.node.childContentfulBlogPostBlogPostBodyRichTextNode
                  .json,
                options
              )}
            </Typography>
            {/* <section dangerouslySetInnerHTML={{ __html: post.html }} /> */}
            <hr
              style={{
                marginBottom: theme.spacing(3),
                marginTop: theme.spacing(3),
              }}
            />
            {/* <footer>
              <Typography>Footerrrr</Typography>
        
            </footer> */}
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
          {/* </Layout> */}
        </div>
      )}
    </div>
  )
}

export default BlogPostLayoutContent
