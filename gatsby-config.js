require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `the cherry chronicles`,
    author: `Candela`,
    menuLinks: [
      {
        name: "sweets",
        title: "Sweets",
        link: "/sweets",
      },
      {
        name: "salty",
        title: "Salty",
        link: "/salty",
      },
    ],
    tags: [
      {
        name: "gluten-free",
        title: "Gluten Free",
      },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        downloadLocal: true,
      },
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: [
            "Shrikhand",
            "Limelight",
            "Poiret One",
            "Inconsolata",
            "Barrio",
          ],
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Cherry Chronicles`,
        short_name: `Cherry Chronicles`,
        start_url: `/`,
        background_color: `#a58da4`,
        theme_color: `#a58da4`,
        display: `standalone`,
        icon: `src/images/masacre-icon.png`,
        include_favicon: true,
      },
    },
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /vectors\/.*\.svg/,
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
