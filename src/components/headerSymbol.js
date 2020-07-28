import React, { useState } from "react"
import Eight from "../vectors/eight.svg"
import Hash from "../vectors/hash.svg"
import At from "../vectors/at.svg"
import Symbol from "../vectors/symbol.svg"

const HeaderSymbol = () => {
  const [selectedSymbol, setSelectedSymbol] = useState(0)
  const symbols = [
    <Symbol style={{ margin: 10 }} />,
    <Eight style={{ margin: 10 }} />,
    <Hash style={{ margin: 10 }} />,
    <At style={{ margin: 10 }} />,
  ]
  return (
    <div
      style={{ contain: "paint" }}
      onClick={() =>
        selectedSymbol < symbols.length - 1
          ? setSelectedSymbol(state => state + 1)
          : setSelectedSymbol(0)
      }
    >
      {symbols[selectedSymbol]}
    </div>
  )
}

export default HeaderSymbol
