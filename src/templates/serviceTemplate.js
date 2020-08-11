import React from "react"
import MainWrapper from "./MainWrapper"
import Header from "../components/header"
import ServiceTemplateContent from "./serviceTemplateContent"
import { useTheme } from "@material-ui/core"
import CustomBreadcrumbs from "../commons/customBreadcrumbs"
import { graphql } from "gatsby"
const ServiceTemplate = ({ data, path, pageContext, location }) => {
  const service = data.allContentfulBlogPost.edges[0].node.service[0].toLowerCase()
  const category = []
  data.allContentfulBlogPost.edges.forEach(edge => {
    //this if because only sweets have categories
    if (edge && edge.node && edge.node[service]) {
      edge.node[service].forEach(element => {
        // this if because one recipe can fall into more than one category so filteing to not repeat
        if (!category.includes(element)) {
          category.push(element)
        }
      })
    }
  })
  const breadcrumbArray = [
    { label: "Home", link: "/" },
    { label: pageContext.title },
  ]
  return (
    <MainWrapper animation>
      <Header titleStyle="h3" />
      <CustomBreadcrumbs array={breadcrumbArray} location={location} />
      <ServiceTemplateContent data={category} path={path} />
    </MainWrapper>
  )
}
export const query = graphql`
  query services($title: String!) {
    allContentfulBlogPost(
      filter: { service: { eq: $title }, node_locale: { eq: "en-US" } }
    ) {
      edges {
        node {
          service
          sweets
        }
      }
    }
  }
`
export default ServiceTemplate
