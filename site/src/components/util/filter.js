function check(element, tag) {
  if (element.tags && element.tags.length && element.tags[0] !== null) {
    return element.tags.find((item) => item.properties.name === tag )
  }
  return null;
}

function filter(elements, tag) {
  return elements.sort((a,b) => {
    if (check(a,tag)) {
      return 0
    } else if (check(b,tag)) {
      return 1
    }
    return 0
  })
}

export default filter
