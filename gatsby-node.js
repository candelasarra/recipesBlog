/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.createPages = async function({ actions, graphql, reporter }) {
  const { createRedirect } = actions

  // createRedirect({
  //   fromPath: `/`,
  //   toPath: `/posts`,
  //   redirectInBrowser: true,
  //   isPermanent: true,
  // })
  const result = await graphql(
    `
      query MyQuery {
        allContentfulBlogPost(filter: { node_locale: { eq: "en-US" } }) {
          edges {
            node {
              slug
              node_locale
            }
          }
        }
      }
    `
  )
  if (result.errors) {
    reporter.panic("failed to create pages", result.errors)
  }
  result.data.allContentfulBlogPost.edges.forEach(edge => {
    const slug = edge.node.slug
    actions.createPage({
      path: `/posts/${slug}`,
      component: require.resolve(`./src/templates/BlogPostLayout`),
      context: { slug: slug },
    })
  })

  const serviceResults = await graphql(
    `
      query MyQuery {
        allContentfulBlogPost(filter: { node_locale: { eq: "en-US" } }) {
          edges {
            node {
              slug
              service
              sweets
            }
          }
        }
      }
    `
  )
  console.log(serviceResults)
  if (result.errors) {
    reporter.panic("failed to create pages", result.errors)
  }
  console.log(serviceResults)
  serviceResults.data.allContentfulBlogPost.edges.forEach(edge => {
    console.log(edge)
    const slug = edge.node.slug
    const service = edge.node.service[0]
    const category = edge.node[service.toLowerCase()][0]
    actions.createPage({
      path: `/${service.toLowerCase()}/${category.toLowerCase()}/${slug}`,
      component: require.resolve(`./src/templates/BlogPostLayout`),
      context: { slug: slug, service: service, category: category },
    })
  })
  const resultServices = await graphql(`
    query {
      site {
        siteMetadata {
          menuLinks {
            name
            link
            title
          }
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panic("failed to create pages", result.errors)
  }

  resultServices.data.site.siteMetadata.menuLinks.forEach(edge => {
    const { name, link, title } = edge
    console.log(edge)
    actions.createPage({
      path: `${link.toLowerCase()}`,
      component: require.resolve(`./src/templates/serviceTemplate`),
      context: { title: title },
    })
  })
  const categoriesResult = await graphql(
    `
      query MyQuery {
        allContentfulBlogPost(filter: { node_locale: { eq: "en-US" } }) {
          edges {
            node {
              slug
              service
              sweets
            }
          }
        }
      }
    `
  )
  console.log(serviceResults)
  if (result.errors) {
    reporter.panic("failed to create pages", result.errors)
  }
  console.log(serviceResults)

  categoriesResult.data.allContentfulBlogPost.edges.forEach(edge => {
    const categories = []
    const service = edge.node.service[0]
    console.log("HEREEE SERVICE", service)
    const category = edge.node[service.toLowerCase()][0]
    categoriesResult.data.allContentfulBlogPost.edges.map(inner => {
      inner.node[service.toLowerCase()].map(element => {
        if (!categories.includes(element)) {
          categories.push(element)
          actions.createPage({
            path: `/${service.toLowerCase()}/${element.toLowerCase()}`,
            component: require.resolve(`./src/templates/servicePosts`),
            context: { service: service, category: element },
          })
        }
      })
    })
  })
}
