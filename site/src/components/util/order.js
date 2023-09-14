function order(elements) {
  const ret = elements.sort((a,b) => {
    const priorityA = a.priority
    const priorityB = b.priority

    if (priorityB === undefined)
    {
      return 0
    } else if (priorityA === undefined)
    {
      return 1
    }

    return parseInt(priorityA) - parseInt(priorityB)
  })

  return ret
}

export default order
