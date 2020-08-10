import React from "react"
import MainWrapper from "../templates/MainWrapper"
import HomeComp from "../components/homeCom"
import { graphql } from "gatsby"

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
