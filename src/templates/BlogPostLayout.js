import React from "react"
import MainWrapper from "./MainWrapper"
import BlogPostLayoutContent from "./BlogPostLayoutContent"
import Header from "../components/header"
import CustomBreadcrumbs from "../commons/customBreadcrumbs"
import { graphql } from "gatsby"
import Footer from "../components/Footer"

const BlogPostLayout = props => {
  const { data } = props
  const { edges } = data.blogPost
  const { service, category } = props.pageContext
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
  } else if (service) {
    breadcrumbArray = [
      { label: "Home", link: "/", variant: "body2" },
      {
        label: `${service}`,
        link: `/${service.toLowerCase}`,
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
    <MainWrapper animation={false}>
      <Header titleStyle="h4" />
      <CustomBreadcrumbs array={breadcrumbArray} location={props.location} />
      <BlogPostLayoutContent edges={edges} data={data} />
      <Footer />
    </MainWrapper>
  )
}

export const query = graphql`
  query BlogPost($slug: String!) {
    blogPost: allContentfulBlogPost(filter: { slug: { eq: $slug } }) {
      edges {
        node {
          slug
          blogTitle
          node_locale
          childContentfulBlogPostBlogPostBodyRichTextNode {
            json
          }
          childContentfulBlogPostIngredientsRichTextNode {
            json
          }
          childContentfulBlogPostInstructionsRichTextNode {
            json
          }
          createdAt(formatString: "dddd DD MMMM YYYY")
        }
      }
    }

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
`

export default BlogPostLayout
