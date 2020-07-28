import React from "react"
import MainWrapper from "../templates/MainWrapper"
import HomeComp from "../components/homeCom"

const Index = props => {
  return (
    <MainWrapper>
      <HomeComp props={props} />
    </MainWrapper>
  )
}
export default Index
