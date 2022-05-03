export const findById = (resources, id) => {
  if (!resources) return null
  return resources.find(r => r.id === id)
}

export const apsert = (resouces, resource) => {
  const index = resouces.findIndex(t => t.id === resource.id)
  if (resource.id && index !== -1) {
    resouces[index] = resource
  } else {
    resouces.push(resource)
  }
}

export const docToResource = (doc) => {
  if (typeof doc?.data !== 'function') return doc
  return { ...doc.data(), id: doc.id }
}
