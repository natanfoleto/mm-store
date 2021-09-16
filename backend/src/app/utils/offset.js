export default async function offset (page, limit) {
  if (page < 1) {
    return (1 - 1) * limit
  }

  return (page - 1) * limit
}
