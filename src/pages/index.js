import React from "react"
import HomeComp from "../components/homeCom"
import { graphql } from "gatsby"
import Layout from "../layouts"

const Index = props => {
  return (
    <Layout animation>
      <HomeComp props={props} />
    </Layout>
  )
}
export const query = graphql`
  query {
    site: site {
      siteMetadata {
        menuLinks {
          name
          link
          title
        }
      }
    }
  }
`
export default Index
