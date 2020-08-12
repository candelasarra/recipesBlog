import React from "react"
import MainWrapper from "../templates/MainWrapper"
import PostsContent from "../templates/postsContent"
import Header from "../components/header"
import CustomBreadcrumbs from "../commons/customBreadcrumbs"
import { graphql } from "gatsby"
import Footer from "../components/Footer"
const Posts = ({ data, location }) => {
  const breadcrumbArray = [{ label: "Home", link: "/" }, { label: "All Posts" }]
  const filteredTags = []
  for (let i = 0; i < data.usPosts.edges.length; i++) {
    const post = data.usPosts.edges[i].node
    if (post && post.tags) {
      post.tags.forEach(tag => {
        if (!filteredTags.includes(tag)) {
          filteredTags.push(tag)
        }
      })
    }
  }

  return (
    <MainWrapper animation>
      <Header titleStyle="h3" />
      <CustomBreadcrumbs array={breadcrumbArray} location={location} />
      <PostsContent data={data} tags={filteredTags} />
      <Footer />
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
        tags {
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
