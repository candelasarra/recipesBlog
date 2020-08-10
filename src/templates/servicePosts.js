import React, { useContext, useEffect, useState } from "react"
import MainWrapper from "./MainWrapper"
import Header from "../components/header"
import ServicePostsContent from "./servicePostsContent"
import { Breadcrumbs, Typography, useTheme } from "@material-ui/core"
import { Link } from "gatsby"
import { NavigateNext, Home } from "@material-ui/icons"
import CustomBreadcrumbs from "../commons/customBreadcrumbs"

const ServicePosts = props => {
  const { data } = props
  const { pageContext } = props
  const { service } = pageContext
  const { category } = pageContext
  const filteredTags = []
  const usPosts = data.usPosts.edges.filter(edge => {
    const post = edge.node
    if (post && post.tags && post.service[0] === service) {
      post.tags.forEach(tag => {
        if (!filteredTags.includes(tag)) {
          filteredTags.push(tag)
        }
      })
    }
    if (
      service &&
      edge &&
      edge.node &&
      edge.node[service.toLowerCase()] &&
      category
    ) {
      return (
        edge.node.service[0] === service &&
        edge.node[service.toLowerCase()].includes(category)
      )
    } else {
      return edge.node.service[0] === service
    }
  })
  const esPosts = data.esPosts.edges.filter(edge => {
    if (
      service &&
      edge &&
      edge.node &&
      edge.node[service.toLowerCase()] &&
      category
    ) {
      return (
        edge.node.service[0] === service &&
        edge.node[service.toLowerCase()].includes(category)
      )
    } else {
      return edge.node.service[0] === service
    }
  })
  let breadcrumbArray = [
    { label: "Home", link: "/" },
    { label: service, link: `/${service.toLowerCase()}` },
  ]
  if (service === "Sweets" && category) {
    breadcrumbArray.push({ label: category })
  }
  return (
    <MainWrapper animation>
      <Header titleStyle="h3" />
      <CustomBreadcrumbs array={breadcrumbArray} location={props.location} />
      <ServicePostsContent
        usPosts={usPosts}
        esPosts={esPosts}
        data={data}
        serviceNow={service}
        category={category}
        tags={filteredTags}
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
          tags
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
          tags
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
          tags
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
