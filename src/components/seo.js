/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Helmet from "react-helmet"
function SEO({ description, lang, meta, title }) {
  return (
    <Helmet
      // htmlAttributes={{
      //   lang,
      // }}
      title="Cherry Chronicles"
      //   titleTemplate={`%s | ${site.siteMetadata.title}`}
    >
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/images/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/images/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/images/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/images/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/images/favicon/safari-pinned-tab.svg"
        color="#5bbad5"
      />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
    </Helmet>
  )
}

export default SEO
