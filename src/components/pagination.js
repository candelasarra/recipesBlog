import React, { useState, useEffect } from "react"
import { Button, IconButton } from "@material-ui/core"
import {
  LastPageRounded,
  NavigateNextRounded,
  FirstPageRounded,
  NavigateBeforeRounded,
} from "@material-ui/icons"

const Pagination = ({ page, numberOfPages, setPage }) => {
  const [leftButton, setLeftButton] = useState(1)
  const [centerButton, setCenterButton] = useState(1)
  const [rightButton, setRightButton] = useState(1)

  useEffect(() => {
    if (page > numberOfPages) {
      setPage(1)
    }
    if ((page === 1 || page === 2) & (numberOfPages >= 3)) {
      setRightButton(3)
      setCenterButton(2)
      setLeftButton(1)
    } else if ((page === 1) & (numberOfPages === 1)) {
      setRightButton(null)
      setCenterButton(1)
      setLeftButton(null)
    } else if ((page === 1) & (numberOfPages === 2)) {
      setRightButton(2)
      setCenterButton(1)
      setLeftButton(null)
    } else if ((page === 2) & (numberOfPages === 2)) {
      setRightButton(null)
      setCenterButton(2)
      setLeftButton(1)
    } else if (
      (page <= numberOfPages - 2) &
      (page >= 3) &
      (numberOfPages > 3)
    ) {
      setRightButton(page + 1)
      setCenterButton(page)
      setLeftButton(page - 1)
    } else if (
      (page === numberOfPages - 1 || page === numberOfPages) &
      (numberOfPages >= 3)
    ) {
      setRightButton(numberOfPages)
      setCenterButton(numberOfPages - 1)
      setLeftButton(numberOfPages - 2)
    }
  }, [page, numberOfPages, setPage])

  const firstPage = () => {
    setPage(1)
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0
  }
  const previousPage = () => {
    setPage(page - 1)
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0
  }
  const numberButton = prop => {
    setPage(prop)
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0
  }
  const nextPage = () => {
    setPage(page + 1)
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0
  }
  const lastPage = () => {
    setPage(numberOfPages)
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0
  }

  const firstPrevious = () => {
    if (page === 1 || numberOfPages === 0) {
      return true
    } else {
      return false
    }
  }

  const lastNext = () => {
    if (page === numberOfPages || numberOfPages === 0) {
      return true
    } else {
      return false
    }
  }

  const centerButtonDisable = () => {
    if (centerButton === page || numberOfPages === 0) {
      return true
    } else {
      return false
    }
  }

  const rightButtonDisable = () => {
    if (rightButton === page || numberOfPages === 0) {
      return true
    } else {
      return false
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "fit-content",
        backgroundColor: "#dad9d68a",
        marginTop: "auto",
        marginBottom: 30,
        border: "1px solid",
        borderRadius: 50,
      }}
    >
      {numberOfPages > 3 && (
        <IconButton
          color="primary"
          onClick={firstPage}
          disabled={firstPrevious()}
        >
          <FirstPageRounded />
        </IconButton>
      )}
      <IconButton
        color="primary"
        onClick={previousPage}
        disabled={firstPrevious()}
      >
        <NavigateBeforeRounded />
      </IconButton>
      {leftButton && (
        <Button
          onClick={() => numberButton(leftButton)}
          disabled={firstPrevious()}
        >
          {leftButton}
        </Button>
      )}
      <Button
        onClick={() => numberButton(centerButton)}
        disabled={centerButtonDisable()}
      >
        {centerButton}
      </Button>
      {rightButton && (
        <Button
          onClick={() => numberButton(rightButton)}
          disabled={rightButtonDisable()}
        >
          {rightButton}
        </Button>
      )}
      <IconButton color="primary" onClick={nextPage} disabled={lastNext()}>
        <NavigateNextRounded />
      </IconButton>
      {numberOfPages > 3 && (
        <IconButton color="primary" onClick={lastPage} disabled={lastNext()}>
          <LastPageRounded />
        </IconButton>
      )}
    </div>
  )
}

export default Pagination
