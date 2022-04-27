export const findById = (resources, id) => {
  if (!resources) return null
  return resources.find(r => r.id === id)
}
export const apsert = (resouces, resource) => {
  const index = resouces.findIndex(t => t.id === resource.id)
  if (index !== -1) {
    resouces[index] = resource
  } else {
    resouces.push(resource)
  }
}
