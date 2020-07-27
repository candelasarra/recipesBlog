import React from "react"
import MainWrapper from "../templates/MainWrapper"
import HomeComp from "../components/homeCom"

const Index = props => {
  return (
    <div
      style={{
        backgroundImage:
          'url("https://cdn.inspirationhut.net/wp-content/uploads/2014/09/light-paper-fibers.jpg")',
        transform: "translate3d(0,0,0)",
      }}
    >
      <MainWrapper>
        <HomeComp props={props} />
      </MainWrapper>
    </div>
  )
}
export default Index
