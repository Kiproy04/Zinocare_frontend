// Normalizes paginated and non-paginated responses
export const extractResults = (data) => {
  if (Array.isArray(data)) return data
  if (data?.results) return data.results
  return []
}