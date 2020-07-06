export function localizeStringWithSlug(language, array, slug) {
  const string = array.filter(
    item => item.node.node_locale === language && item.node.slug === slug
  )

  return string
}

export function localizeString(language, array) {
  const string = array.filter(item => item.node.node_locale === language)

  return string
}
