import React from "react"
import MainWrapper from "../templates/MainWrapper"
import PostsContent from "../templates/postsContent"
import Header from "../components/header"
import CustomBreadcrumbs from "../commons/customBreadcrumbs"

const Posts = ({ data }) => {
  const breadcrumbArray = [{ label: "Home", link: "/" }, { label: "All Posts" }]
  return (
    <MainWrapper>
      <Header titleStyle="h3" />
      <CustomBreadcrumbs array={breadcrumbArray} />
      <PostsContent data={data} />
    </MainWrapper>
  )
}

export const query = graphql`
  query {
    usPosts: allContentfulBlogPost(
      filter: { node_locale: { eq: "en-US" } }
      sort: { fields: createdAt, order: DESC }
    ) {
      edges {
        node {
          tags
          service
          blogTitle
          slug
          node_locale
          descriptionOfPost
          createdAt(formatString: "dddd DD MMMM YYYY")
        }
      }
    }

    esPosts: allContentfulBlogPost(
      filter: { node_locale: { eq: "es-ES" } }
      sort: { fields: createdAt, order: DESC }
    ) {
      edges {
        node {
          tags
          service
          blogTitle
          slug
          node_locale
          descriptionOfPost
          createdAt(formatString: "dddd DD MMMM YYYY")
        }
      }
    }
    site: site {
      siteMetadata {
        title
        menuLinks {
          name
          title
        }
      }
    }
    all: allContentfulBlogPost {
      edges {
        node {
          slug
          descriptionOfPost
          blogTitle
          createdAt(formatString: "dddd DD MMMM YYYY")
        }
      }
    }
    results: allContentfulStrings {
      edges {
        node {
          string
          slug
          node_locale
        }
      }
    }
  }
`

export default Posts
