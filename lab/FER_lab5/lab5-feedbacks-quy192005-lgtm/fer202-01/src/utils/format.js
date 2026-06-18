export const formatDate = (dateStr) => {
  if (!dateStr) return ''

  if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
    return dateStr
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [y, m, d] = dateStr.split('-')
    return `${d}-${m}-${y}`
  }

  return dateStr
}

export const getTodayFormatted = () => {
  const now = new Date()

  const dd = String(now.getDate()).padStart(2, '0')
  const mm = String(now.getMonth() + 1).padStart(2, '0')

  return `${dd}-${mm}-${now.getFullYear()}`
}