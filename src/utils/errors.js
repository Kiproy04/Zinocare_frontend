export const getErrorMessage = (err, fallback = 'Something went wrong.') => {
  const data = err?.response?.data
  if (!data) return fallback
  if (typeof data === 'string') return data
  if (data.detail) return data.detail
  if (typeof data === 'object') {
    const flattened = Object.values(data).flat().join(' ')
    return flattened || fallback
  }
  return fallback
}