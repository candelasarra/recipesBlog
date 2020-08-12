import React from "react"
import HomeComp from "../components/homeCom"
import { graphql } from "gatsby"
import MainWrapper from "../templates/MainWrapper"

const Index = props => {
  return (
    <MainWrapper animation>
      <HomeComp props={props} />
    </MainWrapper>
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
