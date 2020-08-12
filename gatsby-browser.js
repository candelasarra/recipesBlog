/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
// require("typeface-barrio")
// require("typeface-shrikhand")
// require("typeface-inconsolata")
const transitionDelay = 500
exports.shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition,
}) => {
  if (location.hash) {
    return
  } else if (location.action === "PUSH") {
    window.setTimeout(() => window.scrollTo(0, 0), transitionDelay)
  } else {
    const savedPosition = getSavedScrollPosition(location)
    window.setTimeout(
      () => window.scrollTo(...(savedPosition || [0, 0])),
      transitionDelay
    )
  }
  return false
}
