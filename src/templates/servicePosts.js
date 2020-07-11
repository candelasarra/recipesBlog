import React, { useContext, useEffect, useState } from "react"
import MainWrapper from "./MainWrapper"
import Header from "../components/header"
import ServicePostsContent from "./servicePostsContent"
import { Breadcrumbs, Typography, useTheme } from "@material-ui/core"
import { Link } from "gatsby"
import { NavigateNext, Home } from "@material-ui/icons"
import CustomBreadcrumbs from "../commons/customBreadcrumbs"

const ServicePosts = props => {
  const theme = useTheme()
  const { data } = props
  console.log(data)
  const { pageContext } = props
  const { service } = pageContext
  const { category } = pageContext
  console.log(data.usPosts.edges)
  const usPosts = data.usPosts.edges.filter(edge => {
    return (
      edge.node.service[0] === service &&
      edge.node[service.toLowerCase()][0] === category
    )
  })
  console.log("USPOSTS", usPosts)
  const esPosts = data.esPosts.edges.filter(edge => {
    return (
      edge.node.service[0] === service &&
      edge.node[service.toLowerCase()][0] === category
    )
  })
  const breadcrumbArray = [
    { label: "Home", link: "/" },
    { label: service, link: `/${service.toLowerCase()}` },
    { label: category },
  ]
  return (
    <MainWrapper>
      <Header titleStyle="h3" />
      <CustomBreadcrumbs array={breadcrumbArray} location={props.location} />
      <ServicePostsContent
        usPosts={usPosts}
        esPosts={esPosts}
        data={data}
        serviceNow={service}
        category={category}
      />
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
          sweets
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
          sweets
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
      }
    }
    all: allContentfulBlogPost {
      edges {
        node {
          sweets
          service
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

export default ServicePosts
