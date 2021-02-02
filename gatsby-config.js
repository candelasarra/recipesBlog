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
      {
        name: "drinks",
        title: "Drinks",
        link: "/drinks",
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
    // `gatsby-plugin-preload-fonts`,
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
                  {
                    family: `Barrio`,
                  },
                  {
                    family: `Shrikhand`,
                    variants: [`400`],
                  },
                  {
                    family: `Inconsolata`,
                    variants: [`400`, `700`],
                  },
                ],
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
        name: "fonts",
        path: `${__dirname}/static/fonts/`,
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
        custom: {
          families: ["Barrio", "Shrikhand"],
          urls: ["/fonts/fonts.css"],
        },
        google: {
          families: ['Barrio', 'Shrikhand']
        }
      },
    },
    // {
    //   resolve: `gatsby-plugin-prefetch-google-fonts`,
    //   options: {
    //     fonts: [
    //       {
    //         family: `Barrio`,
    //       },
    //       {
    //         family: `Shrikhand`,
    //         variants: [`400`],
    //       },
    //       {
    //         family: `Inconsolata`,
    //         variants: [`400`, `700`],
    //       },
    //     ],
    //     display: 'swap'
    //   },
    // },
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `Cherry Chronicles`,
    //     short_name: `Cherry Chronicles`,
    //     start_url: `/`,
    //     background_color: `#a58da4`,
    //     theme_color: `#a58da4`,
    //     display: `standalone`,
    //     // icons: [
    //     //   {
    //     //     src: `/favicons/android-chrome-192x192.png`,
    //     //     sizes: `192x192`,
    //     //     type: `image/png`,
    //     //   },
    //     //   {
    //     //     src: `/favicons/android-chrome-512x512.png`,
    //     //     sizes: `512x512`,
    //     //     type: `image/png`,
    //     //   },
    //     // ]
    //   },
    // },
    `gatsby-plugin-layout`,
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
          omitKeys: [
            "xmlnsDc",
            "xmlnsCc",
            "xmlnsRdf",
            "xmlnsSvg",
            "xmlnsSodipodi",
            "xmlnsInkscape",
          ],
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
