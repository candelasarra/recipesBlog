import React, { useContext, useMemo } from "react"
import MainWrapper from "./MainWrapper"
import BlogPostLayoutContent from "./BlogPostLayoutContent"
import Header from "../components/header"
import Subscribe from "../components/subscribe"
import { Breadcrumbs, Typography, useTheme } from "@material-ui/core"
import CustomBreadcrumbs from "../commons/customBreadcrumbs"
import { NavigateNext } from "@material-ui/icons"
import { Link } from "gatsby"
import LanguageContext from "./LanguageContext"

const BlogPostLayout = props => {
  console.log(props)
  const theme = useTheme()
  const { data } = props
  const { edges } = data.allContentfulBlogPost
  const { service, category } = props.pageContext
  const { language } = useContext(LanguageContext)
  let breadcrumbArray = []

  if (service && category) {
    breadcrumbArray = [
      { label: "Home", link: "/", variant: "body2" },
      { label: service, link: `/${service.toLowerCase()}`, variant: "body2" },
      {
        label: category,
        link: `/${service.toLowerCase()}/${category.toLowerCase()}`,
        variant: "body2",
      },
      { label: `Post`, variant: "body2" },
    ]
  } else {
    breadcrumbArray = [
      { label: "Home", link: "/", variant: "body2" },
      { label: "All Posts", link: `/posts`, variant: "body2" },
      { label: `Post`, variant: "body2" },
    ]
  }

  return (
    <MainWrapper>
      <Header titleStyle="h4" />
      <CustomBreadcrumbs array={breadcrumbArray} location={props.location} />
      <BlogPostLayoutContent edges={edges} />
      <Subscribe />
    </MainWrapper>
  )
}

export const query = graphql`
  query BlogPost($slug: String!) {
    allContentfulBlogPost(filter: { slug: { eq: $slug } }) {
      edges {
        node {
          slug
          blogTitle
          node_locale
          childContentfulBlogPostBlogPostBodyRichTextNode {
            json
          }
          createdAt(formatString: "dddd DD MMMM YYYY")
        }
      }
    }
  }
`
export default BlogPostLayout
