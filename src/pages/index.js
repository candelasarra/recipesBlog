import React from "react"
import MainWrapper from "../templates/MainWrapper"
import HomeComp from "../components/homeCom"

const Index = props => {
  return (
    <MainWrapper animation>
      <HomeComp props={props} />
    </MainWrapper>
  )
}
export default Index
